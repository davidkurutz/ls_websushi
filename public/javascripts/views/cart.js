var CartView = Backbone.View.extend({
  el: $("#cart"),
  template: App.templates.cart,
  events: {
    "click .empty_cart": "emptyCart",
    "click .checkout": "checkout"
  },
  checkout: function(e) {
    e.preventDefault();
    App.checkoutView();
  },
  emptyCart: function(e) {
    e.preventDefault();
    var self = this;

    $.ajax({
      url: "/cart/empty",
      type: "delete",
      success: function() {
        self.$el.slideUp(App.speed, function() {
          App.trigger("empty");
        });
      }
    });
  },
  render: function() {
    this.$el.html(this.template( {
      total: this.collection.total(),
      items: this.collection.toJSON()
    }));

    if (this.collection.quantity() === 0 || location.pathname === '/checkout') {
      this.$el.hide();
    } else {
      this.$el.slideDown(App.speed);
    }
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});