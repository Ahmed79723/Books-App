import { Author } from "../../../models/author.model.js";

// ~=====================================|get Authors|===================================================
const getAuthors = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  await Author.find()
    .skip(skip)
    .limit(limit)
    .populate({
      path: "books",
      select: "title",
    })
    .then((result) => {
      if (result.length > 0) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "couldn't get authors" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|get one author by id|===================================================
const getAuthorById = async (req, res) => {
  await Author.findById(req.params.id)
    .populate({
      path: "books",
      select: "title",
    })
    .then((result) => {
      if (result) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "author not found" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|signup|===================================================
const signup = async (req, res) => {
  const { name, bio, birthDate, books } = req.body;
  await Author.insertMany({
    name,
    bio,
    birthDate,
    books,
  })
    .then((result) => {
      if (result.length) {
        res.status(201).json({ msg: "success", result });
      } else {
        res.status(404).json({ msg: "Author Not Added" });
      }
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|update Author|===================================================
const updateAuthor = async (req, res) => {
  await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (result) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "author not found" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|delete Author|===================================================
const deleteAuthor = async (req, res) => {
  await Author.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        return res.json({ msg: "success", result });
      }
      res.status(404).json({ err: "author not found" });
    })
    .catch((err) => {
      res.status(404).json({ err: "An Error occurred, plz try again", err });
    });
};
// ~=====================================|search authors by name or bio |===================================================
const searchAuthors = async (req, res) => {
  const { name, bio } = req.query;
  // const qParams = [name, bio];
  // Check if query parameters are provided
  if (!name && !bio) {
    return res.status(400).json({ err: "Search parameters are required" });
  }
  const query = {};
  if (name) {
    query.name = name;
  }
  if (bio) {
    query.bio = bio;
  }
  try {
    const authors = await Author.find(query);
    if (authors.length) {
      return res.status(200).json({ msg: "success from search", authors });
    }
    res.status(404).json({ msg: "authors not found", authors });
  } catch (error) {
    res.status(500).json({ error: "couldn't get authors" });
  }
};

export {
  getAuthors,
  signup,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
  searchAuthors,
};
