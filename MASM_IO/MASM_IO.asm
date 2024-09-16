TITLE MASM IO     (MASM_IO.asm)

; Author: Michael Audi
; Last Modified: 12/10/2023
; Description: This program prompts a user for 10 integer input values and
;				converts the string inputs to signed integer values using the
;				ReadVal procedure. Then it calculates a sum and truncated average 
;				of the values, and outputs them and the original values entered as
;				strings of ASCII digits using the WriteVal procedure.
;				Portfolio project of Oregon State CS 271.

INCLUDE Irvine32.inc


; ---------------------------------------------------------------------------------
; Name: mGetString
;
; Prompts a user for an input and then returns that string and its size to the calling
;	location. Makes use of the Irvine procedure ReadString.
;
;
; Preconditions: Memory locations must be allocated for userString and retSize, a userPrompt
;					string must be prepared and a maxSize value must be set for input size.
;					Include the Irvine32 library.
;
; Postconditions: Uses and returns to original values: EAX, ECX, EDX.
;
; Receives: userPrompt, a string that contains a prompt to the user; userString, 
;			a reference to a memory location to store the user input string; maxSize,
;			the maximum size of an acceptable string passed by value; retSize, a reference
;			to a location to store the size of the returned user input string.
;
; Returns: userString, the memory location's value is updated with the user input string.
;			retSize, the memory location's value is updated with the size of the userString.
; ---------------------------------------------------------------------------------
mGetString MACRO userPrompt, userString, maxSize, retSize
	PUSH	EAX
	PUSH	ECX
	PUSH	EDX
	mDisplayString userPrompt
	MOV		EDX, userString
	MOV		ECX, maxSize
	CALL	ReadString
	MOV		retSize, EAX
	POP		EAX
	POP		ECX
	POP		EDX
ENDM


; ---------------------------------------------------------------------------------
; Name: mDisplayString
;
; Take a string value and output it to the display using the Irvine procedure WriteString.
;
;
; Preconditions: Have a set string of ASCII characters to pass in as string and include the Irvine32 library.
;
; Postconditions: Uses and returns to original values: EDX.
;
; Receives: The location in memory of an ASCII string.
;
; Returns: Outputs to the console the string passed to the MACRO.
; ---------------------------------------------------------------------------------
mDisplayString MACRO string
	PUSH	EDX
	MOV		EDX, string
	CALL	WriteString
	POP		EDX
ENDM

.data
; Strings for output to the user.
introduction	BYTE		"PROGRAMMING ASSIGNMENT: Designing low-level I/O procedures.", 13, 10,
							"Written by: Michael Audi", 13, 10, 13, 10, 0
instructions	BYTE		"Please provide 10 signed decimal integers.", 13, 10,
							"Each number needs to be small enough to fit inside a 32 bit register. After you have finished inputting the raw numbers", 13, 10,
							"I will display a list of the integers. their sum, and their value.", 13, 10, 0
prompt			BYTE		"Please enter a signed number: ", 0
tryAgain		BYTE		"Please try again: ", 0
invalidNum		BYTE		"ERROR: You did not enter a signed number or your number was too big.", 13, 10, 0
enteredTitle	BYTE		"You entered the following numbers: ", 13, 10, 0
sumTitle		BYTE		"The sum of these numbers is: ", 0
averageTitle	BYTE		"The truncated average is: ", 0
thankYou		BYTE		13, 10, "Thanks for playing!", 13, 10, 0
commaSpace		BYTE		", ", 0

; Memory locations for string input from ReadVal.
stringInput		BYTE		14 DUP(0)			; 14 characters covers the maximum length a signed 32bit integer can be -2147483648, sign character, and 0 of NULL termination.
maxInputSize	DWORD		SIZEOF stringInput
returnSize		DWORD		0

; SDWORD array to hold user entered values after conversion to integer.
inputValues		SDWORD		10 DUP(?)
valueArraySize	DWORD		10

; Values for sum and average output.
outputSum		SDWORD		?
outputAvg		SDWORD		?

.code
main PROC
	; Output the introduction and instruction messages.
	mDisplayString OFFSET introduction
	mDisplayString OFFSET instructions
	
	; --------------------------
	; Loop until 10 values have 
	;	been entered by the user.
	; --------------------------
	MOV			ECX, 10
