angular
    .module('vowolita.storage.service', [])
    .factory('StorageService', service);

function service($window) {
    var service = {
        get: get,
        set: set,
        setObject: setObject,
        getObject: getObject,
        setToObject: setToObject,
        getToObject: getToObject,
        removeItem: removeItem
    };

    return service;
    /////////////////////

    function get(key) {
        return $window.localStorage[key];
    }

    function set(key, val) {
        $window.localStorage[key] = val;
    }

    function setObject(key, val) {
        $window.localStorage[key] = JSON.stringify(val);
    }

    function getObject(key) {
        return JSON.parse($window.localStorage[key] || '{}');
    }

    function setToObject(key, subkey, val) {
        var data = getObject(key);

        data[subkey] = val;

        setObject(key, data);
    }

    function getToObject(key, subkey) {
        var data = getObject(key);
        return data[subkey];
    }

    function removeItem(key){
        $window.localStorage.removeItem(key);
    }

    function setAuthToken(value) {
        set(authTokenKey, value);
    }
}