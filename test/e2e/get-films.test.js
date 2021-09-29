const axios = require("axios");
const expect = require("expect");

const URL = "http://localhost:9000";

describe("films/:id", () => {
  let response;

  beforeAll(async () => {
    response = await axios.get(`${URL}/films/tt1396484`);
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
    expect(response.data).toHaveProperty("title", "It");
    expect(response.data).toHaveProperty("year", 2017);
    expect(response.data).toHaveProperty("rating", "R");
    expect(response.data).toHaveProperty("length", "2h 15min");
    expect(response.data).toHaveProperty("summary");
  });
});
