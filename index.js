const Koa = require("koa");
const Router = require("@koa/router");
const koaLogger = require("koa-logger");
const bodyParser = require("koa-bodyparser");

const { getActorById } = require("./lib/actors");
const { getFilmById } = require("./lib/films");

const app = new Koa();
const router = new Router();

// https://www.imdb.com/title/tt1396484
// https://www.imdb.com/title/tt7349950
// https://www.imdb.com/name/nm0803889
router.get("/actors/:monkey", async (ctx) => {
  const { actorName, actorBirthday } = await getActorById(ctx.params.monkey);

  ctx.body = {
    actorName,
    actorBirthday: new Date(actorBirthday).toDateString(),
  };
});

router.get("/films/:id", async (ctx) => {
  const { title, year, rating, length, summary } = await getFilmById(
    ctx.params.id
  );
  ctx.body = { title, year, rating, length, summary };
});

app.use(koaLogger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.listen(3000);
