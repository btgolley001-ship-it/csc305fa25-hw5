var express = require('express');
var router = express.Router();

/* When a GET request is received for the document root ("/"), and the request has no form data, 
* your node.js server should serve a copy of hw5-work.html. */

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.query (GET): '+JSON.stringify(req.query));
  req.body = req.query; // Now behaves very much like POST
  res.render('formpage', {title: 'Form Page First View',
                        formdata: req.body});
});

/* When a POST request is received for the document root ("/"), 
* and the request does have form data, your node.js server should serve a page that has:
*   - A table containing the form data submitted
*   - The same form found in hw5-work.html, including its CSS data, but not including the "Homework 5" header */

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('req.body (POST): '+JSON.stringify(req.body));
  setTitle(req, res, next);
});

/*
 * Set req.app.locals.title to the desired title of the page, depending on
 * whether HR_page is checked or not.  Call renderPage next.
 * Note: would call listNames next if I had time to implement smth for extra credit.
 */
function setTitle(req, res, next) {
  if (req.body.nameblank) {
    req.app.locals.title = 'Form Page';
  }
  else {
    req.app.locals.title = 'Form Page First View';
  }
  listNames(req, res, next);
}

/*
 * Set req.app.locals.new_name to req.body.nameblank
 * Update req.app.locals.list_names with new_name
 * Call listEmails next.
 */
function listNames(req, res, next) {
  console.log('\nPOST is running listNames() ... req.app.locals.list_names: '+(req.app.locals.list_names));
  // have an input for nameblank
  if (req.body.nameblank != undefined) {
    req.app.locals.new_name = req.body.nameblank;

    // Been through POST before, just add newname onto list_names
    if (req.app.locals.list_names) {
      console.log('   Trying to add to req.app.locals.list_names with: '+(req.app.locals.new_name));
      req.app.locals.list_names += ' / '+req.app.locals.new_name;
    }

    // First pass at POST, initialize variable 'list_names' with first instance
    else {
      console.log('   Trying to initialize req.app.locals.list_names with: '+(req.app.locals.new_name));
      req.app.locals.list_names = req.app.locals.new_name;
    }
    console.log('   req.app.locals.list_names (POST): '+(req.app.locals.list_names));
  }
  // no input for nameblank
  else {
    req.app.locals.list_names = undefined;
  }
  console.log('POST has run listNames() ... list_names: '+(req.app.locals.list_names));
  listEmails(req, res, next);
}

/* function listEmails
 * Set req.app.locals.new_email to req.body.email
 * Update req.app.locals.list_emails with new_email
 * Call listGradYr next.
 */
function listEmails(req, res, next) {
  console.log('\nPOST is running listEmails() ... req.app.locals.list_emails: '+(req.app.locals.list_emails));
  // have an input for email
  if (req.body.email != undefined) {
    req.app.locals.new_email = req.body.email;

    // Been through POST before, just add new_email onto list_names
    if (req.app.locals.list_emails) {
      console.log('   Trying to add to req.app.locals.list_emails with: '+(req.app.locals.new_email));
      req.app.locals.list_emails += ' / '+req.app.locals.new_email;
    }
    
    // First pass at POST, initialize variable 'list_emails' with first instance
    else {
      console.log('   Trying to initialize req.app.locals.list_emails with: '+(req.app.locals.new_email));
      req.app.locals.list_emails = req.app.locals.new_email;
    }
    console.log('   req.app.locals.list_emails (POST): '+(req.app.locals.list_emails));
  }
  // no input for email
  else {
    req.app.locals.list_emails = undefined;
  }
  console.log('POST has run listEmails() ... list_emails: '+(req.app.locals.list_emails));
  renderPage(req, res, next); // calling renderPage early to test if this works like i want it to
}

/* function listGradYr
 * Set req.app.locals.new_gradyr to req.body.grad-year
 * Update req.app.locals.list_gradyr with new_gradyr
 * Call listColors next.
 */

/* function listColors
 * Set req.app.locals.listgradyr to ???
 * Call renderPage next.
 */

/*
 * Marshal all the data that has been stashed in req.app.locals, and call res.render on formpage.
 */
function renderPage(req, res, next) {
  res.render('formpage', { title: req.app.locals.title,
                        formdata: req.body,
                        new_name: req.app.locals.new_name,
                        list_names: req.app.locals.list_names,
                        new_email: req.app.locals.new_email,
                        list_emails: req.app.locals.list_emails
  });
}

module.exports = router;
