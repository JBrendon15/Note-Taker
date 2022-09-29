const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const { v4: uuidv4 }= require('uuid');
 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(' *', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err){
            console.error(err)
            return
        }
        console.log(data)
        res.json(data)
    } )
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if(title && text){
    const newNote = {
        title,
        text,
        text_id: uuidv4(),
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            return
        }
        console.log(data) 
        const notesList = JSON.parse(data)
        notesList.push(newNote)
        console.log(notesList)
        fs.writeFile(`./db/db.json`, JSON.stringify(notesList, null, 4), (err) => {
            err ? console.error(err) : console.info(`New note has been written to JSON file`)
        });
        
    });

    const response = {
        status: 'Sucess!',
        body: newNote,
    };
    res.status(201).json(response);
    }
    else {
        res.status(500).json('Error creating note')
    }   
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));