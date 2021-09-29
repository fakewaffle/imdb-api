let browser;
const puppeteer = require("puppeteer");

module.exports = async () => {
  if (!browser) {
    browser = await puppeteer.launch();
  }
  return await browser.newPage();
};
