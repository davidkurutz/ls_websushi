var path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    file_path = path.resolve(path.dirname(__dirname), 'data/cart.json');

module.exports = {
  get: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).data
  },
  write: function(data) {
    fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
  },
  set: function(data) {
    this.write({ data: data })
  },
  addItem: function(item) {
    var id = item.id,
        cart_items = this.get(),
        existing_m = _.findWhere(cart_items, {id: id}),
        m;

    if (existing_m) {
      existing_m['quantity'] += 1;
    } else {
      m = _.clone(item);
      m['quantity'] = 1;

      cart_items.push(m);
    }

    this.set(cart_items);
  },
  removeItem: function(item) {
    var id = item.id,
        cart_items = this.get(),
        existing_m = _.findWhere(cart_items, {id: id});

    if (existing_m['quantity'] > 1) {
      existing_m['quantity'] -= 1;
    } else {
      cart_items = _.without(cart_items, existing_m)
    }

    this.set(cart_items)
  },
  clear: function() {
    this.set([])
  }
}