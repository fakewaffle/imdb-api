const { map } = require("async");

module.exports = async (xpath, page, monkey) => {
  try {
    await page.waitForXPath(xpath);
    const elHandles = await page.$x(xpath);

    const cat = await mapThroughElements(elHandles, monkey, page);
    return cat;
  } catch (error) {
    console.log({ errMsg: error });
  }
};

function mapThroughElements(elHandles, monkey, page) {
  return map(elHandles, async (handle) => {
    const name = await page.evaluate((el) => el.innerText, handle);
    const href = await page.evaluate((el) => el.href, handle);
    const id = href
      .replace(`https://www.imdb.com/${monkey}/`, "")
      .split("?")[0];
    return { name, href, id };
  });
}
