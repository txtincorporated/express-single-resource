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

  const testPost = {
    title: 'test title one',
    author: 'test author1',
  }; 
  const testPut = {
    title: 'test title one',
    author: 'test author2',
  };


  it('responds appropriately to GET directory requests', (done) => {

    //match expected with actual directory content output
    request
      .get('/store')
      .then(res => {
        let body = '';
        console.log('res.body: ', res.body);
        body = res.body;
        assert.deepEqual(body.files, 'pride_and_prejudice.json\n');
        done();
      })
      .catch(done);
  });

  // it('responds appropriately to POST requests', (done) => {
  //   //match expected with actual directory list after prescribed POST
  //   request
  //     .post('/store')
  //     .send(testPost)
  //     .then(res => {
  //       let body = '';
  //       console.log('testPost.title: ', testPost.title);
  //       console.log('res.body: ', res.body);
  //       body = res.body;
  //       assert.equal(body.fileName, testPost.title.replace(/\s/g, '_'));
  //       done();
  //     })
  //     .catch(done);
  // });

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