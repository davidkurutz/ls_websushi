var BaseItemView = Backbone.View.extend({
  events: {
    'click .add_cart': "addToCart"
  },
  addToCart: function(e) {
    e.preventDefault();
    
    var item = this.model;
    var data = item.toJSON();

    $.ajax({
      url: "/cart",
      type: "post",
      data: {
        "item": JSON.stringify(data)
      },
      success: function() {
        App.trigger('add_to_cart', item)
      }
    });
  },
  initialize: function() {
    this.render();
  }
});