const Koa = require("koa");
const Router = require("@koa/router");
const koaLogger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const puppeteer = require("puppeteer");
const { getTextContentForXPath } = require("./lib/get-selector");

const app = new Koa();
const router = new Router();

// async function getTextContentForXPath(xpath, page) {
//   await page.waitForXPath(xpath);
//   const elHandle = await page.$x(xpath);

//   return await page.evaluate((el) => el.textContent, elHandle[0]);
// }

// https://www.imdb.com/title/tt1396484
// https://www.imdb.com/title/tt7349950
router.get("/films/:id", async (ctx, next) => {
  const url = `https://www.imdb.com/title/${ctx.params.id}/`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const title = await getTextContentForXPath(
    '//h1[contains(@class, "TitleHeader")]',
    page
  );
  const year = await getTextContentForXPath(
    '//a[contains(@class, "TitleBlockMetaData") and contains(@href, "releaseinfo")]',
    page
  );
  const rating = await getTextContentForXPath(
    '//a[contains(@class, "TitleBlockMetaData") and contains(@href, "parentalguide")]',
    page
  );
  const length = await getTextContentForXPath(
    '//li[contains(text(), "min") or contains(text(), "h")]',
    page
  );
  const summary = await getTextContentForXPath(
    '//p[contains(@class, "GenresAndPlot")]',
    page
  );

  ctx.body = { title, year, rating, length, summary };
  await browser.close();
});

app.use(koaLogger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.listen(3000);
