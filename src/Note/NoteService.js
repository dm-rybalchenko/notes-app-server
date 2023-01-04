import FileService from '../File/FileService.js';
import Note from './Note.js';

class NoteService {
  async getAll() {
    const notes = await Note.find();
    return notes;
  }

  async create(note, file) {
	if (file){
		const fileName = FileService.saveFile(file);
		note.file = fileName;
	}
    const newNote = await Note.create(note);
    return newNote;
  }

  async update(note, file) {
    if (!note._id) {
      throw new Error('Id was not provided');
    }

	if (file){
		const oldNote = await Note.findById(note._id);
		const fileName = FileService.updateFile(oldNote.file, file);
		note.file = fileName;
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
	
    if (deletedNote.file) {
      FileService.deleteFile(deletedNote.file);
    }

    return deletedNote;
  }
}

export default new NoteService();
