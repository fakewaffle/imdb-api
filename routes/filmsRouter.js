const Router = require("@koa/router");
const filmsRouter = new Router();
const { getFilmById, getActorsForFilmById } = require("../handlers");

// https://www.imdb.com/title/tt1396484 It
filmsRouter.get("/films/:id", async (ctx, next) => {
  let result = {};
  result.filmInfo = await getFilmById(ctx.params.id);
  result.filmActors = await getActorsForFilmById(ctx.params.id);
  ctx.body = result;
});

module.exports = filmsRouter;
