import { diskStorage } from 'multer';
import path from 'path';
import crypto from 'crypto';

const filesDirectory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: filesDirectory,
  storage: diskStorage({
    destination: filesDirectory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
