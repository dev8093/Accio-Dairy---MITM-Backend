import multer from "multer";

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, file.originalname);
  }
});

// Create multer middleware with the configured storage settings
export const upload = multer({ 
  storage, 
});