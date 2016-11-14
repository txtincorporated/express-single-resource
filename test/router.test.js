const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const path = require('path');
const rimraf = require('rimraf');

const app = require('../lib/app');

describe('API responds correctly to the four principal REST methods', () => {

  const filePath = path.resolve(__dirname, '../lib/store/test*');
  const rmv = done => rimraf(filePath, done);
  before(rmv);
  after(rmv);

  const request = chai.request(app);

  const testPost = {
    title: 'test title one',
    author: 'test author1',
  }; 
  const testPut = {
    title: 'test title one',
    author: 'test author2',
  };

  const testName = testPost.title.replace(/\s/g, '_');

  it('responds appropriately to GET directory requests', (done) => {

    request
      .get('/store')
      .then(res => {
        let body = '';
        body = res.body;
        assert.equal(body.files, '');
        done();
      })
      .catch(done);

  });

  it('responds appropriately to POST requests', (done) => {

    request
      .post('/store')
      .send(testPost)
      .then(res => {
        let body = '';
        body = res.body;
        assert.equal(body.fileName, testName);
        done();
      })
      .catch(done);

  });

  it('responds appropriately to GET file reqs', (done) => {

    request
      .get('/store/' + testName + '.json')
      .then(res => {
        let body = '';
        body = res.body;
        assert.deepEqual(res.body, { title: 'test title one', author: 'test author1' });
        done();
      })
      .catch(done);

  });

  it('responds appropriately to PUT requests', (done) => {

    request
      .put('/store/' + testName + '.json')
      .send(testPut)
      .then(res => {
        let body = '';
        body = res.body;
        assert.equal(body.author, testPut.author);
        done();
      })
      .catch(done);

  });

  it('responds appropriately to DELETE requests', (done) => {

    request
      .delete('/store/' + testName + '.json')
      .catch(done);

    request
      .get('/store')
      .then(res => {
        let body = '';
        body = res.body;
        assert.equal(body.files, '');
        done();
      })
      .catch(done);

  });

});