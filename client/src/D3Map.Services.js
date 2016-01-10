var angular = require('angular');
require('./D3Map.Constants');

var app = angular.module('D3Map.Services', ['D3Map.Constants']);

app.factory('Util', function(){
    var api = {};
    
    api.isPartOf = function(child, parent){
        var element = child;
        
        while(element.parentElement != null)
        {
            if(element == parent)
            {
                return true;
            }
            
            element = element.parentElement;
        }
        
        return false;
    };
    
    return api;
});

module.exports = app;