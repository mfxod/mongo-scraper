var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  // find all documents in the Headline collection that are not saved by user
  db.Headline.find({ saved: false })
  // sort them in reverse chronological order
    .sort({ date: -1 })
    // render the documents on the home page
    .then(function(dbArticles) {
      res.render("home", { articles: dbArticles });
    });
});

// This route renders the saved handlebars page
router.get("/saved", function(req, res) {
  // find all documents that have been saved by the user then do the same as above for the "saved" route 
  db.Headline.find({ saved: true })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("saved", { articles: dbArticles });
    });
});

module.exports = router;
