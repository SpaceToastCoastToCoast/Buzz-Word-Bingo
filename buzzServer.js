const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');
const app = express();
let buzzWords = [];

function findBuzzwordIndex(buzz) {
  let [bwObject] = buzzWords.filter((word, index, array) => {
    return word.buzzWord === buzz;
  });
  if (bwObject === undefined) {
    return -1;
  } else {
    return buzzWords.indexOf(bwObject);
  }
}

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('public'));

app.get('/buzzwords', (req, res) => {
  res.json({
    buzzWords : buzzWords
  });
});

app.route('/buzzword')
.post((req, res) => {
  req.body.heard = false;
  buzzWords.push(req.body);
  res.json({
    success : true
  });
})
.put((req, res) => {

  res.json({
    success: true,
    newScore: score
  });
})
.delete((req, res) => {
  let buzzIndex = findBuzzwordIndex(req.body.buzzWord);
  if(buzzIndex >= 0) {
    buzzWords.splice(buzzIndex, 1);
    res.json({
      success: true
    });
  } else {
    res.json({
      success: false
    });
  }
});

app.post('/reset', (req, res) => {

});

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server started on', port);
});