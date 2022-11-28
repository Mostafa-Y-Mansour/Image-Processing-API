"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = __importDefault(require("./utilities/routes"));
var imageValidate_1 = require("./utilities/imageValidate");
var app = express();
var port = 3000;
app.use("/image", imageValidate_1.imageValidate, routes_1.default);
app.get("/", function (req, res) {
    res.send("Go To /image on te URL");
});
app.listen(port, function () {
    console.log("server running at http://localhost:".concat(port));
});
exports.default = app;
