import FileDto from '../dtos/file-dto.js';
import File from '../models/file-model.js';
import ApiError from '../exeptions/api-error.js';
import noteModel from '../models/note-model.js';

class FileService {
  async upload(file) {
    if (!file) {
      throw ApiError.BadRequest('Файл не был предоставлен');
    }

    const createdFile = await File.upload(file.path);
    const fileData = new FileDto(createdFile, file.originalname);

    return fileData;
  }

  async update(userId, fileId, file) {
    if (!fileId) {
      throw ApiError.BadRequest('Не предоставлен id файла');
    }
    if (!file?.path) {
      throw ApiError.BadRequest('Файл или путь к нему не был пердоставлен');
    }

    const note = await noteModel.findOne({ 'file.id': fileId });
    if (note._owner.toString() !== userId) {
      throw ApiError.BadRequest('У вас нет доступа к этому файлу');
    }

    const updatedFile = await File.upload(file.path);
    if (!updatedFile) {
      throw ApiError.ServerError(
        'Файл не был обновлен. Повторите позже, пожалуйста'
      );
    }

    await File.destroy(fileId);
    const fileData = new FileDto(updatedFile, file.originalname);

    note.file = fileData;
    note.save();

    return fileData;
  }

  async delete(userId, fileId) {
    if (!fileId) {
      throw ApiError.BadRequest('Не предоставлен id файла');
    }

    const note = await noteModel.findOne({ 'file.id': fileId });
    if (note._owner.toString() !== userId) {
      throw ApiError.BadRequest('У вас нет доступа к этому файлу');
    }

    const deletedFile = await File.destroy(fileId);
    if (deletedFile.result === 'not found') {
      throw ApiError.BadRequest(`Файл c id [${fileId}] не найден`);
    }

    note.file = undefined;
	note.save();

    return {
      id: fileId,
      success: deletedFile.result,
    };
  }
}

export default new FileService();
