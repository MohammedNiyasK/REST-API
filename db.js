const mongoose = require("mongoose");

 mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article' , articleSchema)


module.exports = { Article }




