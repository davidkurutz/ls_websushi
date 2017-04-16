var App = {
  $el: $("#content"),
  templates: JST,
  renderItems: function() {
    this.items.each(this.renderItemView);
  },
  speed: 250,
  renderItemView: function(item) {
    new ItemView({ model: item });
  },
  createCart: function() {
    if (this.cartView) {
      if (_.isEmpty(this.cart.models)) {
        this.cartView.render();
      } else {
        this.cartView.$el.show();
      }
    } else {
      this.cartView = new CartView({ collection: this.cart });
    }
  },
  createHeader: function() {
    if (this.headerView) {
      this.headerView.render();
    } else {
      this.headerView = new HeaderView({ collection: this.cart });
    }
  },
  menuView: function() {
    this.createHeader();
    this.createCart();
    this.$el.html("<ul id='items'>");
    this.renderItems();
    router.navigate('menu');
  },
  detailView: function(id) {
    var model = this.items.get(id);
    router.navigate("menu/" + id);
    new ItemDetailView({ model: model });
  },
  checkoutView: function() {
    new CheckoutView({ collection: this.cart });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on('add_to_cart', this.cart.addItem.bind(this.cart));
    this.on('empty', this.cart.empty.bind(this.cart));
  },
  init: function() {
    this.bindEvents();
  }
};

Handlebars.registerHelper("format_price", function(price) {
  return "$" + (+price).toFixed(2);
});

Handlebars.registerHelper("kj_to_kcal", function(kj) {
  return (0.239006 * kj).toFixed(4);
});
