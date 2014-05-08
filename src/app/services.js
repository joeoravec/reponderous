//SERVICES MODULE

(function (angular) {
    'use strict';

    //var service = angular.module('amApp.common.ajax', []);

    var services = angular.module('app.services', []);

    services.factory('RepoAjax', ['$http', function($http) {
        return {
            get : function(url) {
                return $http.get(url);
            },
            post: function(url, data) {
                return $http.post(url, data);
            }
        };
    }]);

    services.service('TestConfig', [function () {
        this.config = {
            1: {desc: 'video', type: 'asset', title: 'Video'},
            2: {desc: 'banner', type: 'asset', title: 'Banner'},
            3: {desc: 'adml', type: 'asset', title: 'Adml'},
            4: {desc: 'thirdPartyImp', type: 'pixel', pixelTypeId: 1, title: 'Third Party Impression Pixels'},
            5: {desc: 'events', type: 'pixel', pixelTypeId: 2, title: 'Events'},
            6: {desc: 'demo', type: 'pixel', pixelTypeId: 3, title: 'Demo'},
            7: {desc: 'study', type: 'pixel', pixelTypeId: 4, title: 'Study'}
        };
    }]);

    services.factory('RepoList', ['$http', 'RepoAjax', function($http, RepoAjax) {
        var repoListing = {
            allVendors: [{ id: 1, third_party_type_id: [1,2], name: 'Atlas', secure_strict: false },
                { id: 2, third_party_type_id: [1,2], name: 'Cadrean', secure_strict: false },
                { id: 3, third_party_type_id: [1,2], name: 'Convertro', secure_strict: false },
                { id: 4, third_party_type_id: [1,2], name: 'DART', secure_strict: false },
                { id: 5, third_party_type_id: [1,2], name: 'DoubleVerify', secure_strict: false },
                { id: 6, third_party_type_id: [1,2], name: 'Innovid', secure_strict: false },
                { id: 7, third_party_type_id: [1,2], name: 'MediaMind', secure_strict: false },
                { id: 8, third_party_type_id: [1,2], name: 'MIG', secure_strict: false },
                { id: 9, third_party_type_id: [1,2], name: 'PointRoll', secure_strict: false },
                { id: 10, third_party_type_id: [1,2], name: 'Telemetry', secure_strict: false },
                { id: 11, third_party_type_id: [1,2], name: 'TrueEffect', secure_strict: false },
                { id: 12, third_party_type_id: [1,2], name: 'VisualIQ', secure_strict: false },
                { id: 13, third_party_type_id: [1,2], name: 'Evidon', secure_strict: false },
                { id: 14, third_party_type_id: [1,2], name: 'TRUSTe', secure_strict: false },
                { id: 15, third_party_type_id: [3], name: 'comScore', secure_strict: false },
                { id: 16, third_party_type_id: [3], name: 'Nielsen', secure_strict: false },
                { id: 17, third_party_type_id: [4], name: 'AdExpose', secure_strict: false },
                { id: 18, third_party_type_id: [4], name: 'AdSafe', secure_strict: false },
                { id: 19, third_party_type_id: [], name: 'Dimestore', secure_strict: false },
                { id: 20, third_party_type_id: [], name: 'DynamicLogic', secure_strict: false },
                { id: 21, third_party_type_id: [], name: 'InsightExpress', secure_strict: false },
                { id: 22, third_party_type_id: [], name: 'Quantcast', secure_strict: false },
                { id: 23, third_party_type_id: [], name: 'SafeCount', secure_strict: false },
                { id: 24, third_party_type_id: [1], name: 'Vizu', secure_strict: false }],
            allEvents: [{ id: 12, name: 'start', tracking_events_type_id: 1 },
                { id: 13, name: 'firstQuartile', tracking_events_type_id: 1 },
                { id: 14, name: 'midPoint', tracking_events_type_id: 1 },
                { id: 15, name: 'thirdQuartile', tracking_events_type_id: 1 },
                { id: 16, name: 'complete', tracking_events_type_id: 1 },
                { id: 17, name: 'mute', tracking_events_type_id: 3 },
                { id: 18, name: 'unmute', tracking_events_type_id: 3 },
                { id: 19, name: 'pause', tracking_events_type_id: 3 },
                { id: 20, name: 'rewind', tracking_events_type_id: 3 },
                { id: 21, name: 'resume', tracking_events_type_id: 3 },
                { id: 22, name: 'fullscreen', tracking_events_type_id: 3 },
                { id: 23, name: 'expand', tracking_events_type_id: 3 },
                { id: 24, name: 'collapse', tracking_events_type_id: 3 },
                { id: 27, name: 'close', tracking_events_type_id: 3 },
                { id: 41, name: 'skip', tracking_events_type_id: 1 },
                { id: 42, name: 'Impression', tracking_events_type_id: 5 },
                { id: 98, name: 'click', tracking_events_type_id: 2 },
                { id: 103, name: 'custom', tracking_events_type_id: 4 }],
            allEventTypes: [{ id: 1, name: 'Time Spent' },
                { id: 2, name: 'Clickthrough' },
                { id: 3, name: 'Engagement' },
                { id: 4, name: 'Custom' },
                { id: 5, name: 'Billable' }],
            userStarredRepos: function () {
                // Send the creative model to the server to save. creative.id will be 0 for new creatives.
                // Return the creative, including the id.
                var url = 'https://api.github.com/users/joeoravec/starred?page=1&per_page=20';

                return RepoAjax.get(url);
            },
            userRepos: function () {
                var url = 'https://api.github.com/search/repositories?q=+user:joeoravec&sort=stars&order=desc';

                return RepoAjax.get(url);
            },
            popularRepos: function (lang) {
                var url = 'https://api.github.com/search/repositories?q=+language:'+lang+'&sort=stars&order=desc';
                return RepoAjax.get(url);
            },
            issuesList: function (repoFullName) {
                var url = 'https://api.github.com/search/issues?q=+repo:' + repoFullName + '+state:open';
                return RepoAjax.get(url);
            }
        };

        return {
            vendors: repoListing.allVendors,
            events: repoListing.allEvents,
            eventTypes: repoListing.allEventTypes,
            userRepos: repoListing.userRepos,
            userStarredRepos: repoListing.userStarredRepos,
            popularRepos: repoListing.popularRepos,
            issuesList: repoListing.issuesList

        };
    }]);

})(angular);