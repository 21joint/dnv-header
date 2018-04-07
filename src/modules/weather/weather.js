export default function(options) {
  let _queryUri, _unit, _lat, _lnt;

  _lnt = options.lnt;
  _lat = options.lat;
  _unit = options.unit ? options.unit :'c';

  _queryUri = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u='${_unit}' AND woeid in (SELECT woeid FROM geo.places WHERE text="(${_lat},${_lnt})")&format=json`;

  return $.ajax(_queryUri).then((res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.query.results ?
        res.query.results.channel.item.condition :
        {code: 'NA', temp: 'NA'};
  });
}