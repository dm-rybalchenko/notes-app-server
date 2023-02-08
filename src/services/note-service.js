import noteModel from '../models/note-model.js';
import File from '../models/file-model.js';
import ApiError from '../exeptions/api-error.js';
import NoteDto from '../dtos/note-dto.js';


class NoteService {
  async getAll(userId) {
    const notes = await noteModel.find({ _owner: userId });
    const notesArray = notes.map((note) => new NoteDto(note));

    return notesArray;
  }

  async getById(userId, id) {
    if (!id) {
      throw ApiError.BadRequest('Не предоставлен id записи');
    }

    const note = await noteModel.findById(id);
    if (!note) {
      throw ApiError.BadRequest(`Запись с id [${id}] не найдена`);
    }

    if (note._owner.toString() !== userId) {
      throw ApiError.BadRequest('У вас нет доступа к этой записи');
    }

    const noteData = new NoteDto(note);

    return noteData;
  }

  async create(userId, note) {
    const newNote = await noteModel.create({ ...note, _owner: userId });
    const noteData = new NoteDto(newNote);

    return noteData;
  }

  async update(userId, note) {
    if (!note) {
      throw ApiError.BadRequest('Не предоставлен объект записи');
    }
    if (!note.id) {
      throw ApiError.BadRequest('Не предоставлен id записи');
    }

    const chosenNote = await noteModel.findById(note.id);
    if (!chosenNote) {
      throw ApiError.BadRequest(`Запись с id [${note.id}] не найдена`);
    }

    if (chosenNote._owner.toString() !== userId) {
      throw ApiError.BadRequest('У вас нет доступа к этой записи');
    }

    const updatedNote = await noteModel.findByIdAndUpdate(note.id, note, {
      new: true,
    });
    const noteData = new NoteDto(updatedNote);

    return noteData;
  }

  async delete(userId, id) {
    if (!id) {
      throw ApiError.BadRequest('Не предоставлен id записи');
    }

    const chosenNote = await noteModel.findById(id);
    if (!chosenNote) {
      throw ApiError.BadRequest(`Запись с id [${id}] не найдена`);
    }

    if (chosenNote._owner.toString() !== userId) {
      throw ApiError.BadRequest('У вас нет доступа к этой записи');
    }

    const deletedNote = await noteModel.findByIdAndDelete(id);
    if (deletedNote.file?.id) {
      await File.destroy(chosenNote.file?.id);
    }
    const noteData = new NoteDto(deletedNote);

    return noteData;
  }
}

export default new NoteService();
