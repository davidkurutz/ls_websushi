var BaseItemView = Backbone.View.extend({
  events: {
    'click .add_cart': "addToCart"
  },
  addToCart: function(e) {
    e.preventDefault();
    
    var item = this.model;
        data = item.toJSON();
        self = this;

    $.ajax({
      url: "/cart",
      type: "post",
      data: {
        "item": JSON.stringify(data)
      },
      success: function() {
        App.cart.addItem(item);
      }
    });
  },
  initialize: function() {
    this.render();
  }
});