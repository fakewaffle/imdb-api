const { createNewPage, getTextContentForXPath } = require("../lib");

module.exports = async (id) => {
  const url = `https://www.imdb.com/title/${id}/`;

  const page = await createNewPage();

  await page.goto(url);

  const title = await getTextContentForXPath(
    "//h1[contains(@class, title)]",
    page
  );
  const year = Number(
    await getTextContentForXPath(
      '//ul/li/a[contains(@href, "releaseinfo") and contains(@class, "TitleBlockMetaData")]',
      page
    )
  );
  const rating = await getTextContentForXPath(
    '//ul/li/a[contains(@href, "parental") and contains(@class, "TitleBlockMetaData")]',
    page
  );
  const length = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/div[2]/ul/li[3]',
    page
  );
  const summary = await getTextContentForXPath(
    '//span[contains(@data-testid, "plot")][1]',
    page
  );

  return { title, year, rating, length };
};
