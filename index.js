const Koa = require('koa')
const Router = require('@koa/router')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const puppeteer = require('puppeteer')

const app = new Koa()
const router = new Router()

async function getTextContentForXPath(xpath, page) {
  await page.waitForXPath(xpath)
  const elHandle = await page.$x(xpath)

  return await page.evaluate((el) => el.textContent, elHandle[0])
}

// https://www.imdb.com/title/tt1396484
// https://www.imdb.com/title/tt7349950
router.get('/films/:id', async (ctx, next) => {
  const url = `https://www.imdb.com/title/${ctx.params.id}/`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)

  const title = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/h1',
    page
  )
  const year = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/div[2]/ul/li[1]/a',
    page
  )
  const rating = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/div[2]/ul/li[2]/a',
    page
  )
  const length = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/div[2]/ul/li[3]',
    page
  )
  const summary = await getTextContentForXPath(
    '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/div[1]/p',
    page
  )

  ctx.body = { title, year, rating, length, summary }
  await browser.close()
})

app.use(koaLogger())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())
app.listen(3000)
