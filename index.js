import express from "express";
import { dbConnection } from "./DataBase/dbConnection.js";
import bookRouter from "./src/modules/book/book.routes.js";
import authorRouter from "./src/modules/author/author.routes.js";

const app = express();
const port = 3008;
app.use(express.json());
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.get("/", (req, res) => res.send("Welcome to my Book App"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
