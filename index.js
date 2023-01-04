import express from 'express';
import mongoose from 'mongoose';
import NoteRouter from './src/Note/NoteRouter.js';
import fileUpload from 'express-fileupload';

const PORT = process.env.PORT || 5000;
const DB_URL =
  'mongodb+srv://note-admin:789456@cluster0.rsxclrx.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/', NoteRouter);

mongoose.set('strictQuery', true);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
