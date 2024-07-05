import { Router } from "express";
import * as authorController from "./author.controller.js";

const authorRouter = Router();

authorRouter.get("/", authorController.getAuthors);
authorRouter.post("/signup", authorController.signup);
authorRouter.get("/search", authorController.searchAuthors);
authorRouter.get("/:id", authorController.getAuthorById);
authorRouter.patch("/:id", authorController.updateAuthor);
authorRouter.delete("/:id", authorController.deleteAuthor);

export default authorRouter;
