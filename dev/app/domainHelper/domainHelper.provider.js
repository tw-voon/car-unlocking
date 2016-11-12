angular.module('vowolita.domainHelper.provider', [])

.provider('DomainHelper', provider);

function provider() {
    var domain, apiUrl;
    return {
        setDomain: setDomain,
        setApiPath: setApiPath,
        $get: function() {
            return {
                domainUrl: domain,
                apiUrl: apiUrl
            };
        }
    };

    function setDomain(value) {
        domain = value;
    }

    function setApiPath(value) {
        apiUrl = domain + value;
    }
}