import { Schema, model } from 'mongoose';


const noteSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, required: true },
  title: { type: String },
  body: { type: String },
  tags: { type: [String] },
  date: { type: String },
  file: { type: { id: String, url: String, name: String } },
});

export default model('Note', noteSchema);
