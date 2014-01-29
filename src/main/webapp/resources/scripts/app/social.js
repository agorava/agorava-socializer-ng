app.factory('Social', ['$http', 'Config', function ($http, Config) {
  return {
    all: function () { return $http.get(Config.apiPath + '/providers'); },
    currentUser: function () { return $http.get(Config.apiPath + '/users/current'); },
    startDance: function (serviceName) { return $http.get(Config.apiPath + '/providers/' + serviceName + '/startDance'); },
    services: function () { return $http.get(Config.apiPath + '/services'); },
    session: function (session) { return $http.get(Config.apiPath + '/session/' + session.id); },
    serviceSessions: function (service) { return $http.get(Config.apiPath + '/services/' + service.name + '/sessions'); },
    twitter: function () { return $http.get(Config.apiPath + '/twitter/timeline'); },
    facebook: function() { return $http.get(Config.apiPath + '/facebook/timeline'); }
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

  $scope.refreshService = function (service) {
    $scope.session.refreshService(service);
  };

  $scope.refreshSession = function (session) {
    $scope.session.refreshOAuth(session);
  };
}]);
