var express = require('express');
var router = express.Router();

/* When a GET request is received for the document root ("/"), and the request has no form data, 
* your node.js server should serve a copy of hw5-work.html. */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('formpage', { title: 'Homework 5, CSC 305 Database Design, Fall 2025' });
});

/* When a POST request is received for the document root ("/"), 
* and the request does have form data, your node.js server should serve a page that has:
*   - A table containing the form data submitted
*   - The same form found in hw5-work.html, including its CSS data, but not including the "Homework 5" header */

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('Name: '+ req.body.nameblank);
  console.log('Email: '+ req.body.email);
  console.log('Graduation Year: '+ req.body.grad-year);
  console.log('Likes Plum: '+ req.body.Plum);
  console.log('Likes Tomato: '+ req.body.Tomato);
  console.log('Likes Wheat: '+ req.body.Wheat);
  console.log('Likes Chocolate: '+ req.body.Chocolate);
  console.log('req.body (POST): '+JSON.stringify(req.body));
  if (req.body.formpage) {
    console.log('Form Page')
    res.render('formpage', { title: '' });
  }
  else {
    res.render('formpage', { title: 'Homework 5, CSC 305 Database Design, Fall 2025'});
  }
});

module.exports = router;
