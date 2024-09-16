// Models for the Musical Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Failure to connect to the musical review MongoDB database.' });
    } else  {
        console.log('Success: Connected to the musical review MongoDB database.');
    }
});

// SCHEMA: Define the collection's schema.
const musicalSchema = mongoose.Schema({
	show:    { type: String, required: true },
	performanceDate:     { type: Date, required: true },
	rating: { type: Number, required: true, min: '0', max: '100' }
});

// Compile the model from the schema 
// by defining the collection name "musicals".
const musicals = mongoose.model('Musical', musicalSchema);


// CREATE model *****************************************
const createMusical = async (show, performanceDate, rating) => {
    const musical = new musicals({ 
        show: show, 
        performanceDate: performanceDate,
        rating: rating
    });
    return musical.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveMusical = async () => {
    const query = musicals.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveMusicalByID = async (_id) => {
    const query = musicals.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteMusicalById = async (_id) => {
    const result = await musicals.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateMusical = async (_id, show, performanceDate, rating) => {
    const result = await musicals.replaceOne({_id: _id }, {
        show: show, 
        performanceDate: performanceDate,
        rating: rating
    });
    return { 
        _id: _id, 
        show: show, 
        performanceDate: performanceDate,
        rating: rating
    }
}

// EXPORT the variables for use in the controller file.
export { createMusical, retrieveMusical, retrieveMusicalByID, updateMusical, deleteMusicalById }