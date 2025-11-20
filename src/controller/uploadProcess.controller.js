const multer = require("multer");
const path = require("path")
const uploadDir = ["/upload" , "upload/productImage" , "upload/brandImage"]
const fs = require("fs");


uploadDir.forEach(dir => {
  
if (!fs.existsSync(dir)) {
    // fs.mkdirSync(dir)
    fs.mkdirSync(dir, { recursive: true })
}
});

const storage = multer.diskStorage({
    destination : (req , file , cb ) => {
        if(file.fieldname === 'productImage'){
            cb (null , './upload/productImage')
        }else if(file.fieldname === 'brandImage'){
            cb (null , './upload/brandImage')
        }
    },
    filename : (req , file , cb) => {
        // const uniqueName = Date.now() + "-" +file.originalname;
    const ext = path.extname(file.originalname);   
const name = path.basename(file.originalname, ext)
        cb(null , name + '-' + Date.now() + ext);
    }
})

function filterName(req , file , cb){
  const extname = ['.jpeg' , '.png' , '.jpg'];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype) && extname.includes(path.extname(file.originalname))) {
    cb(null, true); // فایل معتبر است
  } else {
    cb(new Error('Only JPEG and PNG files are allowed!'));
  }

  
}

const upload = multer({
  storage: storage,
  fileFilter: filterName,
  limits: { fileSize: 6 * 1024 * 1024 } 
});


const uploadMiddleware = upload.fields([
  { name: 'brandImage', maxCount: 1 },
  { name: 'productImage', maxCount: 5 }
]);
// const upload = multer({storage});


module.exports = {upload , uploadDir ,uploadMiddleware};
