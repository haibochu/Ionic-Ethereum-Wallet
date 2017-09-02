app.controller('SettingsController', function ($scope, $rootScope, SettingsService, $filter) {

    $scope.Coins = [
        {
            id: 0,
            label: 'USD',
            simbol: '$',
        }, {
            id: 1,
            label: 'EUR',
            simbol: '€',
        }
    ];

    $scope.Languages = [
        {
            id: 'en',
            label: 'English'
        }, {
            id: 'es',
            label: 'Spanish'
        }
    ];

    var storageSetting = SettingsService.getSettings();
   
    $scope.Settings = {
        coin: filter( $scope.Coins , storageSetting.coin),
        language: filter($scope.Languages , storageSetting.language)
    };

    $scope.settingsChanged = function () {      
        SettingsService.setSettings($scope.Settings);
        $rootScope.settings = angular.copy(SettingsService.getSettings());
        apply();
    };

    function filter(list, obj) {
        var o = $filter('filter')(list, {id : obj.id}, true)[0];
        return o;
    };

    function apply() {
        try {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        } catch (err) {

        }
    };


});