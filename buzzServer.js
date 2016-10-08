const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('public'));

app.get('/buzzwords', (req, res) => {

});

app.route('/buzzword')
.post((req, res) => {

})
.put((req, res) => {

})
.delete((req, res) => {

});

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server started on', port);
});