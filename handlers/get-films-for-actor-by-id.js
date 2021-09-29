const { createNewPage, getTextContentForMultipleXPath } = require("../lib");

module.exports = async (id) => {
  const url = `https://imdb.com/name/${id}`;
  const page = await createNewPage();
  await page.goToUrl(url);

  const actorFilms = getTextContentForMultipleXPath();

  return actorFilms;
};
