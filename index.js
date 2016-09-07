module.exports = (function() {
  const request = require('request');
  const parseString = require('xml2js').parseString;
  function checkExt(url) {
    const ext = url.substring(url.lastIndexOf('.') + 1);
    if (ext === 'xml') {
      return 'rss';
    } else if (ext === 'atom') {
      return 'atom';
    } else {
      return 'n/a';
    }
  }
  function convertRss(items) {
    return items;
  }
  function convertAtom(items) {
    return items;
  }
  return function(tgtUrl) {
    return new Promise((resolve, reject) => {
      const ext = checkExt(tgtUrl);
      if (ext === 'n/a') {
        reject(new Error('incompatible error'));
      }
      request(tgtUrl, (err, resp, body) => {
        if (err) { reject(err); }
        parseString(body, (err, result) => {
          if (err) { reject(err); }
          if (ext === 'rss') {
            resolve(convertRss(result.rss.channel[0]));
          } else {
            resolve(convertAtom(result.feed));
          }
        });
      });
    });
  };
})();