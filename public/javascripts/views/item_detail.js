var ItemDetailView = BaseItemView.extend({
  attributes: {
    "id": 'item_details',
  },
  template: App.templates.item_detail,
  additionalEvents: {
    'click .nav' : "switch",
    'click a.close': 'close'
  },
  events: function() {
    return _.extend({}, BaseItemView.prototype.events, this.additionalEvents);
  },
  close: function(e) {
    e.preventDefault();
    App.menuView();
  },
  switch: function(e) {
    e.preventDefault();
    var id = this.model.get('id'),
        direction,
        new_id;

    if ($(e.currentTarget).hasClass('prev')) {
      direction = 'left';
      new_id = this.model.collection.prevID(id);
    } else {
      direction = 'right';
      new_id = this.model.collection.nextID(id);
    }
    this.slideTo(new_id, direction);
  },
  slideTo: function(id, direction) {
    var $item = $(this.$el.children('div')[0]),
        itemWidth = $item.css('width'),
        left = 0;
    
    left = direction === 'left' ? itemWidth : left;

    $item.animate({
      position: 'absolute',
      width: '-=' + itemWidth,
      left: '+=' + left
    }, 150, function() {
      this.remove();
      App.detailView(id);
    });
  },
  render: function(direction) {
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.html(this.$el);
  }
});