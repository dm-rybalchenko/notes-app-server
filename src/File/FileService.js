import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
const allowedFileSize = 5 * 1000000; //5Mb

class FileService {
  saveFile(file) {
    try {
      const fileType = file.mimetype;

      if (!allowedFileTypes.includes(fileType)) {
        throw new Error('Unsupported file-type was provided');
      }
      if (file.size > allowedFileSize) {
        throw new Error(`The file size is more than 5Mb. Upload a less one.`);
      }

      const fileName = uuid.v4() + '.' + fileType.slice(6);
      const filePath = path.resolve('static', fileName);
      file.mv(filePath);

      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  updateFile(OldFileName, newFile) {
    try {
      const newFileName = this.saveFile(newFile);
      this.deleteFile(OldFileName);

      return newFileName;
    } catch (e) {
      console.log(e);
    }
  }

  deleteFile(fileName) {
    try {
      const filePath = path.resolve('static', fileName);
      if (fs.existsSync(filePath) && fileName) {
        fs.unlinkSync(filePath);
      }

      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
