var express = require('express');
var router = express.Router();
var path = require('path');
var Items = require(path.resolve(path.dirname(__dirname), 'local_modules/items_module'));
var Cart = require(path.resolve(path.dirname(__dirname), 'local_modules/cart_module'));

/* GET home page. */

module.exports = function(router) {
  router.get(['/index.html', "/menu", ""], function(req, res, next) {
    res.render('index', { 
      items: Items.get(),
      cart: Cart.get()
    });
  });

  router.post("/", function(req, res, next) {
    Cart.clear();
    res.redirect('/index.html');
  });
};

