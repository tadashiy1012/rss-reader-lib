const assert = require('power-assert');
const reader = require('../index.js');
describe('rss-reader-lib test', () => {
  const url1 = 'http://news.yahoo.co.jp/pickup/rss.xml';
  const url2 = 'http://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml';
  const url3 = 'https://github.com/tadashiy1012.atom';
  it('test1', (done) => {
    reader(url1).then((resp) => {
      console.log(resp);
      done();
    });
  });
  it('test2', (done) => {
    reader(url2).then((resp) => {
      console.log(resp);
      done();
    });
  });
  it('test3', (done) => {
    reader(url3).then((resp) => {
      console.log(resp);
      done();
    });
  });
});