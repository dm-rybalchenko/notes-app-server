import multer from 'multer';
import ApiError from '../exeptions/api-error.js';


const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
const allowedFileSize = 5 * 1000000; //10Mb

const uploader = multer({
  storage: multer.diskStorage({
	filename: (req, file, cb) =>{
		file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
		cb(null, file.originalname);
	}
  }),
  limits: { fileSize: allowedFileSize },
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        ApiError.BadRequest(
          'Для загрузки разрешены следующие форматы файлов: .png, .gif, .jpg и .jpeg!'
        )
      );
    }
  },
}).single('file');

export default uploader;
