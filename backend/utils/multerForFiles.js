const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const path = require('path');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const ext = path.extname(file.originalname); // e.g. ".html", ".jpg"
        const baseName = path.basename(file.originalname, ext); // original file name without extension
        const uniqueId = Date.now();// generate short unique ID

    return {
        folder: 'Merge Project/UsersFiles',
        public_id: `${baseName}-${uniqueId}${ext}`, // e.g., "resume-3f1e2ab1.html"
        resource_type: 'auto',
    };
  },
});

const upload = multer({ storage });

module.exports = upload;