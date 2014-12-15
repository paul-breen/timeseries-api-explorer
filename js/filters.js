'use strict';

/* Filters */
angular.module('myApp.filters', [])
.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  }
}])
.filter('timestampToISOString', function() {
  return function(input) {
    return (new Date(input)).toISOString();
  }
})
.filter('toTitleCase', function() {
  return function(x) {
    var y = x;

    if(x) {
      var a = x.split(/ /);

      for(var j = 0, len = a.length; j < len; j++) {
        a[j] = a[j].replace(/^(.)/, function(match, $1, offset, original) {return ($1).toUpperCase();});
      }
      y = a.join(" ");
    }

    return y;
  }
})
.filter('toDisplayName', function() {
  return function(x) {
    var y = x;

    if(x) {
      y = x.replace(/_/g, " ");
    }

    return y;
  }
})
.filter('toDisplayUom', function() {
  return function(x) {
    var y = x;
    var uomDisplayTitles = {
      "Cel": "&deg;C",
      "deg": "&deg;",
      "m/s": "m s<sup>-1</sup>"
    };

    /* SOS units are encoded according to Unified Code for Units of Measure
       (UCUM).  See http://unitsofmeasure.org/ */
    if(x) {
      if(uomDisplayTitles[x]) {
        y = uomDisplayTitles[x];
      }
    }

    return y;
  }
});
