var Cart = Backbone.Collection.extend({
  url: "/cart",
  addItem: function(model) {
    var existingM = this.get(model.get('id'));
    var m;

    if (existingM) {
      existingM.set('quantity', existingM.get('quantity') + 1);
      this.trigger('model_update');
    } else {
      m = model.clone();
      m.set("quantity", 1);
      this.add(m);
    }
  },
  removeItem: function(model) {
    var existingM = this.get(model.get('id'));
    var currentQ = existingM.get('quantity');

    if (currentQ > 1) {
      existingM.set('quantity', currentQ - 1);
      this.trigger('model_update');
    } else {
      this.remove(model);
    }
  },
  quantity: function() {
    return this.sum(this.pluck('quantity'));
  },
  total: function() {
    var itemTotals = this.models.map(function(m){
      return m.get('quantity') * m.get('price');
    });

    return this.sum(itemTotals);
  },
  sum: function(array) {
    return array.reduce(function(a,b) {
      return a + b;
    }, 0);
  },
  updateCartView: function() {
    this.trigger('cart_updated');
  },
  bindEvents: function() {
    this.on('add remove reset model_update', this.updateCartView);
  },
  initialize: function() {
    this.bindEvents();
  }
});