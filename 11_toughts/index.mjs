import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import FileStore from "session-file-store";
import flash from "express-flash";
import conn from "./db/conn.mjs";
import path from "path";
import os from "os";

import Tought from "./models/Tought.mjs";
import User from "./models/User.mjs";

import toughtsRoutes from "./routes/toughtsRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";

import ToughtController from "./controllers/ToughtController.mjs";

const FileStoreSession = FileStore(session);

const app = express();

//template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//pra poder receber do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

//pra usar json
app.use(express.json());

//public path
app.use(express.static("public"));

//session
app.use(
  session({
    name: "session",
    store: new FileStoreSession({
      logFn: () => {},
      path: path.join(os.tmpdir(), "sessions"),
    }),
    secret: "bassainha",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 720000,
      expires: new Date(Date.now() + 720000),
      httpOnly: true,
    },
  })
);

// flash messages
app.use(flash());

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

//Routes

app.use("/toughts", toughtsRoutes);

app.use("/", authRoutes); //usa aqui pra não ser /auth/login...
app.use("/", ToughtController.showToughts);

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
