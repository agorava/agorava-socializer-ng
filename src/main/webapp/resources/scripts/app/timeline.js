app.controller('TimelineCtrl', ['$scope', 'Social', '$q',  function ($scope, Social, $q) {
  $scope.timeline = [];

  $scope.$on('refreshTimeline', function () {
    console.log('refreshTimeline');
    $q.all([Social.twitter(), Social.facebook()]).then(function (responses) {
      console.log('data', responses);
      var twTL = responses[0];
      var fbTL = responses[1];
      console.log(twTL);
      console.log(fbTL);
      $scope.timeline = twTL.concat(fbTL);
    });
  });

  $scope.$broadcast('refreshTimeline');
}]);