const { getTextContentForXPath } = require("./get-selector");
const { createBrowser } = require("./handle-browser");

module.exports = { getActorById };

async function getActorById(id) {
  const page = await createBrowser();
  const url = `https://www.imdb.com/name/${id}/`;

  await page.goto(url);

  const actorName = await getTextContentForXPath(
    '//td[contains(@class, "name-overview") and not(contains(@id, "overview"))]/h1/span',
    page
  );

  const actorBirthday = await getTextContentForXPath("//time", page);

  return { actorName, actorBirthday };
}
