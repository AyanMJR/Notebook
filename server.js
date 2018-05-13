const express = require('express');4
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(3000);