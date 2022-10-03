const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'db/db.json'), err => {
        if (err) throw err;
    });
});

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/notes.html'), err => {
        if (err) throw err;
    });
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'), err => {
        if (err) throw err;
    });
});

app.post('/api/notes', (request, response) => {
    const newNoteData = request.body;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const updatedNoteData = JSON.parse(data);
        updatedNoteData.push(newNoteData);
        fs.writeFile('./db/db.json', JSON.stringify(updatedNoteData), err => {
            if (err) throw err;
        });
    });
    response.sendStatus(200);
});

app.listen(PORT);
