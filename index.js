module.exports = (function() {
  const request = require('request');
  const parseString = require('xml2js').parseString;
  function checkExt(obj) {
    if (obj.hasOwnProperty('rss')) {
      return 'rss';
    } else if (obj.hasOwnProperty('feed')) {
      return 'atom';
    } else {
      return 'n/a';
    }
  }
  function replaceHtml(html) {
    return html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
  }
  function convertRss(items) {
    const title = items.title;
    const entries = [];
    for (let entry of items.item) {
      entries.push({
        title: entry.title[0],
        link: entry.link[0],
        content: entry.description !== undefined ? 
          replaceHtml(entry.description[0]) : null,
        date: new Date(entry.pubDate)
      });
    }
    return [title, entries];
  }
  function convertAtom(items) {
    const title = items.title;
    const entries = [];
    for (let entry of items.entry) {
      entries.push({
        title: entry.title[0]._,
        link: entry.link[0].$.href,
        content: replaceHtml(entry.content[0]._),
        date: new Date(entry.updated[0])
      });
    }
    return [title, entries];
  }
  return function(tgtUrl) {
    return new Promise((resolve, reject) => {
      request(tgtUrl, (err, resp, body) => {
        if (err) { reject(err); }
        parseString(body, (err, result) => {
          if (err) { reject(err); }
          const ext = checkExt(result);
          if (ext === 'rss') {
            resolve(convertRss(result.rss.channel[0]));
          } else if (ext === 'atom') {
            resolve(convertAtom(result.feed));
          } else {
            reject(new Error('unsuported type'));
          }
        });
      });
    });
  };
})();