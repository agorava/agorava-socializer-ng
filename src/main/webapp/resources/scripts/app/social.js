app.factory('Social', ['$http', 'Config', function ($http, Config) {
  return {
    all: function () { return $http.get(Config.apiPath + '/providers'); },
    currentUser: function () { return $http.get(Config.apiPath + '/users/current'); },
    startDance: function (providerName) { return $http.get(Config.apiPath + '/providers/' + providerName + '/startDance'); },
    sessions: function () { return $http.get(Config.apiPath + '/sessions'); },
    currentSession: function () { return $http.get(Config.apiPath + '/sessions/current'); }
  };
}]);

app.controller('ProvidersCtrl', ['$scope', '$location', 'Social', function ($scope, $location, Social) {
  Social.all().then(function (response) {
    $scope.providers = response.data;
  });
  
  $scope.startDance = function (providerName) {
    Social.startDance(providerName).then(function (response) {
      var url = response.data;
      console.log(url);
      window.open(url, providerName + ' OAuth','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=400,height=400,modal=yes');
    });
  };
}]);
