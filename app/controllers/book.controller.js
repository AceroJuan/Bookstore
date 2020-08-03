const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: books } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, books, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {

  //validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return
  }

  // Create Book
  const book = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published
  };

  // Save book in the DB
  Book.create(book)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error ocurred while creating the book."
    });
  });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
  const {page, size, title} = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({ where:condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving the book."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error retrieving Book with id=" + id
    });
  });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Book was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Book with id=" + id
    });
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Book was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Could not delete Book with id=" + id
    });
  });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({
      message: `${nums} Books were deleted succesfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while removing all books."
    });
  });
};

// Find all published Books
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({ where: {published: true }, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving books."
    });
  });
};