// Dustin's Code BELOW this line--------------Itzel's code farther down below----------------------------------------------

// Get local storage items if they exist, and if not - create an empty array
if (localStorage.getItem("savedMissions") !== null) {
  // alert("!");
  var getLocalStorageMissions = localStorage.getItem("savedMissions");
  console.log(typeof getLocalStorageMissions);
  var savedMissions = getLocalStorageMissions.split(",");
  console.log(savedMissions);
} else {
  var savedMissions = [];
}
// ------------------------------

// MATERIALIZE Initiators
var siteTabs = document.querySelector(".tabs");
var tabsInstance = M.Tabs.init(siteTabs, {});

var elems = document.querySelectorAll(".sidenav");
var instances = M.Sidenav.init(elems, {});
// -----------------------


// Global Variables from LAUNCH API
// var lat;
// var long;
var descriptionOfLaunch;
var launchDayTemp;
var launchDate;
var missions;
var missionsArray = [];
var futureMissions;
var datesArray = [];
// -------------------

// LAUNCH API BASE URLS
var previousLaunchRequestURL =
  "https://lldev.thespacedevs.com/2.2.0/launch/previous/";
var futureLaunchRequestURL =
  "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=200";
// --------------------------

// GET FUTURE LAUNCHES FROM LAUNCH API
var dataID;

function storeUniqueDataID() {
  if (savedMissions.indexOf(dataID) > -1) {
    console.log("This mission already saved.");

  } else {
    savedMissions.push(dataID);
    console.log(savedMissions);
    addFavoriteToList();
    localStorage.setItem("savedMissions", savedMissions);
    console.log('ID SAVED FROM FUTURE LAUNCHES');
  }
}
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
      futureMissions = data;
      console.log("f: ");
      console.log(futureMissions.results);

    }).then(function() {
      writeFutureMissionsToDom();
    });

}
getFutureLaunches();
// ----------------------------------


function writeFutureMissionsToDom() {
  for (let i = 0; i < 98; i++) {
    console.log(futureMissions.results[i].window_start);
    // CARD CONTAINER
    var column = document.createElement("div");
    column.classList.add("col");
    column.classList.add("m4");
    column.classList.add("s12");
    column.classList.add("cardBoxes");
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
      futureMissions.results[i].window_start
    );
    cardContentDiv.appendChild(cardContentDivTextNode);

    // CREATE CARD CONTENT EXPANSION
    var cardReveal = document.createElement('div');
    cardReveal.classList.add("card-reveal");

    var cardRevealSpan = document.createElement('span');
    cardRevealSpan.classList.add("card-title");
    cardReveal.appendChild(cardRevealSpan);

    var cardRevealExitIcon = document.createElement('i');
    cardRevealExitIcon.classList.add('material-icons');
    cardRevealExitIcon.classList.add('right');
    cardRevealSpan.append(cardRevealExitIcon);

    // var closeIcon = document.createTextNode('close');
    cardRevealExitIcon.textContent = "close";
    // cardRevealSpanP.appendChild(closeIcon);

    var cardRevealSpanP = document.createElement('p');

    if (futureMissions.results[i].mission) {
      cardRevealSpanP.textContent = futureMissions.results[i].mission.description;
    }

    cardReveal.appendChild(cardRevealSpanP);

    // add CARD DIV to CARD COLUMN DIVCARD CONTAINER
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

    // CLICK HANDLER!!!!!!!!!!!!!!!!!!
    addFavoriteIcon.addEventListener("click", function () {
      // alert(this.getAttribute('data-launch-id'));
      dataID = this.getAttribute("data-launch-id");
      // console.log(dataID);
      if (this.textContent == "add") {
        this.textContent = "remove";
        storeUniqueDataID();
      } else {
        this.textContent = "add";
        savedMissions.splice(savedMissions.indexOf(dataID), 1);
        console.log(savedMissions);
        localStorage.setItem("savedMissions", savedMissions);
      }
    });
    // append card content div to CARD
    card.appendChild(cardContentDiv);
    cardContentDiv.classList.add('activator');
    card.appendChild(cardReveal);
    var timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-div");
    card.appendChild(timerDiv);

    // ADD TO DOM SECTION
    document.getElementById("nextFiveLaunchesList").append(column);
  }
}

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
  var favoriteButtons = document.querySelectorAll(".favoriteButtons");
  var clearFuture = document.querySelector(".clearFuture");
  clearFuture.replaceChildren();

  for (i = 0; i < futureMissions.results.length; i++) {

    if (savedMissions.includes(futureMissions.results[i].id)) {

      var column = document.createElement("div");
      column.classList.add("col");
      column.classList.add("s12");
      column.classList.add("m4");

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

      // CREATE MATERIALIZE ICON ahref AREA
      var cardTitleSpanLink = document.createElement("a");
      cardTitleSpanLink.classList.add("btn-floating");
      cardTitleSpanLink.classList.add("halfway-fab");
      cardTitleSpanLink.classList.add("waves-effect");
      cardTitleSpanLink.classList.add("waves-light");
      cardTitleSpanLink.classList.add("red");

      // CREATE MATERIALIZE ICON AREA
      var addFavoriteIcon = document.createElement("i");
      addFavoriteIcon.classList.add("material-icons");
      addFavoriteIcon.classList.add("favoriteButtons");
      var addFavoriteIconTextNode = document.createTextNode("remove");
      addFavoriteIcon.appendChild(addFavoriteIconTextNode);

      // CREATE CARD CONTENT DIV
      var cardContentDiv = document.createElement("div");
      cardContentDiv.classList.add("card-content");
      var cardContentDivTextNode = document.createTextNode(
        futureMissions.results[i].window_start
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

      // CREATE DIV FOR TIME IN CARD
      var timerDiv = document.createElement("div");
      timerDiv.classList.add("timer-div");
      card.appendChild(timerDiv);


      var futureMissionDate = futureMissions.results[i].window_start.split('T')[0];

      launchDate = futureMissionDate;
      console.log("start: " + launchDate);
      // datesArray.push(launchDate);
      // console.log(datesArray);


      // var weatherForecastTempDiv = document.createElement("div");
      // // weatherForecast.classList.add('weatherDiv');
      // var weatherForecastTempDivTextNode = document.createTextNode(launchDayTemp);
      // weatherForecastTempDiv.appendChild(weatherForecastTempDivTextNode);
      // card.appendChild(weatherForecastTempDiv);


      // ADD TO DOM SECTION
      document.getElementById("test3").append(column);

    } else {
    }
  }
}
setTimeout(addFavoriteToList, 3000);


