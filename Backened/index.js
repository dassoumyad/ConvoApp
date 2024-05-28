const express = require('express');
const multer  = require('multer')
const cors=require("cors")
const docxtoPDF = require('docx-pdf');
const path= require("path")

const app = express();
const port=3000

app.use(cors())
// setting file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
  app.post('/convertFile', upload.single('file'), (req, res, next)=> {  //file name used in postman key
   try {
    if(!req.file){
        return res.status(400).json({
            message:"No file is uploaded"
        })
    }
    // defining file output path
    let outputPath=path.join(__dirname,"files",`${req.file.originalname}.pdf`)
    docxtoPDF(req.file.path,outputPath,(err,result)=>{
        if(err){
          console.log(err);
          return res.status(500).json({
            message:"Error coverting docx to pdf"
          })
        }
        // download the file
        res.download(outputPath,()=>{
           console.log("file download")
        })
        // console.log('result'+result);
      });
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Internal server Error"
      })
   }
  })
  

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
