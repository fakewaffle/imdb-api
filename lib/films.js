const {
  getTextContentForXPath,
  getTextContentForMultipleXpath,
} = require("./get-selector");
const { createBrowser } = require("./handle-browser");

module.exports = { getFilmById };

async function getFilmById(id) {
  const page = await createBrowser();
  const url = `https://www.imdb.com/title/${id}/`;

  await page.goto(url);

  const title = await getTextContentForXPath(
    '//h1[contains(@class, "TitleHeader")]',
    page
  );
  const year = Number(
    await getTextContentForXPath(
      '//a[contains(@class, "TitleBlockMetaData") and contains(@href, "releaseinfo")]',
      page
    )
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
  const actors = await getTextContentForMultipleXpath(
    '//div[contains(@class, "CastItemWrapper")]//a[contains(@data-testid, "actor")]',
    page
  );

  return { title, year, rating, length, summary, actors };
}
