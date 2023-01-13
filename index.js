import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import NoteRouter from './src/Note/NoteRouter.js';
import FileRouter from './src/File/FileRouter.js';

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_DB_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const app = express();

const corsOptions = {
  origin: CORS_ORIGIN,
};

app.use(cors(corsOptions));
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
