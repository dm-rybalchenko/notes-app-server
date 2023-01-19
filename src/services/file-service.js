import FileDto from '../dtos/file-dto.js';
import File from '../models/file-model.js';
import ApiError from '../exeptions/api-error.js';


class FileService {
  async upload(file) {
    if (!file) {
      throw ApiError.BadRequest('Файл не был предоставлен');
    }

    const createdFile = await File.upload(file.path);
	const fileData = new FileDto(createdFile, file.originalname)

    return fileData;
  }

  async update(id, file) {
    if (!id) {
      throw ApiError.BadRequest('Не предоставлен id файла');
    }
    if (!file?.path) {
      throw ApiError.BadRequest('Файл или путь к нему не был пердоставлен');
    }

    const updatedFile = await File.upload(file.path);
	// TODO разобраться с целесообразностью ошибки ниже. Подумать об бработке ошибок обращения к БД и Облаку
	if(!updatedFile){
		throw ApiError.ServerError('Файл не был обновлен. Повторите позже, пожалуйста')
	}

    await File.destroy(id);
	const fileData = new FileDto(updatedFile, file.originalname)

    return fileData;
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest('Не предоставлен id файла');
    }

    const deletedFile = await File.destroy(id);
    if (deletedFile.result === 'not found') {
      throw ApiError.BadRequest(`Файл c id [${id}] не найден`);
    }

    return {
      id: id,
      success: deletedFile.result,
    };
  }
}

export default new FileService();
