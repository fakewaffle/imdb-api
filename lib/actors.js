const puppeteer = require("puppeteer");
const { getTextContentForXPath } = require("./get-selector");

module.exports = { getActorById };

async function getActorById(id) {
  const url = `https://www.imdb.com/name/${id}/`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const actorName = await getTextContentForXPath(
    '//td[contains(@class, "name-overview") and not(contains(@id, "overview"))]/h1/span',
    page
  );

  const actorBirthday = await getTextContentForXPath("//time", page);

  await browser.close();
  return { actorName, actorBirthday };
}
