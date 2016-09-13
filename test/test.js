const assert = require('power-assert');
const reader = require('../index.js');
describe('rss-reader-lib test', () => {
  const url1 = 'http://news.yahoo.co.jp/pickup/rss.xml';
  const url2 = 'http://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml';
  const url3 = 'https://github.com/tadashiy1012.atom';
  const url4 = 'http://news.google.com/news?hl=ja&ned=us&ie=UTF-8&oe=UTF-8&output=atom&topic=h';
  it('test1', (done) => {
    reader(url1).then((resp) => {
      console.log(resp[1][0])
      done();
    });
  });
  it('test2', (done) => {
    reader(url2).then((resp) => {
      console.log(resp[1][0]);
      done();
    });
  });
  it('test3', (done) => {
    reader(url3).then((resp) => {
      console.log(resp[1][0]);
      done();
    });
  });
  it('test4', (done) => {
    reader(url4).then((resp) => {
      console.log(resp[1][0]);
      done();
    });
  });
});