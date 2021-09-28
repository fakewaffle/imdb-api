module.exports = {
  getTextContentForXPath,
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
