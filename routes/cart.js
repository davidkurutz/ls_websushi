var express = require('express');
var router = express.Router();
var path = require('path');
var Cart = require(path.resolve(path.dirname(__dirname), 'local_modules/cart_module'));
var _ = require('underscore');

module.exports = function(router) {
  router.post('/cart', function(req, res) {
    var item = JSON.parse(req.body.item);
    Cart.addItem(item);
    res.status(200).end();
  });

  router.delete('/cart/empty', function(req,res) {
    Cart.clear();
    res.status(200).end();
  });

  router.put('/cart', function(req, res) {
    Cart.set(req.body);
    res.status(200).end();
  });
};
