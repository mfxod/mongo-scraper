// Controller for our scraper
// ============================
var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    // scrape the NYT
    return scrape()
      .then(function(articles) {
        // then insert articles into the db
        return db.Headline.create(articles);
      })
      // this doesn't seem to always work when there are no new headlines to display...
      // also, it would be nice if there was some HTML to let you know the scraping was in progress
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      // this doesn't seem to actually be handling the error??
      .catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
