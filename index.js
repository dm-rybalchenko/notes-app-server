import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './src/middlewares/error-middleware.js';
import userRouter from './src/routers/user-router.js';
import noteRouter from './src/routers/note-router.js';
import fileRouter from './src/routers/file-router.js';


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.URL_CLIENT,
  })
);
app.use('/user', userRouter);
app.use('/upload', fileRouter);
app.use('/', noteRouter);
app.use(errorMiddleware);

mongoose.set('strictQuery', false);

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server starts on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
