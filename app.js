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

// Set global settings.
app.set("view engine", "ejs");
// Note : Default configuration for views is - views in root directory.
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(dirname(require.main.filename), "public")));

app.use(express.static("public"));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

// Sync Javascript data models to database table.
sequelize.sync().then(result => {
    app.listen(3002);
}).catch(error => {
    console.log(error)
})


