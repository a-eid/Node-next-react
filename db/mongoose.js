const mongoose = require("mongoose")
const Schema = mongoose.Schema
const db = mongoose.connect("mongodb://localhost:27017/linnks")

module.exports = function() {
  require("./User")
  return db
}
