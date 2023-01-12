import Note from './Note.js';


class NoteService {
  async getAll() {
    const notes = await Note.find();
    return notes;
  }

  async create(note) {
    const newNote = await Note.create(note);
    return newNote;
  }

  async update(note) {
    if (!note) {
      throw new Error('Note object was not provided');
    }
    if (!note._id) {
      throw new Error('Id was not provided');
    }

    const updatedNote = await Note.findByIdAndUpdate(note._id, note, {
      new: true,
    });

    return updatedNote;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id was not provided');
    }
    const deletedNote = await Note.findByIdAndDelete(id);

    if (deletedNote === null) {
      throw new Error(`Note with id [${id}] was not found`);
    }

    return deletedNote;
  }
}

export default new NoteService();
