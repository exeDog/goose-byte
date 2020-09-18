const express = require('express');
const app = express();
const port = 5000;
const fileUpload = require('express-fileupload');
const fs = require("fs");
const banner = fs.readFileSync('./.banner', 'UTF-8');

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(banner);
})

app.get('/scan', (req, res) => {
    res.send('POST - {"body": "script-contents"}');
})

app.post('/scan', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    fs.writeFile('/tmp/upload.js', req.files.data.data, (e) => {
        console.log("TODO - callback");
    });

    res.send(`Received: ${req.files.data.name}, ${req.files.data.size} bytes`);
});

app.listen(port, () => {
    console.log(banner)
    console.log(`Listening at http://localhost:${port}`)
});
