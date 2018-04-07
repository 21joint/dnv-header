const path = require('path');
const fetchFavicons = require('@meltwater/fetch-favicon').fetchFavicons;


let conf;

conf = {
  onlyHeader: true,
  baseUrl: 'https://www.denver.org',
  appTitle: 'Denver Header',
  appPrefix: 'dnvr',
  dirNode: 'node_modules',
  dirSrc: path.join(__dirname, 'src'),
  dirFonts: path.join(__dirname, 'src/fonts'),
  dirImages: path.join(__dirname, 'src/images'),
};

// conf.favicons = fetchFavicons(conf.originUrl, function(res) {
//   console.log(res);
//   return res;
// });

// console.log(conf);

module.exports = conf;