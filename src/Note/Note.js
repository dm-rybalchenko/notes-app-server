import mongoose from 'mongoose';


const Note = new mongoose.Schema({
  title: { type: String, required: false },
  body: { type: String, required: false },
  tags: { type: [String], required: false },
  date: { type: String, required: false },
  file: {
    type: {
      id: String,
      url: String,
      name: String,
    },
    required: false,
  },
});

export default mongoose.model('Note', Note);
