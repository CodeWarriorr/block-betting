const configureRoutes = (app) => {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/users", require("./api/users"));
  app.use("/api/chips", require("./api/chips"));
  app.use("/api/codewarriorrapitest", require("./api/codewarriorrapitest"));
  app.use("/", (req, res) => {
    res.status(200).send("Welcome to  Poker!");
  });
};

module.exports = configureRoutes;
