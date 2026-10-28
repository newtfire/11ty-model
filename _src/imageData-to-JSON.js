/* ebb: This is the JS file that reads a directory of image files (with no subdirectories)
and outputs a JSON  file representing info about each image. Because I've now added subdirectories to my img folder,
  this will now simply output a file inside _data with an empty array: [ ]. Work with this file if you have a simple
   directories of image files with no topical subdirectories. For handling topical subdirectories,
   try imageTopicData-to-JSON.js saved here in the same _src folder.*/
const fs = require("fs");
const path = require("path");
const imagesFolder = "./img";
const imagesSubDirs = imagesFolder.map((subdir) => {
  const subdirPath = path.join(imagesFolder, subdir);
  console.log("What is my path?" + subdirPath);
});

function imageToJson(imagesFolder) {
  const imageFiles = fs.readdirSync(imagesFolder);

  const imageData = imageFiles
    .map((file) => {
      const filePath = path.join(imagesFolder, file);
      const extname = path.extname(filePath);

      if (extname === ".jpg" || extname === ".jpeg" || extname === ".png") {
        return {
          filename: file,
          filepath: filePath,
        };
      }
    })
    .filter(Boolean); // Remove nullish values

  const jsonData = JSON.stringify(imageData, null, 2);
  console.log(jsonData);

  // To write to a file:
  fs.writeFileSync("_data/image_metadata.json", jsonData);
}

imageToJson(imagesFolder);
