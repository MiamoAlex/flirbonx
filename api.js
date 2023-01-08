import express from 'express';
const app = express();

import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { MongoManager } from './MongoManager.js';

const port = 3003;
app.use(express.json());

// Dossier public
app.use(express.static('./public'));

const mongoManager = new MongoManager();

app.listen(port, () => {
    console.log(`Api Flirbonx sur port ${port} 💜`);
    mongoManager.main();
});

// Récupération de sauvegarde
app.use('/getsave/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await mongoManager.getUser(id));
});

// Add user
app.use('/addUser', (req, res) => {
    mongoManager.generateDummyUser();
    res.json({ text: 'Ajouté' });
});