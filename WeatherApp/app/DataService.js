myWeatherApp.factory('DataService', ["$http",
    function ($http) {
        //list of cities id
        var listOfCitiesByID = [
                690791, 524901, 3183875, 2661552, 3041563, 616052, 2761369, 587084, 625144, 2800866, 3191281, 727011, 6618983, 146268, 3067696, 2618425, 588409, 658225, 2988507, 611717, 2950159, 264371, 3054643, 3413829, 2964574, 1526273, 3067696, 786714, 456172, 3042030, 593116, 2960316, 785842, 2562305, 618426, 2993458, 3193044, 6544881, 3143244, 756135, 2267057, 683506, 3168070, 792680, 3060972, 3196359, 3117735, 2673730, 323786, 2643741, 6691831
        ];
        //get the data from the back-end
        var getWeathers = function () {
            return $http.get("/Weather/GetWeather");
        };
        //get the data from Openweathermap web site
        var getWeatherFromOpenweathermap = function () {
            return $http.get('http://api.openweathermap.org/data/2.5/group?id=' + listOfCitiesByID + '&appid=ad349eecc94fdea286122c3becebd9c7&units=metric');

        };
        //send the update data to the back-end
        var updateWeathers = function (weatherInfo) {
            return $http.post("/Weather/Update", weatherInfo);
        };
        return {
            getWeathers: getWeathers,
            updateWeathers: updateWeathers,
            getWeatherFromOpenweathermap: getWeatherFromOpenweathermap

        };
    }]);