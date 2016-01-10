var angular = require('angular');

var app = angular.module('D3Basics.Directives', ['D3Map.Constants'])
    .directive('rectTest', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var svg = d3.select(element[0])
                            .append("svg")
                            .attr("width", 200)
                            .attr("height", 200);
                
                svg.append('rect')
                    .attr('x', 10)
                    .attr('y', 10)
                    .attr('width', 50)
                    .attr('height', 100);
            }
        }
    }])
    .directive('enterTest', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var svg = d3.select(element[0])
                    .append('svg')
                    .attr('width', 200)
                    .attr('height', 200);
                
                svg.selectAll('rect')
                    .data([1,2])
                    .enter()
                    .append('rect')
                    .attr('x', function(d){return d * 20;})
                    .attr('y', function(d){return d * 50;})
                    .attr('width', 50)
                    .attr('height', 100);
            }
        }
    }])
    .directive('enterTest2', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var data = [
                    {
                        x: 10,
                        y: 10,
                        width: 5,
                        height: 40
                    },
                    {
                        x: 40,
                        y: 10,
                        width: 100,
                        height: 40
                    }
                ];
                
                var svg = d3.select(element[0])
                    .append('svg')
                    .attr('width', 200)
                    .attr('height', 200);
                
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('x', function(d){return d.x;})
                    .attr('y', function(d){return d.y;})
                    .attr('width', function(d){return d.width})
                    .attr('height', function(d){return d.height});
            }
        }
    }])
    .directive('updateTest', [function(){
        return {
            restrict: 'E',
            scope: {
            },
            link: function($scope, element, attr){
                var counter = 10;
                
                var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', 200)
                            .attr('height', 200);
                
                var rectangles = function(svg){
                    if(counter >= 0)
                    {
                        var data = makeData(counter);
                        counter--;
                        var rect = svg.selectAll('rect').data(data);

                        rect.enter()
                            .append('rect')
                            .attr('test', function(d,i){
                            console.log(('enter placing initial rectangle: ' +  i))
                        });

                        rect.transition().duration(500).attr('x', function(d){return d.x;})
                            .attr('y', function(d){return d.y})
                            .attr('width', function(d){return d.width})
                            .attr('height', function(d){return d.height});
                        
                        rect.exit().remove();
                    }
                };
                
                rectangles(svg);
                
                setInterval(function(){
                    rectangles(svg)
                }, 1000);
                
                function makeData(n){
                    var arr = [];
                    
                    for(var i = 0; i < n; i++){
                        arr.push({
                            x: Math.floor((Math.random() * 100) + 1),
                            y: Math.floor((Math.random() * 100) + 1),
                            width: Math.floor((Math.random() * 100) + 1),
                            height: Math.floor((Math.random() * 100) + 1)
                        });
                    }
                    
                    return arr;
                };
            }
        }
    }]);

module.exports = app;