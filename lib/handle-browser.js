const puppeteer = require("puppeteer");

module.exports = { createBrowser, closeBrowser };

async function createBrowser() {
  let browser;
  if (!browser) {
    browser = await puppeteer.launch();
  }

  return await browser.newPage();
}

async function closeBrowser(browser) {
  return await browser.closeBrowser();
}
