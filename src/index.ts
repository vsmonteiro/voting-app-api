import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes";
import errorHandler from "./errorHandler";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

app.listen(3001);