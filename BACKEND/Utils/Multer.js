import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./Public");
  },
  filename: function (req, file, cb) {
    const uniqueSuff = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuff + ".png");
  },
});

export const upload = multer({ storage: storage });
