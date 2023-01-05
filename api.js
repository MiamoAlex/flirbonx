const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const port = 3003;
app.use(express.json());

// Dossier public
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
    console.log(`Api Questlist sur port ${port} 💜`);
})
