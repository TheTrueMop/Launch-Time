// Weather API Endpoints
// There are four web service endpoints available:

// /timeline – provides continuous weather data from historical observations, weather forecast and future statistical forecast based on previous conditions.
// /forecast – provides access to up to 15-days of weather forecast information
// /history – provides access to hourly and daily historical weather records
// /historysummary – provides access to historical weather reports and processed information

// var weatherBaseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/";
var today = moment().format();

// console.log(today);

var savedMissions = [];

var weatherAppid = "&key=X2BCVEUMVC22RSDXLPE88U4YL";

var siteTabs = document.querySelector(".tabs");
var tabsInstance = M.Tabs.init(siteTabs, {});

var elems = document.querySelectorAll(".sidenav");
var instances = M.Sidenav.init(elems, {});

var lat;
var long;
var description;

var launchDayTemp;
var launchDate = "2022-07-01";

var missions;
var missionsArray = [];

var futureMissions;
var previousLaunchRequestURL =
  "https://lldev.thespacedevs.com/2.2.0/launch/previous/";
var futureLaunchRequestURL =
  "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";

// function getPreviousLaunches() {
//   fetch(previousLaunchRequestURL, {
//     method: "GET", //GET is the default.
//     credentials: "same-origin", // include, *same-origin, omit
//     redirect: "follow", // manual, *follow, error
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       missionsArray.push(JSON.stringify(data));
//       missions = JSON.parse(missionsArray);
//       console.log(missions);

//       for (let i = 0; i < 8; i++) {
//         // CARD CONTAINER
//         var column = document.createElement("div");
//         column.classList.add("col");
//         column.classList.add("s12");
//         column.classList.add("m6");
//         // CARD DIV
//         var card = document.createElement("div");
//         card.classList.add("card");
//         card.classList.add("agencyImage");
//         // CARD IMAGE DIV
//         var cardImage = document.createElement("div");
//         cardImage.classList.add("card-image");
//         // CARD IMG TAG
//         var cardImageURL = document.createElement("img");
//         cardImageURL.src = missions.results[i].image;
//         // CREATE CARD TITLE SPAN
//         var cardTitleSpan = document.createElement("span");
//         cardTitleSpan.classList.add("card-title");
//         // CREATE TEXT NODE FOR CARD TITLE
//         var cardTitleTextNode = document.createTextNode(
//           missions.results[i].name
//         );

//         // CREATE ICON ahref AREA
//         var cardTitleSpanLink = document.createElement("a");
//         cardTitleSpanLink.classList.add("btn-floating");
//         cardTitleSpanLink.classList.add("halfway-fab");
//         cardTitleSpanLink.classList.add("waves-effect");
//         cardTitleSpanLink.classList.add("waves-light");
//         cardTitleSpanLink.classList.add("red");

//         var addFavoriteIcon = document.createElement("i");
//         addFavoriteIcon.classList.add("material-icons");
//         var addFavoriteIconTextNode = document.createTextNode("add");
//         addFavoriteIcon.appendChild(addFavoriteIconTextNode);

//         // CREATE CARD CONTENT DIV
//         var cardContentDiv = document.createElement("div");
//         cardContentDiv.classList.add("card-content");
//         var cardContentDivTextNode = document.createTextNode(
//           missions.results[i].mission.description
//         );
//         cardContentDiv.appendChild(cardContentDivTextNode);

//         // add CARD DIV to CARD COLUMN DIV
//         column.appendChild(card);
//         // add IMG DIV
//         card.appendChild(cardImage);
//         // add IMG TAG
//         cardImage.appendChild(cardImageURL);
//         // APPEND CARD TITLE
//         cardImage.appendChild(cardTitleSpan);

//         cardTitleSpan.appendChild(cardTitleTextNode);
//         // // append a icon div
//         // cardImage.appendChild(cardTitleSpanLink);
//         // // append text to trigger icon to i element
//         cardTitleSpanLink.appendChild(addFavoriteIcon);
//         // append card content div to CARD
//         card.appendChild(cardContentDiv);

//         // ADD TO DOM SECTION
//         document.getElementById("lastFiveLaunchesList").append(column);
//       }
//     });
// // }
// getPreviousLaunches();

