"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var imgProcessing_1 = __importDefault(require("./utilities/imgProcessing"));
var imageValidate_1 = require("./utilities/imageValidate");
var app = express();
var port = 3000;
// app.use("/image", imageValidate);
app.use("/image", imageValidate_1.imageValidate, imgProcessing_1.default);
// app.get(imgProcesse);
// app.get("/image", /))
app.listen(port, function () {
    console.log("server running at http://localhost:".concat(port));
});
exports.default = app;
