var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  attributes: {
    "id": "checkout"
  },
  events: {
    'click .fa': "changeQuantity",
    'click footer a': "cancelOrder"
  },
  cancelOrder: function() {
    this.collection.reset([]);
  },
  changeQuantity: function(e) {
    e.preventDefault();

    var id = +$(e.target).closest("tr").attr("data-id");
    var cart = this.collection;
    var model = cart.get(id);

    if ($(e.target).hasClass('fa-plus')) {
      cart.addItem(model);
    } else {
      cart.removeItem(model);
    }

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