const Koa = require('koa')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const { filmsRouter, actorRouter } = require('./routes')

app.use(filmsRouter.routes())
app.use(filmsRouter.allowedMethods())

app.use(actorRouter.routes())
app.use(actorRouter.allowedMethods())

app.use(koaLogger())
app.use(bodyParser())
app.listen(9000, () => console.log('Server Set'))