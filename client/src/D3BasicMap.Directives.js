var angular = require('angular');

var app = angular.module('D3BasicMap.Directives', ['D3Map.Constants'])
    .directive('map', [function(){
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
                        .attr('d', path);
                });
            }
        }
    }])
    .directive('colorMap', [function(){
        return {
            restrict: '',
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
                    
                    var color = d3.scale.linear().domain([0,33]).range(['steelblue', 'blue']);
                        
                    mexico.enter()
                        .append('path')
                        .attr('d', path)
                        .attr('fill', function(d,i){
                            return color(i);
                        });
                });
            }
        }
    }])
    .directive('clickMap', [function(){
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, element, attr){
                var width = 450;
                var height = 300;
                
                var projection = d3.geo.mercator();
                var mexico = void 0;
                
                var geoID = function(d){
                    return "c" + d.properties.ID_1;    
                };
                
                var click = function(d){
                    mexico.attr('fill-opacity', 0.2);
                    
                    d3.select('#' + geoID(d)).attr('fill-opacity', 1);
                };
                
                var path = d3.geo.path().projection(projection);
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                
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
                    
                    var color = d3.scale.linear().domain([0,33]).range(['steelblue', 'blue']);
                        
                    mexico.enter()
                        .append('path')
                        .attr('d', path)
                        .attr('id', geoID)
                        .on('click', click)
                        .attr('fill', function(d,i){
                            return color(i);
                        });
                });
            }
        }
    }])
    .directive('colorMap2', [function(){
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
                    
                    var color = d3.scale.linear().domain([0,33]).range(['steelblue', 'blue']);
                        
                    mexico.enter()
                        .append('path')
                        .attr('d', path)
                        .attr('fill', function(d,i){
                            return color(i);
                    });
                    
                    setInterval(function(){mexico.transition().duration(500).style('fill', function(d){
                        return color(Math.floor(Math.random() * 32) + 1);
                    })}, 2000);
                });
            }
        }
    }])
    .directive('pointsMap', [function(){
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, element, attr){
                var width = 900;
                var height = 600;
                
                var projection = d3.geo.mercator();
                var mexico = void 0;
                
                var path = d3.geo.path().projection(projection);
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height);
                
                
                var map = svg.append('g')
                            .attr('class', 'boundary');
                var points = svg.append('g')
                            .attr('class', 'points');
                
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
                });
                
                d3.json('src/data/mexico-cities.json', function(data){
                    var cityPoints = points.selectAll('circle')
                                        .data(data.points);
                    var cityText = points.selectAll('text').data(data.points);
                    
                    var pointRadius = d3.scale.linear().domain([0,100]).range([5,30]);
                    
                    cityPoints.enter()
                        .append('circle')
                        .attr('cx', function(d){return projection([d.lon, d.lat])[0]})
                        .attr('cy', function(d){return projection([d.lon, d.lat])[1]})
                        .attr('r', function(d){return pointRadius(d.value)});
                    
                    cityText.enter()
                        .append('text')
                        .attr('x', function(d){return projection([d.lon, d.lat])[0]})
                        .attr('y', function(d){return projection([d.lon, d.lat])[1]})
                        .attr('dx', 5)
                        .attr('dy', 3)
                        .text(function(d){return d.name});
                });
            }
        }
    }])
module.exports = app;