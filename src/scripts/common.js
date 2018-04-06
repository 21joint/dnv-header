import config from '../../project.config';
import '../assets/scss/index.scss';
import '../modules/hamburger/hamburger';
import '../modules/climacons/climacons';
import getWeather from '../modules/weather/weather';

(function() {

  let $weatherEl = $('<a>').
      addClass('btn btn-block ' + config.cssPrefix + '-header--btn ' +
          config.cssPrefix + '-weather--btn').
      wrap('<div class="flex-col-auto"></div>');

  $weatherEl.prependTo('.' + config.cssPrefix + '-header--buttons');

  $(document).on('click', '[class*="btn--nav"]', function() {
    $('body').toggleClass(config.cssPrefix + '-nav--open');
  }).on('click', '[class*="btn--search"]', function() {
    $('body').toggleClass(config.cssPrefix + '-search--open');
  });

  getWeather({
    lat: 34.2257,
    lnt: 77.9447,
    unit: 'f',
  }).then(function(res) {
    $weatherEl.html(
        `<i class="climacon icon i${res.code}" aria-hidden="true"></i>${res.temp}&deg;`);
  });

})();