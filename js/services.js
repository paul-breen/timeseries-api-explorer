'use strict';

/* Services */

var apiExplorerPath = 'explorer';
var apiVersionNumber = '1';
var apiVersionString = 'v' + apiVersionNumber;
var apiBasePath = 'api/' + apiVersionString;
var base = '../' + apiBasePath + '/';

angular.module('myApp.services', [ 'ngResource' ])
	.service('Utils',
		function _construct() {
			this.doubleEncode = function(toEncode) {
				return encodeURIComponent(encodeURIComponent(toEncode));
			};
		})
	.factory('ApiService', ['$location', function ($location) {
		return {
			getApiVersionNumber: function() {
				return apiVersionNumber;
			},
			getApiVersionString: function() {
				return apiVersionString;
			},
			getApiAppUrl: function() {
				var here = $location.absUrl();
				var appUrl = here.replace(new RegExp('^(.+)/' + apiExplorerPath + '.*'), '$1');
				return appUrl;
			},
			getApiBaseUrl: function() {
				return this.getApiAppUrl() + '/' + apiBasePath;
			}
		};
	}])
	.factory('SosInstanceService',
		function($resource) {
			return $resource(base + 'services/:serviceId?expanded=true', {}, {
				getServiceInstances : { method : 'GET', isArray : true },
				getServiceInstance : { method : 'GET', 
					params : {
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('OfferingService',
		function($resource) {
			return $resource(base + 'offerings/:offeringId?service=:serviceId', {}, {
				getOfferings : {
					method : 'GET',
					params : {
						serviceId : ':serviceId'
					},
					isArray : true
				},
				getOffering : {
					method : 'GET',
					params : {
						offeringId : ':offeringId',
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('ProcedureService',
		function($resource) {
			return $resource(base + 'procedures/:procedureId?service=:serviceId', {}, {
				getProcedures : {
					method : 'GET',
					params : {
						serviceId : ':serviceId'
					},
					isArray : true
				},
				getProcedure : {
					method : 'GET',
					params : {
						procedureId : ':procedureId',
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('FeatureService',
		function($resource) {
			return $resource(base + 'features/:featureId?service=:serviceId', {}, {
				getFeatures : {
					method : 'GET',
					params : {
						serviceId : ':serviceId'
					},
					isArray : true
				},
				getFeature : {
					method : 'GET',
					params : {
						featureId : ':featureId',
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('PhenomenonService',
		function($resource) {
			return $resource(base + 'phenomena/:phenomenonId?service=:serviceId', {}, {
				getPhenomena : {
					method : 'GET',
					params : {
						serviceId : ':serviceId'
					},
					isArray : true
				},
				getPhenomenon : {
					method : 'GET',
					params : {
						phenomenonId : ':phenomenonId',
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('StationService',
		function($resource) {
			return $resource(base + 'stations/:stationId?service=:serviceId&expanded=true', {}, {
				getStations : {
					method : 'GET',
					params : {
					},
					isArray : true
				},
				getStation : {
					method : 'GET',
					params : {
						stationId : ':stationId'
					},
					isArray : false
				}
			});
		})
	.factory('CategoryService',
		function($resource) {
			return $resource(base + 'categories/:categoryId?service=:serviceId', {}, {
				getCategories : {
					method : 'GET',
					params : {
						serviceId : ':serviceId'
					},
					isArray : true
				},
				getCategory : {
					method : 'GET',
					params : {
						categoryId : ':categoryId',
						serviceId : ':serviceId'
					},
					isArray : false
				}
			});
		})
	.factory('TimeseriesService',
		function($resource) {
			return $resource(base + 'timeseries/:timeseriesId?service=:serviceId&expanded=true', {}, {
				getTimeseries : {
					method : 'GET',
					params : {
					},
					isArray : true
				},
				getSingleTimeseries : {
					method : 'GET',
					params : {
						timeseriesId : ':timeseriesId'
					},
					isArray : false
				}
			});
		})
	.factory('TimeseriesDataService',
		function($resource) {
			return {
				data: $resource(base + 'timeseries/:timeseriesId/getData?service=:serviceId&timespan=:timespanSpec', {}, {
					getSingleTimeseriesData : {
						method : 'GET',
						params : {
							timeseriesId : ':timeseriesId'
						},
						isArray : false
					}
				}),
				metadata: $resource(base + 'timeseries/:timeseriesId?service=:serviceId&expanded=true', {}, {
					getSingleTimeseries : {
						method : 'GET',
						params : {
							timeseriesId : ':timeseriesId'
						},
						isArray : false
					}
				}),
				timespan: {
					start: null,
					end: null
				}
			};
		});
