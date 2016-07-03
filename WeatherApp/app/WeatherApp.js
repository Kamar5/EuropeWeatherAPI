var myWeatherApp = angular.module('myWeatherApp', []);

myWeatherApp.controller("HomeController",
    ['$scope', 'DataService',
    function ($scope, DataService) {
        var getWeathers = function () {
            DataService.getWeathers().then(
            function (results) {
                $scope.weathers = results.data;
            },
            function (error) {
                console.log(error);
            });
        };
        getWeathers();
        $scope.updateWeatherTable = function () {
            var c = 0;
            DataService.getWeatherFromOpenweathermap().then(
            function (results) {
                for (var i = 0; i < results.data.list.length; i++) {
                    var result = results.data.list[i];
                    var input = {
                        CityId: result.id,
                        CityName: result.name,
                        Country: result.sys.country,
                        Temp: result.main.temp,
                        Pressure: result.main.pressure,
                        Humidity: result.main.humidity,
                        Sunrise: result.sys.sunrise,
                        Sunset: result.sys.sunset,
                        Date_Time: result.dt,
                        Temp_max: result.main.temp_max,
                        Temp_min: result.main.temp_min,
                        Longitude: result.coord.lon,
                        Latitude: result.coord.lat,
                        Clouds: result.clouds.all
                    };

                    DataService.updateWeathers(input).then(
                        function (response) {
                            c++;
                            if (c === results.data.list.length) {
                                getWeathers();
                            }
                        },
                        function (error) {
                            console.log("DataService.updateWeathers(erro)");
                            console.log(error);
                        });
                }
            },
            function (error) {
                console.log(error);
            });
        }
    }]);
