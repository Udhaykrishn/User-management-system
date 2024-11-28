import express from "express";
import { config } from "dotenv";
import nocache from "nocache";
import srcPath from "#utility/path.utility.js";
import path from "path";
import createMorganStreamFile from "#service/morgan/morgan.service.js";
import connectDB from "#config/db.config.js";
import User from "#controller/user.controller.js";
import Admin from "#controller/admin.controller.js";
import Default from "#controller/main.controller.js";
import errorHanlder from "#middleware/error.middleware.js";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(srcPath, "view"));

const init = async () => {
  try {
    const morganStream = await createMorganStreamFile();
    app.use(morganStream);

    await connectDB();

    app.use("/", Default);
    app.use("/user", User);
    app.use("/admin", Admin);

    app.all("*", (req, res, next) => {
      const error = new Error("Route Not found");
      error.status = 404;
      next(error);
    });

    app.use(errorHanlder);

    const PORT = process.env.PORT;

    app.listen(PORT, () => console.log("server is running on ", PORT));
  } catch (error) {
    console.error("Error during application init", error.message);
  }
};

init();
