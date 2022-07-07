var appid = '&key=X2BCVEUMVC22RSDXLPE88U4YL';

// var requestURL = 'https://api.spacexdata.com/v4/rockets/5e9d0d95eda69955f709d1eb';

var previousLaunchRequestURL = "https://lldev.thespacedevs.com/2.2.0/launch/previous/?limit=200&offset=30"

function getPreviousLaunches() {
    fetch(previousLaunchRequestURL, {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
    })
    .then(function (response) {
    return response.json();
    }).then(function(data) {
    console.log(data);
    });
}
getPreviousLaunches();
