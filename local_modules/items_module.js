var path = require('path'),
    fs = require('fs'),
    file_path = path.resolve(path.dirname(__dirname), 'data/items.json');

module.exports = {
  get: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).data
  }
}