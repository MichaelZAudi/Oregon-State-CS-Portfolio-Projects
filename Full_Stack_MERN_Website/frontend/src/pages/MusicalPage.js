import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MusicalList from '../components/MusicalList';
import { Link } from 'react-router-dom';

function MusicalsPage({ setMusicalToEdit }) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [musicals, setMusicals] = useState([]);

    // RETRIEVE the entire list of musicals
    const loadMusicals = async () => {
        const response = await fetch('/musicals');
        const musicals = await response.json();
        setMusicals(musicals);
    } 
    

    // UPDATE a single musical
    const onEditMusical = async musical => {
        setMusicalToEdit(musical);
        redirect("/update");
    }


    // DELETE a single musical  
    const onDeleteMusical = async _id => {
        const response = await fetch(`/musicals/${_id}`, { method: 'DELETE' });
        if (response.status === 200) {
            const getResponse = await fetch('/musicals');
            const musicals = await getResponse.json();
            setMusicals(musicals);
        } else {
            console.error(`Failure to delete the musical with id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD all the musicals
    useEffect(() => {
        loadMusicals();
    }, []);

    // DISPLAY the musicals
    return (
        <>
            <h2>List of Musicals</h2>
            <p>A list of musical show titles, performance dates, and ratings.</p>
            <Link to="/create">Add Musical</Link>
            <MusicalList 
                musicals={musicals} 
                onEdit={onEditMusical} 
                onDelete={onDeleteMusical} 
            />
        </>
    );
}

export default MusicalsPage;