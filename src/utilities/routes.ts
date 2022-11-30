import express, { Router, Request, Response } from "express";
import path = require("path");
import { cheackImgAvilable } from "./imageValidate";
import imageProcesses from "./imageProcesses";

const routes = Router();

routes.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<any> => {
    const fileName: string = req.query.fileName as unknown as string;
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
      res.sendFile(resolvedPath);
    } else {
      console.log("prossesed");

      // conditions to check if the width and height is entered correctly
      if (+width === 0 || isNaN(+width)) {
        return res
          .status(400)
          .json({ msg: "width should be a number Try again" });
      }

      if (+height === 0 || isNaN(+height)) {
        return res
          .status(400)
          .json({ msg: "height should be a number Try again" });
      }

      const { data, error } = await imageProcesses(fileName, width, height);
      if (error.msg) {
        return res.status(400).json({ msg: error.msg });
      }
      res.sendFile(data);
    }
  }
);

export default routes;
