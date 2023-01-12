import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import NoteRouter from './src/Note/NoteRouter.js';
import FileRouter from './src/File/FileRouter.js';

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_DB_URL;
const app = express();

app.use(express.json());
app.use('/', FileRouter);
app.use('/', NoteRouter);

mongoose.set('strictQuery', true);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server starts on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
