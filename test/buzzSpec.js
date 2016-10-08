const app = require('../');
const supertest = require("supertest")(app);
const fs = require("fs");

describe("buzzword bingo", function(done) {
  let successMsg = JSON.stringify({
      success : true
    });
  let failureMsg = JSON.stringify({
      success : false
    });
  it("gives the index page when / is requested", function(done) {
    let index = fs.readFileSync('./public/index.html', 'utf8');
    supertest
      .get("/")
      .expect(200)
      .expect(index)
      .end(done);
  });
  it("gives a JSON of all buzzwords at /buzzwords", function(done) {
    let emptyList = JSON.stringify({
      buzzWords : []
    });
    supertest
      .get("/buzzwords")
      .expect(200)
      .expect(emptyList)
      .end(done);
  });
  it("posts a buzzword via /buzzword", function(done) {
    supertest
    .post("/buzzword")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('buzzWord=Doge')
    .send('points=5')
    .expect(200)
    .expect(successMsg)
    .end(done);
  });
  it("posts more buzzwords via /buzzword", function(done) {
    supertest
    .post("/buzzword")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('buzzWord=Longcat')
    .send('points=20')
    .expect(200)
    .expect(successMsg)
    .end(done);
  });
  it("refuses duplicate buzzwords", function(done) {
    supertest
    .post("/buzzword")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('buzzWord=Longcat')
    .send('points=20')
    .expect(200)
    .expect(failureMsg)
    .end(done);
  });
  it("deletes a buzzword", function(done) {
    supertest
    .del("/buzzword")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('buzzWord=Longcat')
    .expect(200)
    .expect(successMsg)
    .end(done);
  });
});