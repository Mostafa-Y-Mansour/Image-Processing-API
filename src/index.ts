import express = require("express");
import routes from "./utilities/routes";
import { imageValidate } from "./utilities/imageValidate";

const app: express.Application = express();
const port = 3000;

app.use("/image", imageValidate, routes);

app.get("/", (req, res) => {
  res.send("Go To /image on te URL");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
