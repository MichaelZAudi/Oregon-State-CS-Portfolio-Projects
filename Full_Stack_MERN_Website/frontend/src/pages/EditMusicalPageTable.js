import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";

export const EditMusicalPageTable = ({ musicalToEdit }) => {
 
    const [show, setShow]       = useState(musicalToEdit.show);
    const [performanceDate, setPerformanceDate]         = useState(musicalToEdit.performanceDate.slice(0,10));
    const [rating, setRating] = useState(musicalToEdit.rating);
    
    const redirect = useNavigate();

    const editMusical = async () => {
        const response = await fetch(`/musicals/${musicalToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                show: show, 
                performanceDate: performanceDate, 
                rating: rating
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`You have successfully edited the musical in the database.`);
        } else {
            const errMessage = await response.json();
            alert(`The editing attempt failed with error code: ${response.status}. ${errMessage.Error}`);
        }
        redirect("/MusicalPage");
    }

    return (
        <>
        <article>
            <h2>Edit a musical</h2>
            <p>Update the show title, perfomance date, or rating of a musical of choice.</p>
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
                            value={rating}
                            max={100}
                            onChange={e => setRating(e.target.value)} 
                            id="rating" />
                    </td>

                    <td>
                    <label for="submit">Commit</label>
                        <button
                            type="submit"
                            onClick={editMusical}
                            id="submit"
                        >Edit</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </article>
        </>
    );
}
export default EditMusicalPageTable;