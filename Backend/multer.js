import multer from "multer";

const MulerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `Public/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    cb(null, `${date}-${file.originalname}`);
  },
});

const Upload = multer({ storage: MulerStorage });
export default Upload;
