const axios = require("axios");
const expect = require("expect");

const URL = "http://localhost:9000";

describe("actor/:id", () => {
  let response;

  beforeAll(async () => {
    response = await axios.get(`${URL}/actor/nm0803889`);
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
    expect(response.data).toHaveProperty("name", "Bill Skarsgård");
    expect(response.data).toHaveProperty("born", "August 9, 1990");
    expect(response.data).toHaveProperty("awards", "6 wins & 11 nominations.");
    expect(response.data).toHaveProperty(
      "summary",
      "Bill Skarsgård was born on August 9, 1990 in Vällingby, Sweden as Bill Istvan Günther Skarsgård. He is an actor and producer, known for It (2017), It Chapter Two (2019) and Deadpool 2 (2018). See full bio »"
    );
  });
});