function getFutureLaunches() {
  fetch(futureLaunchRequestURL, {
    method: "GET", //GET is the default.
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Future:");
      console.log(data);
      futureMissions = data;
      for (let i = 0; i < 8; i++) {
        // CARD CONTAINER
        var column = document.createElement("div");

        column.classList.add("col");
        column.classList.add("s3");
        column.classList.add("m3");
        // CARD DIV
        var card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("agencyImage");
        // CARD IMAGE DIV
        var cardImage = document.createElement("div");
        cardImage.classList.add("card-image");
        // CARD IMG TAG
        var cardImageURL = document.createElement("img");
        cardImageURL.src = futureMissions.results[i].image;
        // CREATE CARD TITLE SPAN
        var cardTitleSpan = document.createElement("span");
        cardTitleSpan.classList.add("card-title");
        // CREATE TEXT NODE FOR CARD TITLE
        var cardTitleTextNode = document.createTextNode(
          futureMissions.results[i].name
        );

        // CREATE ICON ahref AREA
        var cardTitleSpanLink = document.createElement("a");
        cardTitleSpanLink.classList.add("btn-floating");
        cardTitleSpanLink.classList.add("halfway-fab");
        cardTitleSpanLink.classList.add("waves-effect");
        cardTitleSpanLink.classList.add("waves-light");
        cardTitleSpanLink.classList.add("red");

        var addFavoriteIcon = document.createElement("i");
        addFavoriteIcon.classList.add("material-icons");
        addFavoriteIcon.classList.add("favoriteButtons");
        var addFavoriteIconTextNode = document.createTextNode("add");
        addFavoriteIcon.appendChild(addFavoriteIconTextNode);

        // CREATE CARD CONTENT DIV
        var cardContentDiv = document.createElement("div");
        cardContentDiv.classList.add("card-content");
        var cardContentDivTextNode = document.createTextNode(
          futureMissions.results[i].pad.location.name
        );
        cardContentDiv.appendChild(cardContentDivTextNode);
        //var cardContentDivTextNode = document.createTextNode(
        //  futureMissions.results[i].mission.description
        //);
        //cardContentDiv.appendChild(cardContentDivTextNode);

        // add CARD DIV to CARD COLUMN DIV
        column.appendChild(card);
        // add IMG DIV
        card.appendChild(cardImage);
        // add IMG TAG
        cardImage.appendChild(cardImageURL);
        // APPEND CARD TITLE
        cardImage.appendChild(cardTitleSpan);

        cardTitleSpan.appendChild(cardTitleTextNode);
        // append a icon div
        cardImage.appendChild(cardTitleSpanLink);
        // append text to trigger icon to i element
        cardTitleSpanLink.appendChild(addFavoriteIcon);
        addFavoriteIcon.setAttribute(
          "data-launch-id",
          futureMissions.results[i].id
        );

        addFavoriteIcon.addEventListener("click", function () {
          // alert(this.getAttribute('data-launch-id'));

          var dataID = this.getAttribute("data-launch-id");
          console.log(dataID);

          function storeUniqueDataID() {
            if (savedMissions.indexOf(dataID) > -1) {
              console.log("This mission already saved.");
            } else {
              savedMissions.push(dataID);
              console.log(savedMissions);
              addFavoriteToList();
            }
          }
          storeUniqueDataID();
        });

        // append card content div to CARD
        card.appendChild(cardContentDiv);

        var timerDiv = document.createElement("div");
        timerDiv.classList.add("timer-div");
        card.appendChild(timerDiv);

        document.getElementById("nextFiveLaunchesList").append(column);
      }
    });
}
getFutureLaunches();

// function weatherForecast() {
//   var weatherBaseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${long}/${launchDate}?unitGroup=us&include=days&key=X2BCVEUMVC22RSDXLPE88U4YL&contentType=json`;
//   fetch(weatherBaseURL, {
//     method: "GET", //GET is the default.
//     credentials: "same-origin", // include, *same-origin, omit
//     redirect: "follow", // manual, *follow, error
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       var theWeather = data;
//       launchDayTemp = data.days[0].temp;
//       console.log("Weather:");
//       console.log(launchDayTemp);
//     });
// }

const missionTimerInterval = setInterval(missionTimer, 1000);

function missionTimer() {
  // console.log(today);
  var now = moment().format("MMMM Do YYYY, h:mm:ss a");
  var timerDivReady = document.querySelectorAll(".timer-div");
  timerDivReady.textContent = " ";

  // var timerLocation = document.createElement('p');
  // var timerLocationTextNode = document.createTextNode(today);
  // timerLocation.textContent = today;
  for (i = 0; i < timerDivReady.length; i++) {
    // console.log(today);
    timerDivReady[i].textContent = now;
  }
}

