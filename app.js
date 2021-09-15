const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const mongodbClient = require("./util/database").mongodbClient;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");

const User = require("./models/user");

// Mysql Database import.
// const sequelize = require("./util/sequelize-database");

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

// ---- ADMIN ROUTES START ----

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./sequelize-controllers/error");

// ---- ADMIN ROUTES END ----

// const { dirname } = require("path");

// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// const Sequelize = require("sequelize");

// Set global settings.
app.set("view engine", "ejs");
// Note : Default configuration for views is - views in root directory.
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(dirname(require.main.filename), "public")));

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Adding a user middleware.
app.use((request, response, next) => {
  User.findById("61399f6be46aac2d39dbff09")
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use(shopRoutes);
app.use(errorController.pageNotFound);

// Define Relationship.
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
//   foreignKey: { allowNull: false },
// });
// User.hasMany(Product);
// Cart.belongsTo(User);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// Sync Javascript data models to database table.
// sequelize
//   .sync() // Update New Changes. => Force Recreate => Use {force:true}.
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     // Create A Dummy User.
//     if (!user) {
//       return User.create({ name: "Max", email: "test@gmail.com" });
//     }
//     return Promise.resolve(user);
//   })
//   .then((user) => {
//     //return user.createCart();
//     return Promise.resolve(null);
//   })
//   .then(() => {
//     app.listen(3002);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((result) => {
    console.log("Database Connected ....");
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "Satya",
            email: "nandy@yahoo.in",
            cart: { items: [] },
          });
          user.save();
        }
        app.listen(3002);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
