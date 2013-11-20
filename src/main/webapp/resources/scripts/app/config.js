var app = angular.module('socializer2', ['ui.router', 'restangular'])
  .config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
  }]);
