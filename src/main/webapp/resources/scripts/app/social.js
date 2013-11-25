app.factory('Social', ['$http', 'Config', function ($http, Config) {
  return {
    all: function () { return $http.get(Config.apiPath + '/providers'); },
    currentUser: function () { return $http.get(Config.apiPath + '/users/current'); },
    startDance: function (serviceName) { return $http.get(Config.apiPath + '/providers/' + serviceName + '/startDance'); },
    sessions: function () { return $http.get(Config.apiPath + '/sessions'); },
    currentSession: function () { return $http.get(Config.apiPath + '/sessions/current'); },
    services: function () { return $http.get(Config.apiPath + '/services'); },
    currentService: function () { return $http.get(Config.apiPath + '/services/current'); }
  };
}]);

app.controller('SocialCtrl', ['$scope', '$location', 'Social', function ($scope, $location, Social) {
  $scope.startDance = function (service) {
    Social.startDance(service.name).then(function (response) {
      var url = response.data;
      console.log(url);
      window.open(url, service.name + ' OAuth','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=400,height=400,modal=yes');
    });
  };
  
  $scope.selectService = function (service) {
    console.log('select', service);
  };
}]);
