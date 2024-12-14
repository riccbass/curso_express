import express from "express";
import cors from "cors";

import UserRoutes from "./routes/UserRoutes.mjs";

const app = express();

//config json respinse
app.use(express.json());

//Solve cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//Public folder for images
app.use(express.static("public"));

//routes
app.use("/users", UserRoutes);

//front no 3000, back no 5000
app.listen(5000);
