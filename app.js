const path = require("path");
var cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

// Mysql Database import.
const sequelize = require("./util/database");

// db.execute("SELECT * FROM PRODUCTS")
//   .then((result) => {
//     console.log("RESULT ..");
//     console.log(result[0]);
//   })
//   .catch((error) => {
//     console.log("ERROR ...");
//     console.log(error);
//   });

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const { dirname } = require("path");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

// Set global settings.
app.set("view engine", "ejs");
// Note : Default configuration for views is - views in root directory.
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(dirname(require.main.filename), "public")));

app.use(express.static("public"));

// Adding a user middleware.
app.use((request, response, next) => {
  User.findByPk(1)
    .then((user) => {
      request.user = user;
      console.log(user.id)
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);



// Define Relationship.
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE",foreignKey: {allowNull:false} });
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

// Sync Javascript data models to database table.
sequelize
  .sync() // Update New Changes. => Force Recreate => Use {force:true}.
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    // Create A Dummy User.
    if (!user) {
      return User.create({ name: "Max", email: "test@gmail.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    //return user.createCart();
    return Promise.resolve(null);
  })
  .then(() => {
    app.listen(3002);
  })
  .catch((error) => {
    console.log(error)
  });
