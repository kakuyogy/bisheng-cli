const ghPages = require('gh-pages');

ghPages.publish('site', function(err) {
  if(err) {
    console.log(err);
    return;
  }

  console.log('gh-pages successfully!');
});