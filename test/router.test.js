const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const path = require('path');
const rimraf = require('rimraf');

const app = require('../lib/app');

//Test server, router and req handlers
describe('API responds correctly to the four principal REST methods', () => {

  const filePath = path.resolve(__dirname, '../lib/store/test*');
  const rmv = done => rimraf(filePath, done);
  before(rmv);
  after(rmv);

  const request = chai.request(app);

  const sawyer = {
    title: 'test Tom Sawyer',
    author: 'Mark Twain',
  }; 
  const clemens = {
    title: 'test Tom Sawyer',
    author: 'Samuel Clemens',
  };


  it('responds appropriately to GET directory requests', (done) => {

    //match expected with actual directory content output
    request
      .get('/store')
      .then(res => {
        console.log('res.body: ', res.body);
        assert.deepEqual(res.body, {});
        done();
      })
      .catch(done);
  });

  it('responds appropriately to POST requests', (done) => {
    //match expected with actual directory list after prescribed POST
    request
      .post('/store')
      .send(sawyer)
      .then(res => {
        // console.log('Body: ', res.body);
        console.log('sawyer.title: ', sawyer.title);
        assert.equal(res.fileName, 'test_Tom_Sawyer');
        done();
      })
      .catch(done);
  });

  // it('responds appropriately to GET file reqs', (done) => {

  //   //match expected with actual file output
  //   request
  //     .get(`/store/${sawyer.id}`)
  //     .then(res => {
  //       assert.deepEqual(res.body, {});
  //       done();
  //     })
  //     .catch(done);
  // });

  it('responds appropriately to PUT requests', () => {
    //match expected with actual file contents after prescribed PUT
  });

  it('responds appropriately to DELETE requests', () => {
    //match expectd with actual directory list after prescribed DELETE
  });


});