var express = require('express');
var router = express.Router();

/* When a GET request is received for the document root ("/"), and the request has no form data, 
* your node.js server should serve a copy of hw5-work.html. */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('formpage', { title: 'Homework 5' });
});

/* When a POST request is received for the document root ("/"), 
* and the request does have form data, your node.js server should serve a page that has:
*   - A table containing the form data submitted
*   - The same form found in hw5-work.html, including its CSS data, but not including the "Homework 5" header */

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('req.body (POST): '+JSON.stringify(req.body));
  showPage(req, res, next);
});

module.exports = router;
