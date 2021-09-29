const { createNewPage, getTextContentForXPath } = require('../lib')

module.exports = async (id) => {

  const url = `https://www.imdb.com/name/${id}/`
  const page = await createNewPage()

  await page.goto(url)

  const name = await getTextContentForXPath(
    '//h1[contains(@class, "header")]/span',
    page
  )
  const born = await getTextContentForXPath(
    '//div[contains(@id, "name-born")]/time',
    page
  ).trim()
  
  const summary = await getTextContentForXPath(
    '//div[contains(@class, "bio-text")]/div',
    page
  )
  const awards = await getTextContentForXPath(
    '//span[contains(@class, "awards")]',
    page
  )

  return { name, born, summary, awards } 
}