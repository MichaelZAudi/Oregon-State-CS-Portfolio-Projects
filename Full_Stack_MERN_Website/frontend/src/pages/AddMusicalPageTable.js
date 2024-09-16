import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

export const AddMusicalPageTable = () => {

    const [show, setShow]       = useState('');
    const [performanceDate, setPerformanceDate]         = useState('');
    const [rating, setRating] = useState('');
    
    const redirect = useNavigate();

    const addMusical = async () => {
        const newMusical = { show, performanceDate, rating };
        const response = await fetch('/musicals', {
            method: 'post',
            body: JSON.stringify(newMusical),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`The new musical was successfully added to the database.`);
        } else {
            alert(`The adding of this show failed with error code: ${response.status}`);
        }
        redirect("/MusicalPage");
    };


    return (
        <>
        <article>
            <h2>Add a musical</h2>
            <p>Add a new show, date, and rating to the database.</p>
            
            <table id="musicals">
                <caption>Which musical are you adding?</caption>
                <thead>
                    <tr>
                        <th>Show</th>
                        <th>Performance Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td><label for="show">Show Title</label>
                        <input
                            type="text"
                            placeholder="Title of the musical."
                            value={show}
                            onChange={e => setShow(e.target.value)} 
                            id="show" />
                    </td>

                    <td><label for="performanceDate">Performance Date</label>
                        <input
                            type="date"
                            value={performanceDate}
                            placeholder="Performance date of the musical."
                            onChange={e => setPerformanceDate(e.target.value)} 
                            id="performanceDate" />
                    </td>

                    <td><label for="rating">Rating</label>
                        <input
                            type="number"
                            placeholder="Rating out of 100."
                            max={100}
                            value={rating}
                            onChange={e => setRating(e.target.value)} 
                            id="rating" />
                    </td>

                    <td>
                    <label for="submit">Submit Form</label>
                        <button
                            type="submit"
                            onClick={addMusical}
                            id="submit"
                        >Add</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </article>
    </>
);
}

export default AddMusicalPageTable;