import multer from "multer";
import path from "path";

//destinatio to store the images

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    console.log(file.originalname);
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Por favo, envie apenas jpg ou png!"));
    }
    cb(undefined, true);
  },
});
