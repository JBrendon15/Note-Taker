const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();
 
app.use(express.static('public'));

app.get('*', (req, res) => {

});

app.get('/notes', (req, res) => {

});

app.get('/api/notes', (req, res) => {

});

app.post('/notes', (req, res) => {

});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));