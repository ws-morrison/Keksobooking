'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var roomsNumber = filtersForm.querySelector('#housing-rooms');
  var guestsNumber = filtersForm.querySelector('#housing-guests');
  var features = filtersForm.querySelectorAll('input[name="features"]');


  var setFilterValues = function (filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  };

  var setFilterPrice = function (price) {
    var currentValue = housePrice.value;

    switch (currentValue) {
      case 'middle':
        return price >= 10000 && price < 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price >= 50000;
      default:
        return true;
    }
  };

  var setFilterFeatures = function (filterFeatures, itemFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (itemFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  var setFilters = function () {
    var houseFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.data.filter(function (item) {
      if (!setFilterValues(houseType.value, item.offer.type)) {
        return false;
      }
      if (!setFilterPrice(item.offer.price)) {
        return false;
      }
      if (!setFilterValues(roomsNumber.value, item.offer.rooms + '')) {
        return false;
      }
      if (!setFilterValues(guestsNumber.value, item.offer.guests + '')) {
        return false;
      }
      if (!setFilterFeatures(houseFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };

  /*
  var setTestFilters = function () {
    setFilterValues();
    setFilterPrice();
    setFilterFeatures();
    setFilters();
    window.map.renderPins();
  };

  houseType.addEventListener('change', setTestFilters);
  */
  window.setFilters = setFilters;

})();