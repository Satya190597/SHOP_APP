module.exports.getLogin = (request, response, next) => {
  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
  });
};

module.exports.postLogin = (request, response, next) => {
  request.session.isLoggedIn = true;
  response.redirect("/");
};
