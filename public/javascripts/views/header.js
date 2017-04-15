var HeaderView = Backbone.View.extend({
  el: "header",
  template: App.templates.header,
  events: {
    "click a": "menuView"
  },
  menuView: function(e) {
    e.preventDefault();
    this.undelegateEvents();
    App.menuView();
  },
  render: function() {
    this.$el.html(this.template({
      "quantity": this.collection.quantity()
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'cart_updated', this.render)
  }
})