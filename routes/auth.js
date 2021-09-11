const express = require("express");

const router = express.Router();

router.get("/login", (request, response, next) => {
  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
  });
});

module.exports = router;
