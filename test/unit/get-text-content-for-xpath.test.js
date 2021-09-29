const expect = require("expect");
const { getTextContentForXPath, createNewPage } = require("../../lib");

describe("getTextContentForXpath", () => {
  test("should get title", async () => {
    const url = `https://www.imdb.com/title/tt1396484/`; // It
    const xpath = "//h1[contains(@class, title)]";

    const page = await createNewPage();

    await page.goto(url);

    const response = await getTextContentForXPath(xpath, page);

    expect(response).toEqual("It");
  });
});
