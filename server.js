// imported all neccessary packages
const express = require('express');
const path = require('path');
const fs = require('fs');
// PORT will use an available port for Heroku or use PORT 3001
const PORT = process.env.PORT || 3001;
const app = express();
// renamed v4 method from uuid as uuidv4
const { v4: uuidv4 }= require('uuid');
// created a variable as the array from db.json file
const noteArr = require('./db/db.json')

 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the landing page as index.html
app.get(' *', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// set the /notes path to display the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// set the /api/notes path to read the db.json file
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err){
            console.error(err)
            return
        }
        const notes = JSON.parse(data);
        res.json(notes);
    } )
});
// post method to take user input in note title and note text and save it as an object in the db.json file with a unique id created from uuidv4 method
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if(title && text){
    const newNote = {
        title,
        text,
        id: uuidv4(),
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            return
        }
        noteArr.push(newNote)
        fs.writeFile(`./db/db.json`, JSON.stringify(noteArr, null, 4), (err) => {
            err ? console.error(err) : console.info(`New note has been written to JSON file`)
        });
        
        res.json(noteArr);
    });
    }
    else {
        res.json('Error creating note')
    }   
}); 

// delete method from express to remove an object in db.json array if user clicks on delete button
app.delete('/api/notes/:id', (req, res) => {
    for(let i = 0; i < noteArr.length; i++){
       let currentNote = noteArr[i];
       if(req.params.id === currentNote.id){
            noteArr.splice(i, 1);
        }
    }   
    fs.writeFile('./db/db.json', JSON.stringify(noteArr, null, 4), (err) => {
        err ? console.error(err) : console.info(`Note Deleted`)
    })
    res.json(noteArr) 
   
    

})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));