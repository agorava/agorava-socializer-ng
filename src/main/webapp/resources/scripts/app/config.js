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

    $rootScope.$on('sessionRefreshServices', function () {
      Session.refreshServices();
    });

    $rootScope.$on('sessionRefreshService', function (e, service) {
      Session.refreshService(service);
    });
    
    $rootScope.$on('sessionRefreshOAuth', function (e, session) {
      Session.refreshOAuth(session);
    });
    
    $rootScope.$on('sessionRefreshAll', function () {
      Session.refreshAll();
    });
    
    $rootScope.$emit('sessionRefreshAll');
  }]);

app.directive('autoDropdown', function () {
  return {
    restrict: 'A',
    link: function ($scope, $elem) {
      $elem.on('mouseenter', function () {
        $elem.addClass('open');
      });

      $elem.on('mouseleave', function () {
        $elem.removeClass('open');
      });
    }
  };
});
