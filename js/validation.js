'use strict';
(function () {
  // Валидация формы
  var NOT_FOR_GUESTS_OPTION = 0;
  var DEFAULT_ROOMS = '1';
  var MAX_ROOMS = 100;

// document временно
  var formRooms = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');
  var formTitle = document.querySelector('#title');
  var formPrice = document.querySelector('#price');
  var formType = document.querySelector('#type');
  var capacityOptionElements = Array.from(formCapacity);


  var getValidTitle = function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Заголовок слишком короткий. Длина заголовка должна быть от 30 до 100 символов');
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity('Заголовок слишком длинный. Длина заголовка должна быть от 30 до 100 символов');
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Обязательное поле');
    } else {
      formTitle.setCustomValidity('');
    }
  };
  formTitle.addEventListener('invalid', getValidTitle);


  var getValidPrice = function () {
    if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Цена не может быть больше 1 000 000');
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Обязательное поле');
    } else {
      formPrice.setCustomValidity('');
    }
  };
  formPrice.addEventListener('invalid', getValidPrice);


  var getGuestOptions = function () {
    var selectedOptionValue = parseInt(formRooms.value, 10);

    var getOptionDisabled = function (optionsArray, booleanValue) {
      optionsArray.forEach(function (option) {
        option.disabled = booleanValue;
      });
    };
    getOptionDisabled(capacityOptionElements, true);

    if (selectedOptionValue === MAX_ROOMS) {
      capacityOptionElements[NOT_FOR_GUESTS_OPTION].disabled = false;
      capacityOptionElements[NOT_FOR_GUESTS_OPTION].selected = true;
    } else {
      var capacityOptions = capacityOptionElements.slice(1);
      capacityOptions.length = selectedOptionValue;
      getOptionDisabled(capacityOptions, false);
      capacityOptions.forEach(function (option) {
        option.selected = true;
      });
    }
  };


  var getFormToDefault = function () {
    formRooms.value = DEFAULT_ROOMS;
    formCapacity.placeholder = DEFAULT_ROOMS;
    formCapacity.value = DEFAULT_ROOMS;

    capacityOptionElements.forEach(function (item) {
      if (!item.selected) {
        item.disabled = true;
      }
    });
  };


  formRooms.addEventListener('change', getGuestOptions);
  getFormToDefault();

  var flatPrice = 0;
  var bungaloPrice = 1000;
  var housePrice = 5000;
  var palacePrice = 10000;

  var getChangePrice = function () {

    if (formType.value === 'flat') {

      formPrice.min = flatPrice;
      formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + flatPrice + ' \u00A5');
    } else if (formType.value === 'bungalo') {

      formPrice.min = bungaloPrice;
      formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + bungaloPrice + ' \u00A5');

    } else if (formType.value === 'house') {

      formPrice.min = housePrice;
      formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + housePrice + ' \u00A5');
    } else if (formType.value === 'palace') {

      formPrice.min = palacePrice;
      formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + palacePrice + ' \u00A5');
    }
  };

  formType.addEventListener('change', getChangePrice);
  formPrice.addEventListener('invalid', getChangePrice);


  var formTimeIn = document.querySelector('#timein');
  var formTimeOut = document.querySelector('#timeout');


  var getSyncTimeIn = function (evt) {
    if (evt.target === formTimeIn) {
      formTimeOut.value = formTimeIn.value;
    } else if (evt.target === formTimeOut) {
      formTimeIn.value = formTimeOut.value;
    }
  };
  formTimeIn.addEventListener('change', getSyncTimeIn);

  // window.validation = validation;
})();
