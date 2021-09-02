module.exports.pageNotFound = (request, response) => {
  response.render("404", { pageTitle: "Page Not Found", path:"/" });
};
