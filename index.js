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
    const title = items.title;
    const entries = [];
    for (let entry of items.item) {
      console.log(entry);
      entries.push({
        title: entry.title,
        link: entry.link,
        content: entry.description
      });
    }
    return [title, entries];
  }
  function convertAtom(items) {
    const title = items.title;
    const entries = [];
    for (let entry of items.entry) {
      entries.push({
        title: entry.title,
        link: entry.link,
        content: entry.content
      });
    }
    return [title, entries];
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