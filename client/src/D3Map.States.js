var angular = require('angular');
require('angular-ui-router');

var app = angular.module('D3Map.States', ['ui.router'])
	.value('API', 'api_key')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
			.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				abstract: true,
				templateUrl: 'src/templates/Home.htm',
				controller: 'HomeCtrl',
				controllerAs: 'home',
				data: {
					requiresLogin: false
				}
			})
			.state('home.app', {
				url: '',
				views: {
                    'd3basics' : {
                        templateUrl: 'src/templates/D3Basics.htm'
                    },
                    'basicmap': {
                        templateUrl: 'src/templates/BasicMap.htm'
                    },
                    'interactivemap': {
                        templateUrl: 'src/templates/InteractiveMap.htm'
                    }
				}
			})
}]);
module.exports = app;