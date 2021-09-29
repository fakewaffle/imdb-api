const { createNewPage, getTextContentForMultipleXPath } = require("../lib");

module.exports = async (id) => {
  const url = `https://www.imdb.com/title/${id}/`;
  const page = await createNewPage();

  await page.goto(url);

  const actorNames = await getTextContentForMultipleXPath(
    '//div[contains(@class, "CastItemWrapper")]//a[contains(@data-testid, "actor")]',
    page,
    "name"
  );

  return actorNames;
};
