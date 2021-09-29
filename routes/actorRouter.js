const Router = require("@koa/router");
const actorRouter = new Router();
const { getActorById } = require("../handlers");

// nm0803889 Bill Skarsgard
actorRouter.get("/actor/:id", async (ctx, next) => {
  const result = await getActorById(ctx.params.id);
  ctx.body = result;
});

module.exports = actorRouter;
