import express, { Router } from "express";
import path = require("path");
import sharp = require("sharp");
import { cheackImgAvilable } from "./imageValidate";

const routes = Router();

routes.get("/", async (req: express.Request, res: express.Response) => {
  const fileName = req.query.fileName;
  const width: number = req.query.width as unknown as number;
  const height: number = req.query.height as unknown as number;
  const imageName = `${fileName}_${width}_${height}.jpg`;

  // cheack if image is avilable
  if (await cheackImgAvilable("images/thumbnails", imageName)) {
    console.log("cached");
    res.type("image/jpg");

    // resolve the path of the image
    const imagePath = `images/thumbnails/${imageName}`;
    const resolvedPath = path.resolve(imagePath);

    // send the file to the api
    // return resolvedPath;
    res.sendFile(resolvedPath);
  } else {
    console.log("prossesed");
    imgProssesise(req, res);
  }
});

async function imgProssesise(req: express.Request, res: express.Response) {
  // get the query values from the url
  const fileName: string = req.query.fileName as unknown as string;
  const width: number = req.query.width as unknown as number;
  const height: number = req.query.height as unknown as number;
  const imageName = `${fileName}_${width}_${height}.jpg`;

  // conditions to check if the width and height is entered correctly
  if (width <= 0 || typeof +width !== "number") {
    return res.send("width should be a number Try again");
  }

  if (height <= 0 || typeof +height !== "number") {
    return res.send("height should be a number Try again");
  }

  // specify the type of the responce is an image
  res.type("image/jpg");

  // resize the image
  await sharp(`images/fullImages/${fileName}.jpg`)
    .resize(+width, +height)
    .toFile(`images/thumbnails/${imageName}`)
    .then(() => {
      // resolve the full path of the image

      const imagePath = `images/thumbnails/${imageName}`;
      const resolvedPath = path.resolve(imagePath);

      // send the file to the api
      res.sendFile(resolvedPath);
    })
    .catch(() => {
      throw new Error("failed to resize the image");
    });
}

export default routes;
