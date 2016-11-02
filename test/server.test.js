const chai = require('chai');
const assert = require('chai').assert;

const app = require('../lib/app');

//Test server, router and request handlers
describe('API responds correctly to the four principal REST methods', () => {

  before('set up test files', () => {});

  // it('responds appropriately to GET directory requests', (req, res) => {

  //   const request = {
  //     method: 'GET',
  //     url: '/store'
  //   };
    
  //   //match expected with actual directory content output
  //   const response = app(req, res);
  //   const testKey = 'You requested /store \npride_and_prejudice.json';

  //   response = response(request, null);

  //   assert.equal(response, testKey);
  // });

  it('responds appropriately to GET file requests', () => {
    //match expected with actual file output
  });

  it('responds appropriately to POST requests', () => {
    //match expected with actual directory list after prescribed POST
  });

  it('responds appropriately to PUT requests', () => {
    //match expected with actual file contents after prescribed PUT
  });

  it('responds appropriately to DELETE requests', () => {
    //match expectd with actual directory list after prescribed DELETE
  });

  after('remove directory and files', () => {});

});