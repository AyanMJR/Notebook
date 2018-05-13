const express = require('express');4
const app = express();
const path = require('path');

app.use('/', (req, res) => {
    res.send(path.join(__dirname, '/dist/index.html'));
})

app.listen(3000);