function addFavoriteToList() {
  document.getElementById("test3").innerHTML = "";

  for (i = 0; i < futureMissions.results.length; i++) {
    var mission = futureMissions.results[i];
    if (savedMissions.indexOf(mission.id) !== -1) {
      // CARD CONTAINER
      var column = document.createElement("div");
      column.classList.add("col");
      column.classList.add("s3");
      column.classList.add("m3");
      // CARD DIV
      var card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("agencyImage");
      // CARD IMAGE DIV
      var cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      // CARD IMG TAG
      var cardImageURL = document.createElement("img");
      cardImageURL.src = futureMissions.results[i].image;
      // CREATE CARD TITLE SPAN
      var cardTitleSpan = document.createElement("span");
      cardTitleSpan.classList.add("card-title");
      // CREATE TEXT NODE FOR CARD TITLE
      var cardTitleTextNode = document.createTextNode(
        futureMissions.results[i].name
      );

      // CREATE ICON ahref AREA
      var cardTitleSpanLink = document.createElement("a");
      cardTitleSpanLink.classList.add("btn-floating");
      cardTitleSpanLink.classList.add("halfway-fab");
      cardTitleSpanLink.classList.add("waves-effect");
      cardTitleSpanLink.classList.add("waves-light");
      cardTitleSpanLink.classList.add("red");

      var addFavoriteIcon = document.createElement("i");
      addFavoriteIcon.classList.add("material-icons");
      addFavoriteIcon.classList.add("favoriteButtons");
      var addFavoriteIconTextNode = document.createTextNode("remove");
      addFavoriteIcon.appendChild(addFavoriteIconTextNode);

      // CREATE CARD CONTENT DIV
      var cardContentDiv = document.createElement("div");
      cardContentDiv.classList.add("card-content");
      var cardContentDivTextNode = document.createTextNode(
        futureMissions.results[i].mission.description
      );
      cardContentDiv.appendChild(cardContentDivTextNode);

      // add CARD DIV to CARD COLUMN DIV
      column.appendChild(card);
      // add IMG DIV
      card.appendChild(cardImage);
      // add IMG TAG
      cardImage.appendChild(cardImageURL);
      // APPEND CARD TITLE
      cardImage.appendChild(cardTitleSpan);

      cardTitleSpan.appendChild(cardTitleTextNode);
      // append a icon div
      cardImage.appendChild(cardTitleSpanLink);
      // append text to trigger icon to i element
      cardTitleSpanLink.appendChild(addFavoriteIcon);
      addFavoriteIcon.setAttribute(
        "data-launch-id",
        futureMissions.results[i].id
      );

      // append card content div to CARD
      card.appendChild(cardContentDiv);

      var timerDiv = document.createElement("div");
      timerDiv.classList.add("timer-div");
      card.appendChild(timerDiv);

      // ADD TO DOM SECTION
      document.getElementById("test3").append(column);
    }
  }
}

// -----> Search Lauches section (Itzel's)

var startDate = moment();
var endDate = moment().add(365, "days");

// Funtion to search upcoming 8 Launches
function displayLaunches(response) {
  var results = response.data.results.filter(function (launch) {
    return moment(launch.net).isBetween(startDate, endDate);
  });
  var searchHTML = ``;
  for (i = 0; i < Math.min(results.length, 8); i++) {
    searchHTML += launchComponent(results[i]);
  }
  document.querySelector("#searchresults").innerHTML = searchHTML;
  var saveLaunchHandler = function (event) {
    var dataId = event.target.dataset.id;
    if (savedMissions.indexOf(dataId) == -1) {
      savedMissions.push(dataId);
      
      addFavoriteToList();
    }
  };

  
  var elements = document.querySelectorAll(".search-add-favorite");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", saveLaunchHandler);
  }

  for (i = 0; i < Math.min(results.length, 8); i++) {
    searchHTML += getWeather(results[i]);
  }
}

// Function to search Info inside API with Axios
function searchInfo() {
  var apiURL = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";
  axios.get(apiURL).then(displayLaunches);
}

// Function to display future launches in HTML
function launchComponent(launchInfo) {
  var searchHTML = `  
    <div id="search${launchInfo.id}" class="row customCard valign-wrapper">
      <div class="col s3">
        <img class="agencyImg" src="${launchInfo.image}" /> 
      </div>
      <div class="col s4">
        <p>Company: <span>${launchInfo.launch_service_provider.name}</span></p>
        <p>Name: <span>${launchInfo.name}</span></p>
        <p>Date: <span>${moment(launchInfo.net).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        )}</span></p>
        <p>Location: <span>${launchInfo.pad.location.name}</span></p>  
      </div>
      <div class="col s3 customWeather">
        <p>Weather: <span class="weather"></span></p>
      </div> 
      <div class="col s1 customIcon">
        <a href="#" class="saveBtn search-add-favorite"><i data-id="${
          launchInfo.id
        }" class="material-icons">add</i></a>
      </div>
    </div>`;
  return searchHTML;
}

// Call to show 8 upcoming launches
searchInfo();

// Function to get Weather
function getWeather(launchInfo) {
  var date = launchInfo.net;
  var futuredate = moment(date).format("X");
  var lat = launchInfo.pad.latitude;
  var lon = launchInfo.pad.longitude;

  function showWeather(response) {
    console.log(response);

    var weatherElement = document.querySelector(
      "#search" + launchInfo.id + " .weather"
    );

    weatherElement.textContent = response.data.days[0].description;
  }
  var apiUrlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${futuredate}?unitGroup=us&include=days&key=X2BCVEUMVC22RSDXLPE88U4YL&contentType=json`;
  axios.get(apiUrlWeather).then(showWeather);
}

// Function to filter date
function handleFilterSearch(event) {
  event.preventDefault();
  startDate = moment(document.querySelector("#startDate").value);
  endDate = moment(document.querySelector("#endDate").value);
  searchInfo();
}

// Btn Event listener
var findLaunch = document.querySelector("#findBtn");
findLaunch.addEventListener("click", handleFilterSearch);
