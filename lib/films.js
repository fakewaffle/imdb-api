const puppeteer = require("puppeteer");
const { getTextContentForXPath } = require("./get-selector");

module.exports = { getFilmById };

async function getFilmById(id) {
  const url = `https://www.imdb.com/title/${id}/`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const title = await getTextContentForXPath(
    '//h1[contains(@class, "TitleHeader")]',
    page
  );
  const year = await getTextContentForXPath(
    '//a[contains(@class, "TitleBlockMetaData") and contains(@href, "releaseinfo")]',
    page
  );
  const rating = await getTextContentForXPath(
    '//a[contains(@class, "TitleBlockMetaData") and contains(@href, "parentalguide")]',
    page
  );
  const length = await getTextContentForXPath(
    '//li[contains(text(), "min") or contains(text(), "h")]',
    page
  );
  const summary = await getTextContentForXPath(
    '//p[contains(@class, "GenresAndPlot")]',
    page
  );

  await browser.close();
  return { title, year, rating, length, summary };
}
