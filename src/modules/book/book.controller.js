import mongoose from "mongoose";
import { Book } from "../../../models/book.model.js";

// ~=====================================|get all books|===================================================
const getAllBooks = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  await Book.find()
    .skip(skip)
    .limit(limit)
    .populate({
      path: "author",
      select: "name",
    })
    .then((result) => {
      if (result.length > 0) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "couldn't get books" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|get one book by id|===================================================
const getBookById = async (req, res) => {
  await Book.findById(req.params.id)
    .populate({
      path: "author",
      select: "name",
    })
    .then((result) => {
      if (result) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "book not found" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|add book|===================================================
const addBook = async (req, res) => {
  const { title, content, author, publishDate } = req.body;
  await Book.insertMany({
    title,
    content,
    author,
    publishDate,
  })
    .then((result) => {
      result?.length && res.status(201).json({ msg: "success", result });
      result.length ||
        res.status(404).json({ msg: "Book not added, Plz try again" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "Book not added", err });
    });
};
// ~=====================================|update book|===================================================
const updateBook = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (result) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "Book not found" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|delete book|===================================================
const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      book ?? res.status(404).json({ msg: "Book not found" });
      book && res.status(200).json({ msg: "Book deleted", book });
    })
    .catch((err) => {
      res.status(404).json({ err: "couldn't delete book", err });
    });
};
// ~=====================================|search books by title or author |===================================================
const searchBooks = async (req, res) => {
  const { title, author } = req.query;
  // Check if query parameters are provided
  if (!title && !author) {
    return res.status(400).json({ err: "Search parameters are required" });
  }
  const query = {};
  if (title) {
    query.title = title;
  }
  if (author) {
    query.author = author;
  }

  // Execute the search query and populate the author field
  try {
    const books = await Book.find(query);
    if (books.length) {
      return res.status(200).json({ msg: "success", books });
    }
    res.status(404).json({ msg: "books not found", books });
  } catch (error) {
    res.status(500).json({ error: "couldn't get books" });
  }
};
export {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById,
  searchBooks,
};
