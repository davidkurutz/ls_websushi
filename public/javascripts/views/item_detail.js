var ItemDetailView = BaseItemView.extend({
  attributes: {
    "id": 'item_details',
  },
  template: App.templates.item_detail,
  additionalEvents: {
    'click .prev': 'prevItem',
    'click .next': 'nextItem',
    'click a.close': 'close',
  },
  events: function() {
    return _.extend({}, BaseItemView.prototype.events, this.additionalEvents)
  },
  close: function(e) {
    e.preventDefault();
    App.menuView();
  },
  prevItem: function(e) {
    e.preventDefault();
    App.prevItem(this.model.get('id'));
  },
  nextItem: function(e) {
    e.preventDefault();
    App.nextItem(this.model.get('id'));
  },
  render: function(direction) {
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.html(this.$el);
  }
})