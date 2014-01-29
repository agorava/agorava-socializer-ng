app.controller('TimelineCtrl', ['$scope', 'Social', '$q',  function ($scope, Social,$q) {
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