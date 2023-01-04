import mongoose from 'mongoose';

const Note = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: String, required: true },
  file: { type: String, required: false },
});

export default mongoose.model('Note', Note);
