'use strict';

/* Declare app level module which depends on filters, and services */
angular.module('myApp', ['myApp.services', 'myApp.directives', 'myApp.controllers', 'myApp.filters', 'ui.bootstrap', 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  // Service instance routes
  $routeProvider.when('/services', {
    templateUrl: 'partials/service-list.html', 
    controller: 'ServiceListCtrl'
  });
  $routeProvider.when('/services/:serviceId', {
    templateUrl: 'partials/service-detail.html', 
    controller: 'ServiceDetailCtrl'
  });

  // Offering routes
  $routeProvider.when('/services/:serviceId/offerings', {
    templateUrl: 'partials/offering-list.html', 
    controller: 'OfferingListCtrl' 
  });
  $routeProvider.when('/services/:serviceId/offerings/:offeringId', {
    templateUrl: 'partials/offering-detail.html', 
    controller: 'OfferingDetailCtrl' 
  });

  // Procedure routes
  $routeProvider.when('/services/:serviceId/procedures', {
    templateUrl: 'partials/procedure-list.html', 
    controller: 'ProcedureListCtrl'
  });
  $routeProvider.when('/services/:serviceId/procedures/:procedureId', {
    templateUrl: 'partials/procedure-detail.html', 
    controller: 'ProcedureDetailCtrl' 
  });

  // Feature routes
  $routeProvider.when('/services/:serviceId/features', {
    templateUrl: 'partials/feature-list.html', 
    controller: 'FeatureListCtrl'
  });
  $routeProvider.when('/services/:serviceId/features/:featureId', {
    templateUrl: 'partials/feature-detail.html', 
    controller: 'FeatureDetailCtrl' 
  });

  // Phenomenon routes
  $routeProvider.when('/services/:serviceId/phenomena', {
    templateUrl: 'partials/phenomenon-list.html', 
    controller: 'PhenomenonListCtrl' 
  });
  $routeProvider.when('/services/:serviceId/phenomena/:phenomenonId', {
    templateUrl: 'partials/phenomenon-detail.html', 
    controller: 'PhenomenonDetailCtrl' 
  });

  // Station routes
  $routeProvider.when('/services/:serviceId/stations', {
    templateUrl: 'partials/station-list.html',
    controller: 'StationListCtrl'
  });
  $routeProvider.when('/services/:serviceId/stations/:stationId', {
    templateUrl: 'partials/station-detail.html',
    controller: 'StationDetailCtrl'
  });

  // Category routes
  $routeProvider.when('/services/:serviceId/categories', {
    templateUrl: 'partials/category-list.html', 
    controller: 'CategoryListCtrl' 
  });
  $routeProvider.when('/services/:serviceId/categories/:categoryId', {
    templateUrl: 'partials/category-detail.html', 
    controller: 'CategoryDetailCtrl' 
  });

  // Timeseries routes
  $routeProvider.when('/services/:serviceId/timeseries', {
    templateUrl: 'partials/timeseries-list.html',
    controller: 'TimeseriesListCtrl'
  });
  $routeProvider.when('/services/:serviceId/timeseries/:timeseriesId', {
    templateUrl: 'partials/timeseries-detail.html',
    controller: 'TimeseriesDetailCtrl'
  });
  $routeProvider.when('/services/:serviceId/timeseries/:timeseriesId/getData', {
    templateUrl: 'partials/timeseries-data.html', 
    controller: 'TimeseriesDataCtrl' 
  });
/*** TODO: ***/
  /* $routeProvider.when('/services/:serviceId/timeseries/:timeseriesId/getPlot', {
    templateUrl: 'partials/timeseries-plot.html', 
    template : '<a ng-href="{{ts_url}}"></a>',
    controller: 'TimeseriesPlotCtrl' 
  }); */

  // Fallback route
  $routeProvider.otherwise({redirectTo: '/services'});
}]);

