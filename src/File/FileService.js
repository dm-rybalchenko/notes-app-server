import { cloudinary } from './File.js';


class FileService {
  async upload(file) {
    if (!file) {
      throw new Error('File was not provided');
    }

    const createdFile = await cloudinary.v2.uploader.upload(file.path);

    return {
      id: createdFile.public_id,
      url: createdFile.secure_url,
      name: file.originalname,
    };
  }

  async update(id, file) {
    if (!id) {
      throw new Error('Id was not provided');
    }
    if (!file) {
      throw new Error('File was not provided');
    }

    const updatedFile = await cloudinary.v2.uploader.upload(file.path);
    updatedFile && (await cloudinary.v2.uploader.destroy(id));

    return {
      id: updatedFile.public_id,
      url: updatedFile.secure_url,
      name: file.originalname,
    };
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id was not provided');
    }

    const deletedFile = await cloudinary.v2.uploader.destroy(id);
    if (deletedFile.result === 'not found') {
      throw new Error(`File with id [${id}] was not found`);
    }

    return {
      id: id,
      success: deletedFile.result,
    };
  }
}

export default new FileService();
