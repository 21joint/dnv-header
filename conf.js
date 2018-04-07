const path = require('path');

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


console.log(conf);

module.exports = conf;