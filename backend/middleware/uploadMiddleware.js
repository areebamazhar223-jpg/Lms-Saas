import multer from "multer";
import path from "path";
import fs from "fs";


// ===============================
// Upload Folder
// ===============================

const uploadPath = path.join(
  process.cwd(),
  "uploads"
);


if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true
  });

}


// ===============================
// Storage
// ===============================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadPath);

  },


  filename: (req, file, cb) => {

    const ext = path
      .extname(file.originalname)
      .toLowerCase();


    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1000000000
      )}${ext}`;


    cb(null, uniqueName);

  }

});


// ===============================
// File Filter
// ===============================

const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jfif",

    // Videos
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",

    // PDF
    "application/pdf"

  ];


  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only images, videos and PDF files are allowed"
      ),
      false
    );

  }

};


// ===============================
// Multer Config
// ===============================

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024
  }

});


export default upload;