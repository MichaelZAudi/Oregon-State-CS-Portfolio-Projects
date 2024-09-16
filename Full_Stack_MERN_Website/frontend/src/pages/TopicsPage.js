function TopicsPage() {
    return (
       <>
            <h2>Web Dev Concepts</h2>
            <nav class="local">
                <a href="#webServers">Web Servers</a>
                <a href="#frontendDesign">Frontend Design</a>
                <a href="#optImages">Optimizing Images</a>
                <a href="#favicons">Favicons</a>
                <a href="#css">CSS</a>
                <a href="#forms">Forms</a>
                <a href="#express">Express</a>
                <a href="#javascript">JavaScript</a>
            </nav>
            <article id="webServers">
                <h3>Web Servers</h3>
                
                <p>
                    For many websites, index.html is treated as the <strong>designated homepage</strong> of the site. When a request is made to the server without specifying a unique page
                    after the / in the <strong>URL</strong>, index.html is returned by the <strong>GET</strong> request as the default landing page for the site. The designated homepage 
                    acts as the root directory of the web server. This is not the case in all web applications, but is for the Apache web server used by OSU Engineering.
                </p>
                
                <p>
                    In Chrome, the browser's Web Dev/Inspector Network tab shows general information about the webpage and the HTTP request and response that produced it. When viewed from both the web 
                    server and the local host, the request URL, request method, and status codes are listed under the general information header. They both also list the content type and last modified 
                    date for the content in the response header and the user platform in the request header. The version hosted on the web displays more information, though, such as the <strong>IP address</strong>
                    of the content, the server type of the server, browser information, and connection details.
                </p>
                
                <p>
                    The favicon.ico file returns a <strong>status code</strong> of 200 from the server because there was a <strong>successful response</strong> and there is a valid favicon 
                    file on the web.engr.oregonstate.edu server to present in the browser. The main.js and main.css files return a status code in the 400s because there is a 
                    <strong>client error</strong> with the HTTP request calling for them. In this case, a 404 status is returned because those files are <strong>not found</strong>, as neither 
                    of them exist on the server.
                </p>
                
                <p>
                    The first part of the URL for this web file is the <strong>scheme</strong>, or protocol of the request, HTTPS, that represents how the client browser communicates with the server.
                    Next is the <strong>host domain</strong>, oregonstate.edu, which represents the name of the server that holds the index.html file. The host domain also specifies 
                    <strong>subdomains</strong> which are listed as web and engr, indicating that the file is located specifically in the web subsection of the engineering subsection of the
                    host domain. The exact <strong>path to the resource</strong> is /~audim/CS290/M1/a1-audim/, showing the file structure that points directly to the directory in the 
                    server's memory that holds the file.
                </p>
            </article>
            <article id="frontendDesign">
                <h3>Frontend Design</h3>
                    
                    <p>
                        <strong>Frontend design</strong> is the area of web design concerned with the development of the user facing portions of a web application. This section of
                        design includes visual design, interactive experiences, and the graphical user-interface that will be the user's way of interfacing with the application. In 
                        general, good design entails having a cohesive visual language that includes consistent and appropriate coloring, iconography, font choice, and media usage. 
                        A user should be able to tell that they are on the same site through its visual presentation alone, and a consistent GUI will allow for ease of use and navigation.  
                        The fact that frontend design is so focused on the user side of the web application experience means that <strong>usability/inclusivity</strong> is a key 
                        metric to judge the success of a given design's implementation. 
                    </p>
                    
                    <h4><strong>The Five "E"s of Usability</strong></h4>
                    <dl>
                        <dt><strong>Effective</strong></dt>
                        <dd>The web application or element is useful for helping the user achieve their goal in a way that is straight forward. A user should be able  
                            to perform their intended task and receive exactly the response expected from the site without difficulty.</dd>
                        <dt><strong>Efficient</strong></dt>
                        <dd>The web application should impose as few barriers as possible to the user completing their tasks as possible. Users should achieve their goals 
                            quickly and with as few interruptions from design choices as possible.</dd>
                        <dt><strong>Easy to navigate</strong></dt>
                        <dd>The content and interactive elements of the web application are clearly presented in logical and easy to navigate to locations. Users should not have
                            to search extensively for an element required to achieve their goal, and on return visits should be able to return to relevant material easily.</dd>
                        <dt><strong>Error-free</strong></dt>
                        <dd>The web application should avoid having issues that impact usability through poor design or bugs in the code. Users expect a frictionless use experience,
                            and anything that renders the app unusable is inappropriate.</dd>
                        <dt><strong>Enjoyable or Engaging</strong></dt>
                        <dd>The website must provide a pleasant user experience through its design. Users should not only find the web application helpful in competing their tasks, 
                            but it should conform to their design expectations and aesthetic preferences.</dd>
                    </dl>
                    
                    <p>
                        There are a number of <strong>page layout tags</strong> that HTML uses to structure a web application by breaking up the flow of content into 
                        <strong>block-level</strong> elements. At the top of the page, the <strong>&lt;header&gt;</strong> element usually contains the site's name, publisher,
                        and any slogans associated with the web app that are to be displayed on each page of the site. Frequently, a <strong>&lt;nav&gt;</strong> element follows 
                        which contains links to other parts of the site for easy user navigation. Next, the content of the body of the web page is contained in the 
                        <strong>&lt;main&gt;</strong> element. The <strong>&lt;main&gt;</strong> element is broken up by thematically related content groups held inside 
                        <strong>&lt;section&gt;</strong> elements. Inside the different sections <strong>&lt;article&gt;</strong> elements cover a single topic of interest that 
                        can be individually tagged for styling and identification. Finally, at the bottom of the page outside the <strong>&lt;main&gt;</strong> element is the 
                        <strong>&lt;footer&gt;</strong> element, which contains legal, copyright, publication, and contact information as well as links to other important pages.
                    </p>
                    
                    <h4>Anchors</h4>
                    <ol>
                        <li>
                            <strong>Anchors</strong> can link to external web content by providing a description of the content between the <strong>&lt;anchor&gt;</strong> tags and
                            by including an <strong>absolute path</strong>, or complete URL, to the destination as a href attribute in the opening tag.
                        </li>
                        <li>
                            Linking to other content internal to the current web page can be accomplished with <strong>anchors</strong> by using an <strong>ID attribute</strong>
                            that corresponds to a matching <strong>ID</strong> embedded in an <strong>&lt;article&gt;</strong> element. The content must be described between the 
                            <strong>anchors</strong> tags, and a href attribute in the opening tag points to the <strong>ID</strong> with a hashtag.
                        </li>
                        <li>
                            Connecting multiple pages in a web application is usually accomplished by employing the <strong>&lt;nav&gt;</strong> element. This element produces 
                            buttons in a <strong>navigation</strong> bar that the user can use to click between pages pointed to by an <strong>anchor</strong> element. 
                            <strong>Relative paths</strong>, or URLs that point to locations relative to the current file, are used to link between pages held in closely connected directories.
                        </li>
                    </ol>
            </article>
            <article id="optImages">
                <h3>Optimizing Images</h3>
                
                <p>
                    The six major specifications of web images are <strong>SVG</strong>, <strong>GIF</strong>, <strong>8-bit PNG</strong>, <strong>24-bit PNG</strong>, 
                    <string>JPG</string>, and <strong>WebP</strong>. <strong>SVG</strong>, or scalable vector graphics, are used to represent high quality line-art or animated images, 
                    and can employ RGB color modes and transparency. <strong>GIF</strong> files are commonly used for short animated videos or line-art in lower quality and use an 
                    indexed color mode. <strong>8-bit PNG</strong> are used for line-art images, biomorphic shapes, and solid colored elements that will allow a background to bleed through 
                    the image. They can use either RGB or indexed color modes as compression constraints require. <strong>24-bit PNG</strong> files are similar to their 8-bit counterpart, but have 
                    an alpha channel to manage transparency and can reproduce photos with the right compression. <strong>JPG</strong> files are usually larger files that are used for high quality 
                    and detailed images like photographs or screenshots that require high RGB color accuracy and more lossless compression to maintain quality. 
                    <strong>WebP</strong> files are used most commonly with photos for the same reasons as JPG files, but they can also provide image transparency with an 
                    optional alpha channel that allows them to be better embedded into site backgrounds. Each file type has its specialization, whether that is recreating a high quality 
                    photo or a low quality animated video, that allows it to remain a relevant tool for displaying web content.
                </p>
                
                <p>
                    The file formats most well suited to displaying photos are <strong>JPG</strong> and <strong>WebP</strong> files. These file types are best able to display the 
                    level of detail and color depth that can be produced by modern cameras, while being compressed into small enough sizes to be practical for web applications. Often they
                    employ <strong>lossless compression</strong> to achieve these manageable file sizes and use an RGB color mode to maintain color accuracy. Line-art does not generally
                    require the higher fidelity of photographs, and usually comes as <strong>SVG</strong>, <strong>GIF</strong>, or <strong>PNG</strong> formatted files. These file types
                    are better at reproducing simpler images and text in clear ways in small file sizes. They frequently employ transparency values that allow them to better embed
                    into the background of the site and have more flexibility in the color mode they use, such as RGB or indexed color. This makes these files flexible, but less capable of rendering 
                    the high accuracy details required in photos, especially after undergoing compression.
                </p>
            </article>
            <article id="favicons">
                <h3>Favicons</h3>
                
                <p>
                    <strong>Favicons</strong> are a visual shorthand to represent a web application in various locations. They frequently appear in the browser’s tab, as 
                    icons on smart devices like phones or smartwatches, or as an identifying part of a search engine’s output. As image files, they are most often saved as 
                    .PNG, .SVG, or the older .ICO format that originated with Internet Explorer. These image files are stored on the web server and served up in different 
                    formats or quality levels based on the specification of the requesting device. This visual emblem should be representative of the site and become associated
                    with it by the user so that it can be recognized at a glance in a tab or as an icon.
                </p>
            </article>
            <article id="css">
                <h3>Cascading Stylesheets</h3>
                
                <p>
                    <strong>Cascading Style Sheets</strong> are an important element of websites and web apps because they can shape how the content and structure defined in HTML is  
                    seen by the website's users. <strong>CSS</strong> can override the appearance and functionality of the elements of HTML to improve the user experience by improving 
                    formatting, visual design, and general usability of the website. Stylesheets also have the advantage that they can be defined once and then used to codify the way 
                    the entire site will appear and act, improving the experience of using the site by unifying its presentation. 
                </p>
                
                <p>
                    The primary way to incorporate style in a webpage is by <strong>linking</strong> an external stylesheet in the HTML header that contains CSS rules that modify the 
                    look and feel of the site. Another method is to <strong>import</strong> a stylesheet inside another stylesheet to modify more granular elements not handled by the 
                    global stylesheet linked in the HTML. Both of these methods utilize an <strong>external</strong> stylesheet to alter the website. Style modifiers can also be 
                    <strong>embedded</strong> in style tags in the area one wants to change in the HTML file. Modifications can also be done <strong>inline</strong> when the HTML 
                    element is declared, giving it a variety of characteristics that only apply to that element. Finally, <strong>manipulating the Document Object Model</strong> in a 
                    JavaScript file can also accomplish the goal of changing the character of a specific element of HTML from the associated JavaScript files. The last three of these methods
                    are typically used for unique changes at specific locations, unlike imported or linked stylesheets, which modify the whole site.
                </p>
            </article>
            <article id="forms">
                <h3>Forms</h3>
                
                <p>
                    The first major goal of an accessible form is to <strong>clearly instruct</strong> the user in how the form should be filled out so that an impaired or novice user can 
                    use the form. Next, a user should <strong>understand the purpose</strong> of the information collected by the form so they can make informed consent to share their data with
                    the website. Then the user should know what sections of the form are <strong>required data</strong> so that the form can accomplish its goal. The web application author should
                    then <strong>autofocus</strong> the input so that users can immediately start entering data without clicking, meaning that <strong>keyboard entry</strong> can fill in the whole
                    form, allowing accessibility for those who only use a keyboard. This is similarly aided by <strong>tab indexing</strong> that allows for easier navigation and filling out of the 
                    form. Finally, ensuring that <strong>validation messages</strong> are parsable by screen readers to help those with impairments. All of these goals aim at making websites easier to 
                    use for those less capable or new to the web.
                </p>
                
                <p>
                    Forms in HTML have a series of major tags, starting with the <strong>form</strong> tag that has an action attribute that defines a path for the completed form to be sent and a method 
                    attribute that describes how that data will be sent, for example as a POST or GET. Next, <strong>fieldset and legend</strong> tags act as formatting tags to break up form content in ways that
                    are easy to read and parse for accessibility software. The <strong>label</strong> tag uses the for attribute to match with form control id values and are intended to let the user know what they 
                    are doing and why in the form. <strong>Input</strong> tags are used to handle data-input from the user and can be radically changed by type attributes with their own formatting and data entry types.
                    Inputs also require a name, so the response server can properly handle it when submitted, and an id attribute to connect to the associated label. <strong>Select</strong> and <strong>option</strong>
                    tags create a dropdown menu with various options defined by the options. The select element requires a name and id like an input, and the option tags require a value attribute to be sent as a server response.
                    The <strong>textarea</strong> element allows for user input of text into a text field. Finally, the <strong>button</strong> element uses the action attribute to send the form to the server when accessed by the user.
                </p>
                
                <p>
                    Some major recommendations for improving form styling involve altering height, width, contrast, margins, and paddings to improve user control of the form. All forms should inherit the font family of the rest of the site.
                    In the fieldset it is common to alter color, type, width, borders, margins, and padding. Legend properties are difficult to change, but font color and size can improve comprehensibility. Labels should be displayed as blocks to not
                    appear above the user entry section. Autofocus is an attribute that can help a user see where they are focused on a form, and attributes of the form can be changed to show visually where that focus is.
                    Required elements can have different attributes to make it clear to the user what form elements must be filled in before submission and show when invalid input is input in the form. Placeholder text and background attributes can be updated 
                    to better tie into the style of the website. Similarly, checkboxes and selectors can be altered to improve visual continuity. Basically, all elements can be styled in some way to improve visual fidelity and make it clear to the user 
                    what information is in focus and most important for the form.   
                </p>
            </article>
            <article id="express">
                <h3>Express</h3>
              
                <p>
                    <strong>Node.js</strong> is a JavaScript based runtime environment for developing complex server applications using its extensive built in library of modules that come built in.
                    These modules can be installed through the <strong>Node Package Manager (npm)</strong> that allows for searching for and downloading the repository modules on which Node operates.
                    <strong>Express.js</strong> is one of the modules for Node, and it provides an API for many of the tasks that are expected of a web application, like getting or posting data. It also allows
                    serving static website files from a public folder and create dynamic responses to user submitted forms. These technologies make the lower level implementation of basic server functionality 
                    simple to allow the developer to focus on enhancing the user experience. 
                </p>
            </article>
            <article id="javascript">
                <h3>JavaScript</h3>
               
                <p>
                    JavaScript has a number of data types that are assigned to variables dynamically. <strong>Numbers</strong> are integer or floating-point number values stored as 
                    double-precision floats. <strong>Boolean</strong> values represent true or false values. <strong>String</strong> values are text characters between single or double quotes,
                    or templates between backticks. <strong>Null</strong> and <strong>undefined</strong> are special primitive types that represent a missing value in a function or variable. 
                    <strong>Objects</strong> are a collection of properties with assigned values, including functions, that act as a more complex data type than the primitives listed above.
                </p>
                
                <p>
                    <strong>Objects</strong> are a collection of properties with values, including functions and data, that can be acted upon to create, read, update, or delete the data they contain. In JavaScript,
                    objects are a set of name and value pairs, with functions stored as one of the named properties as well. <strong>Arrays</strong> are a data structure that has indexed values in a 
                    numbered list. In JavaScript, arrays are treated as objects with the property being the index, and they can contain data of any acceptable type. <strong>JSON</strong>, or JavaScript Object Notation, is 
                    used as a method of exchanging object or array data between applications independent of programming language. This is done by turning objects or arrays into strings which can be parsed by applications or
                    printed out in a formatted manner.
                </p>
                
                <p>
                    In JavaScript, conditionals and loops are largely used in similar ways to other programming languages. Conditionals include <strong>if</strong>, <strong>switch statements</strong>, and <strong>Ternary Operators</strong>. 
                    If statements follow a standard if...else if...else structure to control program flow. Switch statements test numbered cases with a break or exit out of a default case. Ternary Operators allow for a single line conditional to
                    evaluate between a true or false expression based on a condition using a truncated format of test condition ? true : false. Each of these test to a Boolean value to control program flow. Loops test a conditional to determine if 
                    a piece of code should be run. <strong>While</strong> loops execute while a condition is true, <strong>do while</strong> loops execute at least once then act as a while loop, and <strong>for</strong> loops execute a predetermined 
                    number of times. The <strong>for of</strong> loop iterates over an element like an array from start to finish, and the <strong>for in</strong> loop iterates through the named properties and values of an object. Each of these loops 
                    repeats codes based on the veracity of a conditional statement. JavaScript's biggest difference to other languages is that it has <strong>strict</strong> and <strong>loose</strong> equality in evaluation, meaning it checks data type first or
                    does an automatic conversion before evaluation.
                </p>
                
                <p>
                    <strong>Object-oriented programming</strong> is the programming paradigm that relies on objects to bind properties and procedures that act on those properties to a single identity. 
                    These objects are used as the basis for complex programs where objects act on, inherit, or modify each other as the case requires. Object-orientation allows for more modular code and 
                    better data encapsulation.
                </p>
                
                <p>
                    <strong>Functional programming</strong> is the programming paradigm that focuses on using first-class functions to accomplish complex goals. These functions are able to be 
                    assigned to variables, passed to other functions as arguments, and can return functions themselves. This allows for complex programs to be composed of functions that interact with
                    each other. These functions are modular blocks of code that accomplish a single goal and can be combined to achieve more complex tasks. 
                </p>
            </article>
        </>
    );
}
export default TopicsPage;