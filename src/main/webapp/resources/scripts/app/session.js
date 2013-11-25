app.factory('Session', ['$rootScope', 'Social', function ($rootScope, Social) {
  var user = {},
      services = [],
      currentService;
  
  function refreshUser() {
    Social.currentUser().then(function (response) {
      console.log(response);
      $rootScope.session.user = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshServices() {
    Social.services().then(function (response) {
      console.log(response);
      $rootScope.session.services = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshCurrentService() {
    Social.currentService().then(function (response) {
      console.log(response);
      $rootScope.session.currentService = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshAll() {
    refreshUser();
    refreshServices();
    refreshCurrentService();
  }
  
  return {
    user: user,
    services: services,
    currentService: currentService,
    refreshUser: refreshUser,
    refreshServices: refreshServices,
    refreshCurrentService: refreshCurrentService,
    refreshAll: refreshAll
  };
}]);