_userInputLoop:
	PUSH		ECX
	PUSH		valueArraySize
	PUSH		OFFSET	inputValues
	PUSH		OFFSET	tryAgain
	PUSH		OFFSET	invalidNum
	PUSH		OFFSET	prompt
	PUSH		OFFSET	stringInput
	PUSH		maxInputSize
	PUSH		OFFSET returnSize
	CALL		ReadVal
	POP			ECX
	LOOP		_userInputLoop
	CALL		Crlf

	; --------------------------
	; Loop through the inputValues
	;	array and output the ten 
	;	valid inputs from the user.
	; --------------------------
	mDisplayString OFFSET enteredTitle
	MOV			ECX, valueArraySize
	MOV			ESI, OFFSET inputValues
_userOutputLoop:
	CLD
	LODSD
	PUSH		EAX
	CALL		WriteVal
	CMP			ECX, 1
	JE			_lastNum		; Skip the trailing comma on the last number.
	mDisplayString OFFSET commaSpace
_lastNum:
	LOOP		_userOutputLoop
	CALL		Crlf

	; --------------------------
	; Loop that sums the values 
	;	in the inputValues array 
	;	and outputs the sum.
	; --------------------------
	MOV			ESI, OFFSET inputValues
	MOV			ECX, valueArraySize
	MOV			EAX, 0
	MOV			EBX, 0
_summation:
	LODSD
	ADD			EBX, EAX
	LOOP		_summation
	MOV			outputSum, EBX
	mDisplayString	OFFSET sumTitle
	PUSH		outputSum
	CALL		WriteVal
	CALL		Crlf

	; --------------------------
	; Calculate and output the 
	;	truncated average value.
	; --------------------------
	MOV			EAX, outputSum
	MOV			EDX, 0
	CDQ
	IDIV		valueArraySize
	MOV			outputAvg, EAX
	mDisplayString	OFFSET averageTitle
	PUSH		outputAvg
	CALL		WriteVal
	CALL		Crlf

	; Output the farewell and thank you message.
	mDisplayString OFFSET thankYou

	Invoke ExitProcess, 0	; exit to operating system
main ENDP


; ---------------------------------------------------------------------------------
; Name: ReadVal
;
; Use the mGetString MACRO to recieve an ASCII string from the user, converts it into
;	a signed integer by verifying it is less than the maximum value storable in an SDWORD
;	and contains no invalid characters, then stores the integer value in an array passed 
;	to the procedure. 
;
;
; Preconditions: Have valueArraySize and maxInputSize values created. Have tryAgain, 
;					invalidNum, and prompt strings created. Create memory locations for
;					inputValues array, returnSize value, and a stringInput character array.
;
; Postconditions: Uses and returns to original values: EAX, EBX, ECX, EDX, ESI, EDI, EBP.
;
; Receives: Recieves valueArraySize and maxInputSize by value. Recieves inputValues array, 
;			tryAgain, invalidNum, prompt, stringInput arrays and returnSize value by reference.
;
; Returns: Stores the value of the valid user integer in the inputValues array passed by value.
; ---------------------------------------------------------------------------------
ReadVal PROC USES EBP
	; Set up stack frame and request user string.
	MOV		EBP, ESP
	PUSHAD
	mGetString [EBP + 20], [EBP + 16], [EBP + 12], [EBP + 8]

; Validate that the user input string can convert to an integer.
_validation:
	MOV		ESI, [EBP + 16]
	MOV		EDI, 0
	MOV		ECX, [EBP + 8]
	MOV		EDX, 0
	PUSH	EDX
	CMP		ECX, 12
	JGE		_invalidInput	; Input too large to possibly be a valid signed 32 bit integer.
	CMP		ECX, 0
	JE		_invalidInput	; User entered an empty string.
	CLD
	MOV		AL, [ESI]
	CMP		AL, 45
	JE		_negSignCheck	; Jump if the first character is a negative sign '-'.
	CMP		AL, 43
	JE		_posSignCheck	; Jump if the first character is a positive sign '+'.

; Loop through each character in the string checking if it is a valid digit.
_checkNumber:	
	LODSB
	CMP		AL, 48
	JAE		_maybeNumber	; Jump to check upper bound if the character matches the lower ASCII character bound, '48' = 0.
	JMP		_invalidInput

; If the character is within a valid range to be a number begin conversion. 
_validNumber:
	SUB		AL, 48
	MOV		EBX, 0
	MOV		BL, AL
	MOV		EAX, EDI
	MOV		EDX, 10
	IMUL	EDX
	JO		_invalidInput	; Jump to invalid if an overflow occured on multiplication.
	MOV		EDI, EAX
	ADD		EDI, EBX
	JO		_maybeNeg		; Jump to check if an overflow occured but only for positive values.
