"use strict";

function routeFw(params) {

    var fw = {};

    var startingPath = params.startingPath || '/home';
    var contentId = params.contentId || "content";

    if (!params.routeArray || params.routeArray[0]) {
        alert("parameter object must specify array 'routeArray' with at least one element");
        return; 
    }

    var routes = params.routeArray;

    function router() {

        var path = location.hash.slice(1) || '/';
        if (!routes[path]) {
            document.getElementById(contentId).innerHTML = "<p>Error: path '" + path +
                    "' was never added to the routing.</p>";
        } else {
            routes[path](contentId);
        }
    }

    window.addEventListener('hashchange', router);

    window.location.hash = "/xxx";

    window.location.hash = startingPath;

    return fw;
}