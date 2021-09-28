const Koa = require("koa");
const Router = require("@koa/router");
const koaLogger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const puppeteer = require("puppeteer");
const { getTextContentForXPath } = require("./lib/get-selector");
const { getActorById } = require("./lib/actors");

const app = new Koa();
const router = new Router();

// https://www.imdb.com/title/tt1396484
// https://www.imdb.com/title/tt7349950
// https://www.imdb.com/name/nm0803889/?ref_=tt_cl_t_1
router.get("/actors/:monkey", async (ctx) => {
  const actor = await getActorById(ctx.params.monkey);

  ctx.body = { actor };
});

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
