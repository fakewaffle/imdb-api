const expect = require("expect");
const { getFilmById } = require("../../handlers");

describe("getFilmById", () => {
  it("should get a film", async () => {
    const id = "tt1396484"; //It
    const film = await getFilmById(id);

    expect(film).toMatchSnapshot();
  });
});
