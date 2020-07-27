module.exports = app => {
  const books = require("../controllers/book.controller.js");

  var router = require("express").Router();

  // Create a new book
  router.post("/", books.create);

  // Retrieve all books
  router.get("/", books.findAll);

  // Retrieve a single book with id
  router.get("/:id", books.findOne);

  // Update single book with id
  router.put("/:id", books.update);
  
  // Delete a book with id
  router.delete("/:id", books.delete);

  // Delete all books
  router.delete("/", books.deleteAll);

  app.use('/api/books', router);

};