_contLoop:
	LOOP	_checkNumber
	POP		EDX
	PUSH	EDX
	CMP		EDX, 0
	JG		_negative		; If the flag in EDX is set to 1, jump to _negative to turn the value negative.

; Pass the newly validated value to the next open spot in the array of user entered values.
_passToArray:
	POP		EDX
	MOV		EAX, [EBP + 36]
	SUB		EAX, [EBP + 40]
	MOV		EDX, 0
	MOV		EBX, 4
	MUL		EBX
	MOV		ESI, [EBP + 32]
	ADD		ESI, EAX
	MOV		[ESI], EDI
_return:
	POPAD
	RET		32

; Return an error message and reprompt the user if an invalid value is entered.
_invalidInput:
	POP		EDX
	mDisplayString [EBP + 24]
	mGetString [EBP + 28], [EBP + 16], [EBP + 12], [EBP + 8]
	JMP		_validation

; If the first character is a '-' move forward in the string and set EDX to 1 as a flag.
_negSignCheck:
	POP		EDX
	MOV		EDX, 1
	PUSH	EDX
	LODSB
	SUB		ECX, 1
	JMP		_checkNumber

; If the first character is a '+' move forward in the string and skip it.
_posSignCheck:
	LODSB
	SUB		ECX, 1
	JMP		_checkNumber

; Check the upper ASCII character bound of '57' = 9.
_maybeNumber:
	CMP		AL, 57
	JLE		_validNumber	; The number is a valid digit if it falls between 0 and 9.
	JMP		_invalidInput

; Check if the value is negative or positive to confirm an overflow occured.
_maybeNeg:
	POP		EDX
	PUSH	EDX
	CMP		EDX, 0
	JE		_invalidInput	; If the value is positive an overflow has occured.
	JMP		_contLoop

; If the value should be negative convert it to negative.
_negative:
	CMP		EDI, 2147483648	; Compare to the maximum value a negative could be before converting value to negative.
	JL		_invalidInput
	NEG		EDI
	JMP		_passToArray

ReadVal ENDP

; ---------------------------------------------------------------------------------
; Name: WriteVal
;
; Convert a signed integer stored as an SDWORD to an ASCII character string and
;	then output that string using mDisplayString.
;
;
; Preconditions: Have a signed integer value stored in memory as an SDWORD and
;					a functioning mDisplayString MACRO.
;
; Postconditions: Uses and returns to original values: EAX, EBX, ECX, EDX, EDI, EBP.
;
; Receives: A signed integer value passed by value as an SDWORD on the stack.
;
; Returns: Prints the converted SDWORD to the console as an ASCII string.
; ---------------------------------------------------------------------------------
WriteVal PROC USES	EAX EBX ECX EDX EDI EBP
	; Set up stack frame and assign values.
	MOV		EBP, ESP		; Output string start.
	MOV		EDI, ESP		; Reassemble string.
	SUB		ESP, 14			; Create space for the new string on the stack.
	MOV		EAX, [EBP + 28]	; Move SDWORD to convert to EAX.
	MOV		EBX, 10
	MOV		ECX, 1
	MOV		EDX, 0
	PUSH	EDX
	CMP		EAX, 0
	JGE		_disassemblyLoop
	NEG		EAX				; Turn EAX positive if it was previously negative.

; Disassemble the SDWORD through repeated division, pop the remainder to stack.
_disassemblyLoop:
	MOV		EDX, 0
	DIV		EBX
	ADD		DL, 48
	PUSH	EDX
	INC		ECX
	CMP		EAX, 0
	JG		_disassemblyLoop
	MOV		EAX, [EBP + 28]
	CMP		EAX, 0
	JL		_negSign	; Add a negative sign to the loop when number is negative.

; Assemble the string on the stack using EDI.
_assemblyLoop:
	MOV		EAX, 0
	CLD
	POP		EDX
	MOV		AL, DL
	STOSB
	CMP		EDX, 0
	LOOP	_assemblyLoop

; Output string to the console via mDisplayString.
_display:
	mDisplayString EBP
	MOV		ESP, EBP
	RET		4

; Add a negative sign to the string when appropriate.
_negSign:
	MOV		EDX, 0
	MOV		DL, 45
	PUSH	EDX
	INC		ECX
	JMP		_assemblyLoop
WriteVal ENDP

END main
