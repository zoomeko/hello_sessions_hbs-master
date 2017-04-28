var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  console.log('Session id ' + req.session.id);
  next();
});


/* GET home page, tracking how many times each user has visitedit.
* Each user will have their own req.session, which your routes can
* read. Routes can also add any data they need to req.session; this
* data will persist between requests... until the server restarts.  */
router.get('/', function(req, res, next) {

  var lastpagemsg, pagecountmsg;

  if (req.session.lastpage) {
    lastpagemsg = 'The last page you visited was <a href="' + req.session.lastpage+ '">' + req.session.lastpage + '</a>';
  } else {
    lastpagemsg = 'You have not visited any pages yet';
  }

  if (req.session.views) {
    req.session.views++;
    pagecountmsg = 'You have visited this page ' + req.session.views + ' times.';
  } else {
    req.session.views = 1;
    pagecountmsg = 'Welcome, first time visitor to the home page.';
  }

  res.send(pagecountmsg + ' ' + lastpagemsg);

});

router.use(function(req, res, next){
  req.session.lastpage = req._parsedUrl.path;
  next();
});

router.get('/bird', function(req, res, next){
  res.send('Bird page');
});

router.get('/cat', function(req, res, next){
  res.send('Cat page');
});


module.exports = router;
