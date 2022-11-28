import supertest from "supertest";
import app from "../index";
import { cheackImgAvilable } from "../utilities/imageValidate";

describe("check if the image is valid", () => {
  it("should check if fjord.jpg image is available and return true", async () => {
    let result = await cheackImgAvilable("images/fullImages", "fjord.jpg");
    expect(result).toEqual(true);
  });

  it("should check if X.jpg image is available and return false", async () => {
    let result = await cheackImgAvilable("images/fullImages", "X.jpg");
    expect(result).toEqual(false);
  });
});

describe("GET /image/...", function () {
  it("should respond with image ", function (done) {
    supertest(app)
      .get("/image?width=200&height=405&fileName=fjord")
      .expect("Content-Type", "image/jpg")
      .expect(200);
    done();
  });
});
