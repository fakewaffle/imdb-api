const axios = require("axios");
const expect = require("expect");

const URL = "http://localhost:3000";

describe("actors/:monkey", () => {
  let response;

  beforeAll(async () => {
    response = await axios.get(`${URL}/actors/nm6016511`);
  });

  test("should return 200", () => {
    expect(response.status).toBe(200);
  });

  test("should return `application/json`", () => {
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("should return the correct fields", () => {
    expect(response.data).toHaveProperty("actorName", "Finn Wolfhard");
    expect(response.data).toHaveProperty("actorBirthday", "Mon Dec 23 2002");
  });
});
