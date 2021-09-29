module.exports = async function (xpath, page) {
  try {
    await page.waitForXPath(xpath);
    const elHandle = await page.$x(xpath);

    return await page.evaluate((el) => el.innerText, elHandle[0]);
  } catch (error) {
    console.log({ errMsg: error });
  }
};
