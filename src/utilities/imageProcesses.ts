import path = require("path");
import sharp = require("sharp");

const imageProcesses = async (
  fileName: string,
  width: number,
  height: number
): Promise<{
  data: string;
  error: {
    msg: string;
  };
}> => {
  try {
    // resize the image
    await sharp(`images/fullImages/${fileName}.jpg`)
      .resize(+width, +height)
      .toFile(`images/thumbnails/${fileName}_${width}_${height}.jpg`);

    // resolve the path of the image
    const resolvedPath = path.resolve(
      `images/thumbnails/${fileName}_${width}_${height}.jpg`
    );

    return {
      data: resolvedPath as string,
      error: {} as { msg: string },
    };
  } catch (err) {
    return {
      data: "" as string,
      error: err as { msg: string },
    };
  }
};

export default imageProcesses;
