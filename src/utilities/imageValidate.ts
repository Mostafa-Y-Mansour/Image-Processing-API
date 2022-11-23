import express, { Router } from "express";
import { promises as fsPromises } from "fs";
import path = require("path");

async function cheackImgAvilable(
  dirPath: string,
  imageName: string
): Promise<boolean> {
  // resolve the path of the directory
  const resolvedPath = path.resolve(dirPath);
  const avilableImages = await fsPromises.readdir(resolvedPath);

  // check if image is in the dirctory
  let isAvilable = false;
  avilableImages.forEach((img) => {
    if (imageName === img) {
      isAvilable = true;
    }
  });

  return isAvilable;
}
// if the image is there contenue to the next prossese
const imageValidate = async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  const fileName = req.query.fileName;
  // handle the error without app crashing
  if (await cheackImgAvilable("images/fullImages", `${fileName}.jpg`)) {
    next();
  } else {
    return res.send("image is not avilable");
  }
};

export { imageValidate, cheackImgAvilable };
