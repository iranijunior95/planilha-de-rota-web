import express from "express";
import path from "path";
import connectDatabase from "./config/database.js";
import { SERVER_PORT } from "./config/environmentVariables.js";
import { rootDir } from "./utils/paths.js";
import { layoutMiddleware } from "./middlewares/layoutMiddleware.js";
import router from "./routes/indexRoutes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use(layoutMiddleware);
app.use(router);

connectDatabase();

app.listen(SERVER_PORT, () => console.log(`Servidor rodando na posta ${SERVER_PORT}`));