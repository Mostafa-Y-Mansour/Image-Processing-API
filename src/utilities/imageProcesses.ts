import express from "express";
import path = require("path");
import sharp = require("sharp");

async function imageProcesses(req: express.Request, res: express.Response) {
  // get the query values from the url
  console.log(req);
  console.log(res);
  const fileName: string = req.query.fileName as unknown as string;
  const width: string = req.query.width as unknown as string;
  const height: string = req.query.height as string;
  const imageName = `${fileName}_${width}_${height}.jpg`;

  console.log(width, typeof width, isNaN(parseInt(width)));

  // conditions to check if the width and height is entered correctly
  if (
    +width === 0 ||
    typeof parseInt(width) !== "number" ||
    isNaN(parseInt(width))
  ) {
    return res.send("width should be a number Try again");
  }

  if (
    +height === 0 ||
    typeof parseInt(height) !== "number" ||
    isNaN(parseInt(height))
  ) {
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

export default imageProcesses;
