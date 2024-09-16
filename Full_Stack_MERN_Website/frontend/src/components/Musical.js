import React from 'react';

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

import { SlTrash, SlPencil } from "react-icons/sl";

function Musical({ musical, onEdit, onDelete }) {
    return (
        <tr>
            <td>{musical.show}</td>
            <td>{musical.performanceDate.slice(0,10)}</td>
            <td>{musical.rating}</td>

            {/* Update these icons to something that matches your style. */}
            <td><SlTrash onClick={() => onDelete(musical._id)} /></td>
            <td><SlPencil onClick={() => onEdit(musical)} /></td>
        </tr>
    );
}

export default Musical;