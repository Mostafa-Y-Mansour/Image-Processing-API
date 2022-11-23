import express = require("express");
import imgProcesse from "./utilities/imgProcessing";
import { imageValidate } from "./utilities/imageValidate";

const app: express.Application = express();
const port = 3000;

app.use("/image", imageValidate, imgProcesse);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
