module.exports = app => {
  const users = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/users", users.create);

  // Retrieve all Users
  router.get("/users", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Retrieve a single User with id
  router.delete("/delete/:id", users.deleteUser);

  app.use('/api', router);
};
