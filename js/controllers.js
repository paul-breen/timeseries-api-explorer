'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
  .controller('AppFooterCtrl', [ '$scope','$routeParams','ApiService',function ($scope,$routeParams,ApiService) {
	  $scope.apiVersionString = ApiService.getApiVersionString();
	  $scope.apiDocumentationUrl = ApiService.getApiAppUrl() + '/api-doc/index.html';
	  $scope.apiBaseUrl = ApiService.getApiBaseUrl();
  }])
  .controller('ApiDetailCtrl', [ '$scope','$routeParams','ApiService',function ($scope,$routeParams,ApiService) {
	  $scope.apiBaseUrl = ApiService.getApiBaseUrl();
	  $scope.apiCollectionType = $routeParams.apiCollectionType;
	  $scope.apiCollectionId = $routeParams.apiCollectionId;
	  $scope.apiFunctions = [];

	  $scope.apiFunctions.push({
	    "apiFunctionType": "metadata",
	    "apiCollectionType": $routeParams.apiCollectionType,
	    "apiCollectionUrl": $scope.apiBaseUrl + '/' + $scope.apiCollectionType + '/' + $scope.apiCollectionId + '/'
	  });

	  // The timeseries collection type has extra URLs
	  if($routeParams.apiCollectionType == "timeseries") {
	    $scope.apiFunctions.push({
	      "apiFunctionType": "data",
	      "apiCollectionType": $routeParams.apiCollectionType,
	      "apiCollectionUrl": $scope.apiBaseUrl + '/' + $scope.apiCollectionType + '/' + $scope.apiCollectionId + '/getData'
	    });
	    $scope.apiFunctions.push({
	      "apiFunctionType": "plot",
	      "apiCollectionType": $routeParams.apiCollectionType,
	      "apiCollectionUrl": $scope.apiBaseUrl + '/' + $scope.apiCollectionType + '/' + $scope.apiCollectionId + '/getData.png'
	    });
          }
  }])
  .controller('ServiceListCtrl', [ '$scope','SosInstanceService','Utils',function ($scope,service,utils) {
	  $scope.utils = utils;
	  $scope.services = service.getServiceInstances();
  }])
  .controller('ServiceDetailCtrl', [ '$scope','$routeParams','SosInstanceService',function ($scope,$routeParams,service) {
	  $scope.service = service.getServiceInstance({serviceId: $routeParams.serviceId});
  }])
  .controller('OfferingListCtrl', [ '$scope','$routeParams','OfferingService','Utils',function ($scope,$routeParams,service,utils) {
	  // debugger;
	  $scope.utils = utils;
	  $scope.offerings = service.getOfferings({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(offering) {
		  var search, label;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = offering.label.toLowerCase();
		  return !$scope.search || label.indexOf(search) !== -1;
	  };
  }])
  .controller('OfferingDetailCtrl', [ '$scope','$routeParams','OfferingService',function ($scope,$routeParams,service) {
	  $scope.offering = service.getOffering({
			  	serviceId: $routeParams.serviceId,
			  	offeringId: $routeParams.offeringId
		  	}, function() {
		  		$scope.serviceId = $routeParams.serviceId;
		  	});
  }])
  .controller('ProcedureListCtrl', [ '$scope','$routeParams','ProcedureService','Utils',function ($scope,$routeParams,service,utils) {
	  $scope.utils = utils;
	  $scope.procedures = service.getProcedures({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(procedure) {
		  var search, label;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = procedure.label.toLowerCase();
		  return !$scope.search || label.indexOf(search) !== -1;
	  };
  }])
  .controller('ProcedureDetailCtrl', [ '$scope','$routeParams','ProcedureService',function ($scope,$routeParams,service) {
	  $scope.procedure = service.getProcedure({
			  	serviceId: $routeParams.serviceId,
		  		procedureId: $routeParams.procedureId
	  		}, function() {
	  			$scope.serviceId = $routeParams.serviceId;
	  		});
  }])
  .controller('FeatureListCtrl', [ '$scope','$routeParams','FeatureService','Utils',function ($scope,$routeParams,service,utils) {
	  $scope.utils = utils;
	  $scope.features = service.getFeatures({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(feature) {
		  var search, label;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = feature.label.toLowerCase();
		  return !$scope.search || label.indexOf(search) !== -1;
	  };
  }])
  .controller('FeatureDetailCtrl', [ '$scope','$routeParams','FeatureService',function ($scope,$routeParams,service) {
	  $scope.feature = service.getFeature({
			  	serviceId: $routeParams.serviceId,
		  		featureId: $routeParams.featureId
	  		}, function() {
	  			$scope.serviceId = $routeParams.serviceId;
	  		});
  }])
  .controller('PhenomenonListCtrl', [ '$scope','$routeParams','PhenomenonService','Utils',function ($scope,$routeParams,service,utils) {
	  $scope.utils = utils;
	  $scope.phenomena = service.getPhenomena({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;

	  // debugger;
	  $scope.searchInRelevantProperties = function(phenomenon) {
		  var search, label;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = phenomenon.label.toLowerCase();
		  return !$scope.search || label.indexOf(search) !== -1;
	  };
  }])
  .controller('PhenomenonDetailCtrl', [ '$scope','$routeParams','PhenomenonService',function ($scope,$routeParams,service) {
	  $scope.phenomenon = service.getPhenomenon({
			  	serviceId: $routeParams.serviceId,
			  	phenomenonId: $routeParams.phenomenonId
	  		}, function() {
	  			$scope.serviceId = $routeParams.serviceId;
	  		});
  }])
  .controller('StationListCtrl', [ '$scope','$routeParams','$timeout','StationService','Utils',function ($scope,$routeParams,$timeout,service,utils) {
	  $scope.utils = utils;
	  $scope.stations = service.getStations({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(station) {
		  // debugger;
		  var search, name;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  name = station.properties.label.toLowerCase();
		  return !$scope.search || name.indexOf(search) !== -1;
	  };
  }])
  .controller('StationDetailCtrl', [ '$scope','$routeParams','StationService',function ($scope,$routeParams,service) {
	  var getTimeseriesIds = function(station) {
		if(station.properties) {
			var keys = [];
			for(var k in station.properties.timeseries) {
				keys.push(k);
			}
			$scope.timeseriesIds = keys;
		}
	  };

	  $scope.station = service.getStation({
			  	serviceId: $routeParams.serviceId,
			  	stationId: $routeParams.stationId
	  		}, function() {
	  			$scope.serviceId = $routeParams.serviceId;
	  		});
	  $scope.station.$promise.then(getTimeseriesIds);
  }])
  .controller('CategoryListCtrl', [ '$scope','$routeParams','CategoryService','Utils',function ($scope,$routeParams,service,utils) {
	  // debugger;
	  $scope.utils = utils;
	  $scope.categories = service.getCategories({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(category) {
		  var search, label;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = category.label.toLowerCase();
		  return !$scope.search || label.indexOf(search) !== -1;
	  };
  }])
  .controller('CategoryDetailCtrl', [ '$scope','$routeParams','CategoryService',function ($scope,$routeParams,service) {
	  $scope.category = service.getCategory({
			  	serviceId: $routeParams.serviceId,
			  	categoryId: $routeParams.categoryId
		  	}, function() {
		  		$scope.serviceId = $routeParams.serviceId;
		  	});
  }])
  .controller('TimeseriesListCtrl', [ '$scope','$routeParams','TimeseriesService','Utils',function ($scope,$routeParams,service,utils) {
	  // debugger;
	  $scope.utils = utils;
	  $scope.timeseries = service.getTimeseries({serviceId: $routeParams.serviceId});
	  $scope.serviceId = $routeParams.serviceId;
	  
	  $scope.searchInRelevantProperties = function(timeseries) {
		  var search, label, offeringLabel, phenomenonLabel;
		  if($scope.search) {
			  search = $scope.search.toLowerCase();
		  }
		  label = timeseries.label.toLowerCase();
		  offeringLabel = timeseries.parameters.offering.label.toLowerCase();
		  phenomenonLabel = timeseries.parameters.phenomenon.label.toLowerCase();
		  return !$scope.search || (label.indexOf(search) !== -1 || offeringLabel.indexOf(search) !== -1 || phenomenonLabel.indexOf(search) !== -1);
	  };
  }])
  .controller('TimeseriesDetailCtrl', [ '$scope','$routeParams','TimeseriesService','ApiService',function ($scope,$routeParams,service,ApiService) {
          $scope.apiBaseUrl = ApiService.getApiBaseUrl();
	  $scope.timeseriesMetadataUrl = $scope.apiBaseUrl + '/timeseries/' + $routeParams.timeseriesId + '/';
	  $scope.timeseriesDataUrl = $scope.apiBaseUrl + '/timeseries/' + $routeParams.timeseriesId + '/getData';
	  $scope.timeseriesPlotUrl = $scope.apiBaseUrl + '/timeseries/' + $routeParams.timeseriesId + '/getData.png';
	  $scope.timeseries = service.getSingleTimeseries({
			  	serviceId: $routeParams.serviceId,
			  	timeseriesId: $routeParams.timeseriesId
		  	}, function() {
		  		$scope.serviceId = $routeParams.serviceId;
		  	});
  }])
  .controller('TimeseriesDataCtrl', [ '$scope','$routeParams','TimeseriesDataService',function ($scope,$routeParams,service) {
	  // Format the timespan specification for the get data query
	  $scope.timespanStartDate = service.timespan.start.toISOString().replace(/T.*$/, '');
	  $scope.timespanEndDate = service.timespan.end.toISOString().replace(/T.*$/, '');
	  $scope.timespanSpec = $scope.timespanStartDate + '/' + $scope.timespanEndDate;

	  $scope.timeseriesMetadata = service.metadata.getSingleTimeseries({
			  	serviceId: $routeParams.serviceId,
			  	timeseriesId: $routeParams.timeseriesId
		  	}, function() {
		  		$scope.serviceId = $routeParams.serviceId;
		  	});

	  $scope.timeseriesData = service.data.getSingleTimeseriesData({
			  	serviceId: $routeParams.serviceId,
			  	timeseriesId: $routeParams.timeseriesId,
			  	timespanSpec: $scope.timespanSpec
		  	}, function() {
		  		$scope.serviceId = $routeParams.serviceId;
			  	$scope.timeseriesId = $routeParams.timeseriesId;
		  	});

	  // Construct the URL for the corresponding backend-rendered plot
	  $scope.timeseriesPlotUrl = '../api/v1/timeseries/' + $routeParams.timeseriesId + '/getData.png?service=' + $routeParams.serviceId + '&timespan=' + $scope.timespanSpec;
  }])
  .controller('DatepickerStartCtrl', ['$scope','$routeParams','TimeseriesDataService',
  function ($scope, $routeParams, service) {
  // The start/end dates are shared with the data service
  $scope.timespan = service.timespan;

  $scope.adjustDate = function(offset) {
    var d = new Date();
    d.setTime(d.getTime() + offset);
    $scope.timespan.start = new Date(d);
  };

  $scope.today = function() {
    $scope.timespan.start = new Date();
  };

  // Set the initial start date
  $scope.adjustDate(-(24 * 60 * 60 * 1000 * 7));

  $scope.clear = function () {
    $scope.timespan.start = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope[opened] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['yyyy-MM-dd'];
  $scope.format = $scope.formats[0];
  }])
  .controller('DatepickerEndCtrl', ['$scope','TimeseriesDataService',
  function ($scope, service) {
  // The start/end dates are shared with the data service
  $scope.timespan = service.timespan;

  $scope.today = function() {
    $scope.timespan.end = new Date();
  };

  // Set the initial start date
  $scope.today();

  $scope.clear = function () {
    $scope.timespan.end = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope[opened] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['yyyy-MM-dd'];
  $scope.format = $scope.formats[0];
  }]);