// Dustin's Code ABOVE this line---------------------------------------------------------------------













// Itzel's Code BELOW this line -----------------------------------------------------------------------

// Search Launches
function displayLaunches(response) {
  var results = response.data.results;
  var searchHTML = ``;

  for (i = 0; i < Math.min(results.length, 8); i++) {
    searchHTML += launchComponent(results[i]);
  }
  //searchHTML = searchHTML + `</span>`;

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

function searchInfo() {
  var apiURL = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";
  axios.get(apiURL).then(displayLaunches);
}
//  var searchElement = document.querySelector("#searchresults");
//  searchElement.innerHTML = searchHTML;

// for ...
//    htmlText += launchComponent(array[i])
function launchComponent(launchInfo) {
  var searchHTML = `  
    <div id="search${launchInfo.id}" class="row customCard">
      <div class="col s3">
        <img class="agencyImg" src="${launchInfo.image}" /> 
      </div>
      <div class="col s5">
        <p>Company:<span>${launchInfo.launch_service_provider.name}</span></p>
        <p>Name:<span>${launchInfo.name}</span></p>
        <p>Date:<span>${launchInfo.net}</span></p>
        <p>Location:<span>${launchInfo.pad.location.name}</span></p>  
      </div>
      <div class="col s3">
        <p>Weather:<span class="weather"></span></p>
      </div> 
      <div class="col s1">
        <a href="#" class="saveBtn search-add-favorite"><i data-id="${launchInfo.id}" class="material-icons">add</i></a>
      </div>  
    </div>`;
  return searchHTML;
}
searchInfo();

// Search weather

var apiKey = "2a980a820d1b255b9609b3f0f671cc24";

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
  // var apiUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${futuredate}&appid=${apiKey}`;

  var apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${futuredate}?unitGroup=us&include=days&key=X2BCVEUMVC22RSDXLPE88U4YL&contentType=json`;
  axios.get(apiUrl).then(showWeather);
}
