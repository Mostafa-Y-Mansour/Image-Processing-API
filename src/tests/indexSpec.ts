import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the afrompi endpoint", async (done) => {
    const response = await request.get(
      "/image?width=200&height=450&fileName=fjord"
    );
    expect(response.status).toBe(200);
    done();
  });
});
