const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
 
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
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            return
        } 
        const notesList = JSON.parse(data)
        notesList.push()
    })

});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));