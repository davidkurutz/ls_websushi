var router = new (Backbone.Router.extend({
  routes: {
    "": "index",
    "index.html": "index",
    "menu": "index"
  },
  index: function() { App.menuView(); }
}))();

Backbone.history.start({
  pushState: true,
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ''), { trigger: true });
});