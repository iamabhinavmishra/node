const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  // cloud_name: processs.env.CLOUD_NAME
  cloud_name: "dq698jv3i",
  api_key: "168611856383486",
  api_secret: "ckQ6YoS8uE1ddfAN7XWbLs6zJC0"
});



app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
    })
  );
app.get("/myget", (req, res) => {
    console.log(req.body);
  
    res.send(req.body);
  });

  app.post("/mypost", async (req, res) => {
    console.log(req.body);
    console.log(req.files);
  
    let result;
    let imageArray = [];
  
    // case - multiple images
  
    if (req.files) {
      for (let index = 0; index < req.files.samplefile.length; index++) {
        let result = await cloudinary.uploader.upload(
          req.files.samplefile[index].tempFilePath,
          {
            folder: "users"
          }
        );
  
        imageArray.push({
          public_id: result.public_id,
          secure_url: result.secure_url
        });
      }
    }
  
    // ### use case for single image
    // let file = req.files.samplefile;
    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //   folder: "users",
    // });
  
    console.log(result);
  
    let details = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      result,
      imageArray
    };
    console.log(details);
  
    res.send(details);
  });





  app.get("/mygetform", (req, res) => {
    res.render("getform");
  });

  app.get("/mypostform", (req, res) => {
    res.render("postform");
  });

app.listen(4000, () => console.log(`Server is running at port 4000`));