// Controllers for the Musical Collection

import 'dotenv/config';
import express from 'express';
import * as musicals from './musical-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/musicals', (req,res) => { 
    musicals.createMusical(
        req.body.show, 
        req.body.performanceDate, 
        req.body.rating
        )
        .then(musical => {
            console.log(`"${musical.show}" was added to the musical review collection.`);
            res.status(201).json(musical);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Failure to add a review to the database due to a formatting error in the submission.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/musicals', (req, res) => {
    musicals.retrieveMusical()
        .then(musical => { 
            if (musical !== null) {
                console.log(`All musical reviews were retrieved from the collection.`);
                res.json(musical);
            } else {
                res.status(404).json({ Error: 'There are no musical reviews to retrieve from the database.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request to retrieve all musical reviews failed due to a badly formatted request.' });
        });
});


// RETRIEVE by ID controller
app.get('/musicals/:_id', (req, res) => {
    musicals.retrieveMusicalByID(req.params._id)
    .then(musical => { 
        if (musical !== null) {
            console.log(`"${musical.show}" review was retrieved, based on its ID.`);
            res.json(musical);
        } else {
            res.status(404).json({ Error: 'There was no musical review with that ID stored in the database.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Request to retrieve a musical review by ID failed due to a badly formatted request.' });
    });

});


// UPDATE controller ************************************
app.put('/musicals/:_id', (req, res) => {
    musicals.updateMusical(
        req.params._id, 
        req.body.show, 
        req.body.performanceDate, 
        req.body.rating
    )
    .then(musical => {
        console.log(`"${musical.show}" review was updated.`);
        res.json(musical);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Request to update a musical review by ID failed due to a badly formatted request.' });
    });
});


// DELETE Controller ******************************
app.delete('/musicals/:_id', (req, res) => {
    musicals.deleteMusicalById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} musical review was deleted.`);
                res.status(200).send({ Success: 'The requested musical review was deleted.' });
            } else {
                res.status(404).json({ Error: 'There was no musical review with that ID stored in the database to be deleted.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to delete a musical review by ID failed due to a badly formatted request.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});