module.exports = {
  getTextContentForXPath,
  getTextContentForMultipleXpath,
};

async function getTextContentForXPath(xpath, page) {
  try {
    await page.waitForXPath(xpath);
    const elHandle = await page.$x(xpath);

    return await page.evaluate((el) => el.textContent, elHandle[0]);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getTextContentForMultipleXpath(xpath, page) {
  try {
    const elements = [];
    await page.waitForXPath(xpath);
    const elHandle = await page.$x(xpath);

    for (let i = 0; i < elHandle.length; i++) {
      const element = await page.evaluate((el) => el.textContent, elHandle[i]);
      elements.push(element);
    }

    return elements;
  } catch (error) {
    console.log("MULTIPLE ERROR", error);
  }
}
