import express, { Router } from "express";
import path = require("path");
import { cheackImgAvilable } from "./imageValidate";
import imageProcesses from "./imageProcesses";

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
    imageProcesses(req, res);
  }
});

export default routes;
