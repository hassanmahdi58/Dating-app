// Dependencies
require("dotenv").config();
const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const connection = require("./config/connection");
const mainRoutes = require("./routes");
const { logInfo } = require("./utils/log");
const PORT = process.env.PORT || 3001;

// Session Credentials
const sessionOptions = {
  secret: "bananas",
  cookie: {
    maxAge: 86400 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: connection,
  }),
};

// App
const hbs = expressHandleBars.create({});
const app = express();

// Wiring elements to the server
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(mainRoutes);

// Creating a connection
const init = async () => {
  try {
    await connection.sync({ force: false });
    console.log("Database connection successful");

    app.listen(PORT, () =>
      logInfo("Server connection", `🚀 http://localhost:${PORT}`)
    );

    // If connection unsuccessful, throw an error
  } catch (error) {
    console.log(`[ERROR]: Database connection unsuccessful | ${error.message}`);
  }
};

init();
