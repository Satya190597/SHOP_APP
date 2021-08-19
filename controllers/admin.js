const Product = require("../models/product");

module.exports.getAddProduct = (request, response) => {
  const querySuccess = request.query.success;
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
    successMessage: querySuccess ? querySuccess : null,
  });
};

module.exports.postAddProduct = (request, response) => {
  const title = request.body.title.trim();
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description.trim();

  /*
    ----------------------------------------------------------------------------------------
    Note: You can create a new product by using the traditional product create function too.
    By passing the userId in the create payload object from the request.
    ----------------------------------------------------------------------------------------
    FUNCTION
    ----------------------------------------------------------------------------------------
      Product.create({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: request.user.id, <= From request.
      })
    ----------------------------------------------------------------------------------------
  */
 
  request.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: request.user.id,
    })
    .then((result) => {
      response.redirect("/admin/add-product?success=true");
    })
    .catch((error) => {
      response.redirect("/admin/add-product?success=false");
    });
};

module.exports.getEditProduct = (request, response) => {
  const editMode = request.query.edit;
  const querySuccess = request.query.success;
  if (String(true) !== editMode) {
    return response.redirect("/");
  }
  const id = request.params.productId;

  request.user.getProducts({where: {id:id}})
    .then((products) => {
      response.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editMode: editMode,
        product: products[0],
        successMessage: querySuccess ? querySuccess : null,
      });
    })
    .catch((error) => {
      return response.redirect("/");
    });
};

module.exports.postEditProduct = (request, response) => {
  const id = request.body.id;
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  Product.findByPk(id)
    .then((product) => {
      (product.title = title),
        (product.price = price),
        (product.imageUrl = imageUrl),
        (product.description = description);
      return product.save();
    })
    .then((updatedProduct) => {
      response.redirect(
        "/admin/edit-product/" + updatedProduct.id + "?edit=true&success=true"
      );
    })
    .catch((error) => {
      response.redirect(
        "/admin/edit-product/" + id + "?edit=true&success=false"
      );
    });
};

module.exports.postDeleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      response.redirect("/");
    })
    .catch((error) => {
      response.redirect("/");
    });
};

/**
 * @description  Load index page. route  => Get => /admin/product-list
 */
module.exports.getProducts = (request, response) => {
  request.user.getProducts()
    .then((products) => {
      response.render("admin/product-list", {
        pageTitle: "Admin Product List",
        path: "/admin/product-list",
        prods: products,
      });
    })
    .catch((error) => {
      console.log(error);
      response.render("admin/product-list", {
        pageTitle: "Admin Product List",
        path: "/admin/product-list",
        prods: null,
      });
    });
};
