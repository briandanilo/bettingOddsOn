var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.use(express.static('simple'));

app.get('/', function(request, response) {
  response.render('simple/index.html');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


