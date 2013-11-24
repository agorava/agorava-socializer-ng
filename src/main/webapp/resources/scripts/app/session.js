app.factory('Session', ['$rootScope', 'Social', function ($rootScope, Social) {
  var user = {},
      oauths = [],
      currentOAuth;
  
  function refreshUser() {
    Social.currentUser().then(function (response) {
      console.log(response);
      $rootScope.session.user = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshOAuths() {
    Social.sessions().then(function (response) {
      console.log(response);
      $rootScope.session.oauths = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshOAuth() {
    Social.currentSession().then(function (response) {
      console.log(response);
      $rootScope.session.currentOAuth = response.data || {};
      console.log('new session',$rootScope.session);
    }, function (error) {
      console.log(error);
    });
  }
  
  function refreshAll() {
    refreshUser();
    refreshOAuths();
    refreshOAuth();
  }
  
  return {
    user: user,
    oauths: oauths,
    currentOAuth: currentOAuth,
    refreshUser: refreshUser,
    refreshUser: refreshOAuths,
    refreshOAuth: refreshOAuth,
    refreshAll: refreshAll
  };
}]);
