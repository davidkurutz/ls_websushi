var Cart = Backbone.Collection.extend({
  url: "/cart",
  addItem: function(model) {
    var existing_m = this.get(model.get('id')),
        m;

    if (existing_m) {
      existing_m.set('quantity', existing_m.get('quantity') + 1);
      this.trigger('model_update');
    } else {
      m = model.clone();
      m.set("quantity", 1);
      this.add(m);
    }
  },
  removeItem: function(model) {
    var existing_m = this.get(model.get('id')),
        current_q = existing_m.get('quantity');

    if (current_q > 1) {
      existing_m.set('quantity', current_q - 1);
      this.trigger('model_update');
    } else {
      this.remove(model);
    }
  },
  quantity: function() {
    return this.sum(this.pluck('quantity'));
  },
  total: function() {
    var item_totals = this.models.map(function(m){
      return m.get('quantity') * m.get('price');
    });

    return this.sum(item_totals);
  },
  sum: function(array) {
    return array.reduce(function(a,b) {
      return a + b;
    }, 0);
  },
  empty: function() {
    this.reset([]);
  },
  destroy: function(id) {
    this.remove(id);
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