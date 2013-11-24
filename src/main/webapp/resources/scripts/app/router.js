app.config(['$locationProvider', '$routeProvider', 'Config', function($locationProvider, $routeProvider, Config) {
  $locationProvider.hashPrefix('!').html5Mode(false);
  
  $routeProvider.otherwise('/');
  
  $routeProvider
    .when('/', {
      templateUrl: Config.templatesPath + '/home.html'
    });
}]);
