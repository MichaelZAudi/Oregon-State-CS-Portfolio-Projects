import React from 'react';
import Musical from './Musical';

// Change the function names and parameters 
// to fit your portfolio topic and schema.

function MusicalList({ musicals, onDelete, onEdit }) {
    return (
        <table id="musicals">
            <caption>Delete and Edit Musicals</caption>
            <thead>
                <tr>
                    <th>Show</th>
                    <th>Date</th>
                    <th>Rating</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {musicals.map((musical, i) => 
                    <Musical 
                        musical={musical} 
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        key={i}
                    />)}
            </tbody>
        </table>
    );
}

export default MusicalList;
