var angular = require('angular');

var app = angular.module('InteractiveMap.Services', ['D3Map.Constants'])
    .directive('hoverMap', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var width = 450;
                var height = 300;
                
                var projection = d3.geo.mercator();
                var mexico = void 0;
                
                var path = d3.geo.path().projection(projection);
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                
                var tooltip = d3.select(element[0])
                                .append('div')
                                .attr('class', 'tooltip');
                var tooltipElement = angular.element(tooltip[0][0]);
                
                d3.json('src/data/mexico.json', function(data){
                    var states = topojson.feature(data, data.objects.MEX_adm1);
                    
                    projection.scale(1).translate([0,0]);
                    
                    var b = path.bounds(states);
                    var s = .95 / Math.max(( b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
                    var t = [( width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
                    
                    projection.scale(s).translate(t);
                    
                    var map = svg.append('g')
                                .attr('class', 'boundary');
                    
                    mexico = map.selectAll('path').data(states.features);
                    
                        
                    mexico.enter()
                        .append('path')
                        .attr('d', path)
                        .on('mouseover', handleHover)
                        .on('mouseout', handleMouseOut);
                });
                
                var handleHover = function(d){
                    tooltipElement.css('display', 'block');
                    tooltipElement.css('left', d3.event.pageX + 'px');
                    tooltipElement.css('top', d3.event.pageY + 'px');
                    tooltipElement.html(d.properties.NAME_1);
                };
                
                var handleMouseOut = function(d){
                    tooltipElement.css('display', 'none');
                };
            }
        }
    }])
    .directive('panZoomMap', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var width = 450;
                var height = 300;
                
                var projection = d3.geo.mercator();
                var mexico = void 0;
                
                var path = d3.geo.path().projection(projection);
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                
                var map = svg.append('g')
                                .attr('class', 'boundary');
                
                d3.json('src/data/mexico.json', function(data){
                    var states = topojson.feature(data, data.objects.MEX_adm1);
                    
                    projection.scale(1).translate([0,0]);
                    
                    var b = path.bounds(states);
                    var s = .95 / Math.max(( b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
                    var t = [( width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
                    
                    projection.scale(s).translate(t);
                    
                    mexico = map.selectAll('path').data(states.features);
                    
                    mexico.enter()
                        .append('path')
                        .attr('d', path);
                    
                    svg.append('rect')
                        .attr('class', 'overlay')
                        .attr('width', width)
                        .attr('height', height)
                        .call(zoom);
                });
                
                var handleZoom = function(){
                    map.attr('transform', 'translate(' +  d3.event.translate + ')scale(' + d3.event.scale + ')')
                };
                
                var zoom = d3.behavior
                            .zoom()
                            .scaleExtent([1,8])
                            .on("zoom", handleZoom)
                            .size([width, height])
            }
        }
    }])
    .directive('globe', [function(){
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, element, attr){
                var width = 900;
                var height = 600;
                var projection = d3.geo.orthographic().clipAngle(90);
                var path = d3.geo.path().projection(projection);
                
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                var map = svg.append('g').attr('class', 'boundary');
                
                d3.json('src/data/world.json', function(data){
                    var countries = topojson.feature(data, data.objects.countries);
                    var world = map.selectAll('path').data(countries.features);
                    
                    world.enter()
                        .append('path')
                        .attr('d', path);
                });
            }
        }
    }])
    .directive('globeRotate', [function(){
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, element, attr){
                var width = 900;
                var height = 600;
                var projection = d3.geo.orthographic().clipAngle(90);
                var path = d3.geo.path().projection(projection);
                
                var i = 0;
                
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                var map = svg.append('g').attr('class', 'boundary');
                
                d3.json('src/data/world.json', function(data){
                    
                    var countries = topojson.feature(data, data.objects.countries);
                    
                    var world = map.selectAll('path').data(countries.features);
                    var usa = map.selectAll('.usa').data([countries.features[168]]);
                    
                    world.enter()
                        .append('path')
                        .attr('d', path);
                    
                    usa.enter()
                        .append('path')
                        .attr('class', 'usa')
                        .attr('d', path)
                    
                    setInterval(function(){
                        i = i + 0.2;
                        
                        projection.rotate([i,0,0]);
                        world.attr('d', path);
                        usa.attr('d', path);
                    }, 20);
                });
            }
        }
    }])
    .directive('globeDragRotate', [function(){
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, element, attr){
                var width = 900;
                var height = 600;
                var projection = d3.geo.orthographic().clipAngle(90);
                var path = d3.geo.path().projection(projection);
                
                var i = 0;
                
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                var map = svg.append('g').attr('class', 'boundary');
                
                d3.json('src/data/world.json', function(data){
                    
                    var countries = topojson.feature(data, data.objects.countries);
                    
                    var world = map.selectAll('path').data(countries.features);
                    var usa = map.selectAll('.usa').data([countries.features[168]]);
                    
                    world.enter()
                        .append('path')
                        .attr('d', path);
                    
                    usa.enter()
                        .append('path')
                        .attr('class', 'usa')
                        .attr('d', path);
                    
                    var handleDrag = function(d){
                        var c = projection.rotate();
                        
                        projection.rotate([c[0] + d3.event.dx/2, c[1], c[2]]);
                        world.attr('d', path);
                        usa.attr('d',path);
                    };
                    
                    var drag = d3.behavior.drag().on('drag', handleDrag);
                    
                    svg.append('rect')
                        .attr('class', 'overlay')
                        .attr('width', width)
                        .attr('height', height)
                        .call(drag);
                    
                    
                });
            }
        }
    }])
module.exports = app;