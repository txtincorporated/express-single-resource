const chai = require('chai');
const assert = require('chai').assert;

const server = require('../lib/server');

//Test server, router and request handlers
describe('API responds correctly to the four principal REST methods', () => {

  before('set up test directory and files', () => {});

  beforeEach('start test server', () => {});
  afterEach('shut down test server', () => {});

  it('responds appropriately to GET directory requests', () => {
    //match expected with actual directory content output
  });

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