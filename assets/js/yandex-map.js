$(document).ready(function () {
  if (document.querySelector('#map')) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map("map", {
        center: [53.863646, 27.489292],
        zoom: 15,

      });
    });
  }
});
