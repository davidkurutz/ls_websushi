var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  attributes: {
    "id": "checkout"
  },
  events: {
    'click .fa': "changeQuantity",
    'click footer a': "cancelOrder"
  },
  cancelOrder: function(e) {
    this.collection.reset([]);
  },
  changeQuantity: function(e) {
    e.preventDefault();
    var id = +$(e.target).closest("tr").attr("data-id"),
        model = App.cart.get(id),
        cart = this.collection;

    $(e.target).hasClass('fa-plus') ? cart.addItem(model) : cart.removeItem(model);
    this.render();
    this.delegateEvents();
    cart.sync('update', cart);
  },
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.collection.total()
    }));
    App.$el.html(this.$el);
    $("#cart").css("display", "none");
  },
  initialize: function() {
    this.render();
  }
});