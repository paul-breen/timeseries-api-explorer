'use strict';

// This needs to be set during the app build phase
var appVersionString = "1.0.0";

/* Directives */
angular.module('myApp.directives',[])
.directive('appVersion', function() {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, elem, attrs) {
                elem.html(appVersionString);
            }
        };
})
.directive('back', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
}])
.directive('map', ['$timeout','$filter',function($timeout,$filter) {
	    return {
	        restrict: 'E',
	        replace: true,
	        link: function(scope, element, attrs) {

	        	//
	        	// prepare map
	        	// var leafletKey = 'http://{s}.tile.cloudmade.com/fd3f159c3654442a8e7ff82bddc00b29/997/256/{z}/{x}/{y}.png';
	        	var leafletKey = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	        	var mapAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
	        						 '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	        						 'Imagery © <a href="http://cloudmade.com">CloudMade</a>';
	        	var map = L.map(attrs.id);
	        	L.tileLayer(leafletKey, {
	                attribution : mapAttribution,
	                maxZoom : 18,
	            }).addTo(map);
	        	
	        	//
	        	// register certain listeners to watch model

	        	var timeoutId,
	        			features;
	        	scope.$watch(attrs.features,function(value){
	        		features = value;
	        		renderStations();
	        	});

	        	function renderStations() {
	        		timeoutId = $timeout(function() {
	        			var layer = L.geoJson(features, {
		        			onEachFeature : function(feature, layer) {
		        				//debugger;
		                        var content = "";
		                        if (feature.properties) {
		                            var stationName = feature.properties['label'];
		                            content = content + "<b>Station:</b> " + stationName + "<br/>";
		                            var tsProperties = feature.properties['timeseries'];
		                            if (tsProperties) {
                                              var tsCount = 0;
                                              for(var k in tsProperties) {
                                                if(tsProperties.hasOwnProperty(k)) {
                                                  ++tsCount;
                                                }
                                              }
	                                      content = content + "<b>Number of Timeseries:</b> " + tsCount + "<br/>";
		                            }
					    content = content + '<a href="#/services/s/stations/' + feature.properties['id'] + '">View Station</a>';
		                            layer.bindPopup("<html><body>" + content + "</body></html>");
		                        }
		                    }
	        			});
	        			map.addLayer(layer);
	        			if (features) {
		        			map.fitBounds(layer.getBounds());
	        			}
	        		}, 500);
	        	}
	        	
	        	//
	        	// re-register listeners when destroyed
	        	
	        	element.bind('$destroy', function() {
	                $timeout.cancel(timeoutId);
	              });
	        	
	        	renderStations();
	        	
//	        	scope.addStations = function(stations) {
//	        		L.geoJson(stations, {
//	        			onEachFeature : function(feature, layer) {
//	                        var content = "";
//	                        if (feature.properties) {
//	                            var stationName = feature.properties['station'];
//	                            content = content + "<b>Station:</b> " + stationName + "<br/>";
//	                            var tsProperties = feature.properties['timeseries'];
//	                            if (tsProperties) {
//	                                if (station.length !== 0) {
//	                                    parameters = tsProperties[0];
//	                                    content = content + "<b>Offering:</b> " + parameters.offering + "<br/>";
//	                                    content = content + "<b>Proceudre:</b> " + parameters.procedure + "<br/>";
//	                                    content = content + "<b>Phenomenon:</b> " + parameters.phenomenon + "<br/>";
//	                                    content = content + "<b>Feature:</b> " + parameters.feature;
//	                                } else {
//	                                    var timeseries = "";
//	                                    for (var i = 0; i < tsProperties.length ; i++) {
//	                                        timeseries = timeseries + tsProperties[i] + "<br/>";
//	                                    }
//	                                    content = content + "<b>timeseries:</b> " + timeseries;
//	                                }
//	                            }
//	                            layer.bindPopup("<html><body>" + content + "</body></html>");
//	                        }
//	                    }
//	                });
//	                if (clustered) {
//	                    var clusteredLayer = new L.MarkerClusterGroup();
//	                    clusteredLayer.addLayer(stations);
//	                    map.addLayer(clusteredLayer);
//	                    map.fitBounds(clusteredLayer.getBounds());
//	                } else {
//	                    map.addLayer(stations);
//	                    map.fitBounds(stations.getBounds());
//	                }
//	                
//	        	};
	        	
	        }
	    };
}]);
