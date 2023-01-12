import multer from 'multer';
import cloudinary from 'cloudinary';


const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
const allowedFileSize = 5 * 1000000; //10Mb

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: allowedFileSize },
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .gif, .jpg and .jpeg formats allowed!'));
    }
  },
}).single('file');

export { cloudinary, uploader };
