app.controller('TimelineCtrl', ['$scope', 'Social', function ($scope, Social) {
  $scope.timeline = [];

  $scope.$on('refreshTimeline', function () {
    console.log('refreshTimeline');
    Social.twitter().then(function (response) {
      console.log('data', response);
      $scope.timeline = response.data;
    });
  });

  $scope.$broadcast('refreshTimeline');
}]);