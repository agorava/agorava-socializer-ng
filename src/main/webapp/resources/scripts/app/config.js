var app = angular.module('socializer2', ['ngRoute', 'ngResource'])
  .constant('Config', {
    apiPath: '/agorava-socializer-20/api',
    templatesPath: 'resources/templates'
  })
  .run(['$rootScope', 'Session', function ($rootScope, Session) {
    console.log(Session);
    $rootScope.session = Session;
    
    $rootScope.$on('sessionRefreshUser', function () {
      Session.refreshUser();
    });
    
    $rootScope.$on('sessionRefreshOAuths', function () {
      Session.refreshOAuths();
    });
    
    $rootScope.$on('sessionRefreshOAuth', function () {
      Session.refreshOAuths();
    });
    
    $rootScope.$on('sessionRefreshAll', function () {
      Session.refreshAll();
    });
    
    $rootScope.$emit('sessionRefreshAll');
  }]);