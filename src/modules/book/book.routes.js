import { Router } from "express";
import * as bookController from "./book.controller.js";

const bookRouter = Router();

bookRouter
  .route("/")
  .post(bookController.addBook)
  .get(bookController.getAllBooks);
bookRouter.get("/search", bookController.searchBooks);
bookRouter
  .route("/:id")
  .get(bookController.getBookById)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default bookRouter;
