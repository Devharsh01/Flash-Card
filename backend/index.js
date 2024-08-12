const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { Client } = require('pg'); 

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000; // Use 3000 or any other port

const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE, // Ensure you specify the database
    password: process.env.PASSWORD,
    port: process.env.DB_PORT, 
});

db.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

//Add new Card
app.post('/addCard', async (req, res) => {
    try {
        console.log("Adding To Card", req.body.question, req.body.answer)
        const result = await db.query('INSERT INTO cards (question, answer) VALUES ($1, $2)',[req.body.question, req.body.answer]);
        res.status(200).json({success: true, message: "Added Successfully"});
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

//Fetching all the data
app.get('/alldata', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM cards");
        res.json(result.rows);  // Send the result as JSON to the client
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send("Server Error");
    }
});

app.delete('/removeCard', async (req, res) => {
    try {
        // Execute the delete query
        const result = await db.query('DELETE FROM cards WHERE question = $1', [req.body.question]);
        if (result.rowCount > 0) {
            res.status(200).json({ success: true, message: "Card deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "No card found with that question" });
        }
    } catch (err) {
        console.error('Error deleting card:', err);
        res.status(500).send("Server Error");
    }
})

app.put('/updateCard', async (req, res) => {
    try {
        const { updateType, currentValue, newValue } = req.body;
        // Determine which column to update
        let updateQuery = '';
        if (updateType === 'question') {
            updateQuery = 'UPDATE cards SET question = $2 WHERE question = $1';
        } else if (updateType === 'answer') {
            updateQuery = 'UPDATE cards SET answer = $2 WHERE answer = $1';
        } else {
            return res.status(400).json({ success: false, message: "Invalid update type" });
        }

        // Execute the update query
        const result = await db.query(updateQuery, [currentValue, newValue]);
        if (result.rowCount > 0) {
            res.status(200).json({ success: true, message: `${updateType} updated successfully` });
        } else {
            res.status(404).json({ success: false, message: `No record found with the given ${updateType}` });
        }
    } catch (err) {
        console.error('Error updating card:', err);
        res.status(500).send("Server Error");
    }
});


app.listen(port, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log("Server is running at port " + port);
    }
});
