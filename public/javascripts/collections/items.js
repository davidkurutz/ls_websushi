var Items = Backbone.Collection.extend({
  model: Item,
  ids: function() {
    return this.pluck('id');
  },
  prevID: function(id) {
    return id > _.min(this.ids()) ? id - 1 : _.max(this.ids());
  },
  nextID: function(id) {
    return id < _.max(this.ids()) ? id + 1 : _.min(this.ids());
  },
});