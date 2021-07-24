const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const admin = require('./admin');


router.get('/', (req, res, next) => {
  console.log(admin.products)
  res.render('shop',{prods:admin.products,docTitle:'shop'})
});

module.exports = router;
