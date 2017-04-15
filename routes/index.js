var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Items = require(path.resolve(path.dirname(__dirname), 'local_modules/items_module')),
    Cart = require(path.resolve(path.dirname(__dirname), 'local_modules/cart_module'));

/* GET home page. */

module.exports = function(router) {
  router.get('/index.html', function(req, res, next) {
    res.render('index', { 
      items: Items.get(),
      cart: Cart.get()
    });
  });

  router.post("/", function(req, res, next) {
    Cart.clear();
    res.redirect('/index.html')
  })
}

