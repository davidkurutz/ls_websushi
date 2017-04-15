var ItemView = BaseItemView.extend({
  tagName: "li",
  template: App.templates.item,
  additionalEvents: {
    "click header": "detailView"
  },
  events: function() {
    return _.extend({}, BaseItemView.prototype.events, this.additionalEvents);
  },
  detailView: function(e) {
    e.preventDefault();
    App.detailView(this.model.get('id'));
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find("#items"));
  }
});

