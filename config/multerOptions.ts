import multer, { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import uploadPath from 'src/const/uploadPath';
import * as uuid from 'uuid';

const multerOptions: multer.Options = {
  storage: diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const filename = `${uuid.v4()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};

export default multerOptions;
