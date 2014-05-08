/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'reponderous.home', [
  'ui.router',
  'plusOne',
  'app.services'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  })
  .state('home.search', {
    views: {
        "homelist": {
            templateUrl: 'home/home.search.tpl.html'
        }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ['$scope', 'RepoList', '$q', '$state', function HomeController( $scope, RepoList, $q, $state ) {
    $state.transitionTo('home.search');
    //console.log(RepoList.eventTypes);
    var getRepos = RepoList.userStarredRepos().then(function(response) {
            console.log('userstarredrepo', response.data);
            $scope.rawRepoData = response.data;
        }),
        getPopRepos = RepoList.popularRepos('javascript').then(function(response) {
            console.log('popularRepos', response.data);
            $scope.rawPopRepoData = response.data.items;
        }),
        getUserRepos = RepoList.userRepos().then(function(response) {
            console.log('user', response.data.items);
            $scope.rawUserRepoData = response.data.items;
        });

    $scope.allInitsLoaded = $q.all([getRepos, getPopRepos, getUserRepos]).then(function () {
        console.log('done');
    });

    $scope.username = "joeoravec";
}])

.controller( 'RepoItemCtrl', ['$scope', 'RepoList', '$q', function HomeController( $scope, RepoList, $q ) {
    //console.log(RepoList.eventTypes);
    $scope.showIssues = false;

    $scope.showIssueList = function () {
        console.log($scope.repo.full_name);
        $scope.showIssues = !$scope.showIssues;
    };
}])

.controller( 'RepoIssueListCtrl', ['$scope', 'RepoList', '$q', function HomeController( $scope, RepoList, $q ) {
    //console.log(RepoList.eventTypes);
    $scope.issuesList = [];

    var getIssues = RepoList.issuesList($scope.repo.full_name);

    getIssues.then(function (response) {
        console.log(response);
        $scope.issuesList = response.data.items;
    });
}])

;

