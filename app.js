import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

// add a possibility to use files from the "public" directory
app.use(express.static('public'));

// render the index.html file by the "/" route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// return a list of articles from the db.json
app.get('/items/', (req, res) => {
    jsonReader("./db.json", (err, json) => {
        if (err) return;

        res.setHeader('Content-Type', 'application/json');
        res.end(json);
      });
});

app.listen(port, () => {
    console.log(`Test project is here: http://localhost:${port}`);
});

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) return cb && cb(err);

        try {
            return cb && cb(null, fileData);
        } catch (err) {
            return cb && cb(err);
        }
    });
}