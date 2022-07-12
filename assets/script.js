M.AutoInit();
var Dinstance = M.Modal.getInstance(document.querySelector("#modal1"));
// Get local storage items if they exist, and if not - create an empty array
if (localStorage.getItem("savedMissions") !== null) {
  // alert("!");
  var getLocalStorageMissions = localStorage.getItem("savedMissions");
  // console.log(typeof getLocalStorageMissions);
  var savedMissions = getLocalStorageMissions.split(",");
  // console.log(savedMissions);
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
var description;
var launchDayTemp;
var launchDate;
var missions;
var missionsArray = [];
var futureMissions;
var datesArray = [];

launchTimerArray = [];
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
    savedMissions.splice(savedMissions.indexOf(dataID), 1);
    localStorage.setItem("savedMissions", savedMissions);
    writeFutureMissionsToDom();
    addFavoriteToList();

  } else {
    savedMissions.push(dataID);
    localStorage.setItem("savedMissions", savedMissions);
    console.log("ID SAVED FROM FUTURE LAUNCHES");
    // console.log('ID SAVED FROM FUTURE LAUNCHES');
    writeFutureMissionsToDom()
    addFavoriteToList();
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
      // console.log(data);
      // console.log(futureMissions.results);
    }).then(function () {
      writeFutureMissionsToDom();
    }).then(function () {
      addFavoriteToList();
    }).then(function () {
      setInterval(handleLaunchTimers, 1000);
    });
}
getFutureLaunches();
// ----------------------------------

// Write upcoming missions to the upcoming page
function writeFutureMissionsToDom() {
  var clearNextFive = document.getElementById("nextFiveLaunchesList");
  clearNextFive.replaceChildren();
  for (let i = 0; i < 90; i++) {

    launchTimerArray.push();
    // console.log(futureMissions.results[i].window_start);
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

    if (savedMissions.indexOf(futureMissions.results[i].id) > -1) {
      // console.log("YES: " + futureMissions.results[i].id);
      var addFavoriteIconTextNode = document.createTextNode("remove");
    } else {
      // console.log("no: " + futureMissions.results[i].id);
      var addFavoriteIconTextNode = document.createTextNode("add");
    }
    addFavoriteIcon.appendChild(addFavoriteIconTextNode);

    // CREATE CARD CONTENT DIV
    var cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content");
    var cardContentDivTextNode = document.createTextNode(
      futureMissions.results[i].window_start
    );
    cardContentDiv.appendChild(cardContentDivTextNode);

    // CREATE CARD CONTENT EXPANSION
    var cardReveal = document.createElement("div");
    cardReveal.classList.add("card-reveal");

    var cardRevealSpan = document.createElement("span");
    cardRevealSpan.classList.add("card-title");
    cardReveal.appendChild(cardRevealSpan);

    var cardRevealExitIcon = document.createElement("i");
    cardRevealExitIcon.classList.add("material-icons");
    cardRevealExitIcon.classList.add("right");
    cardRevealSpan.append(cardRevealExitIcon);

    // var closeIcon = document.createTextNode('close');
    cardRevealExitIcon.textContent = "close";
    // cardRevealSpanP.appendChild(closeIcon);

    var cardRevealSpanP = document.createElement("p");

    if (futureMissions.results[i].mission) {
      cardRevealSpanP.textContent =
        futureMissions.results[i].mission.description;
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

    // CLICK HANDLER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    addFavoriteIcon.addEventListener("click", function () {
      // alert(this.getAttribute('data-launch-id'));
      dataID = this.getAttribute("data-launch-id");
      // console.log(dataID);
      if (this.textContent == "add") {
        this.textContent = "remove";
        storeUniqueDataID();
      } else {
        this.textContent = "add";
        storeUniqueDataID();
      }
    });
    //-------------------------------------------
    // append card content div to CARD
    card.appendChild(cardContentDiv);
    cardContentDiv.classList.add("activator");
    card.appendChild(cardReveal);
    var timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-div");
    card.appendChild(timerDiv);

    // ADD TO DOM SECTION
    document.getElementById("nextFiveLaunchesList").append(column);
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
          storeUniqueDataID();
        }
      });

      // append card content div to CARD
      card.appendChild(cardContentDiv);

      // CREATE DIV FOR TIME IN CARD
      var timerDiv = document.createElement("div");
      timerDiv.classList.add("timer-div");
      card.appendChild(timerDiv);

      var futureMissionDate =
        futureMissions.results[i].window_start.split("T")[0];

      // launchDate = futureMissionDate;
      // console.log("start: " + launchDate);
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

var launchTimesInSeconds = [];

function handleLaunchTimers() {

  var timerDivReady = document.querySelectorAll(".timer-div");
  timerDivReady.textContent = " ";
  for (i = 0; i < futureMissions['results'].length - 5; i++) {
    launchTimerArray.push(futureMissions.results[i].net);
  }
  for (i = 0; i < 90; i++) {
    var now = moment(),
      end = moment(launchTimerArray[i]),
      secondsUntilLaunch = end.diff(now, "seconds");
    var theDuration = moment.duration(secondsUntilLaunch, 'seconds');
    launchTimesInSeconds.push(theDuration);

    seconds = theDuration / 1000;
    minutes = seconds / 60;
    hours = minutes / 60;
    hours = hours + 5;
    days = hours / 24;

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);
    hours = Math.floor(hours);
    days = Math.floor(days);

    seconds = seconds.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    hours = hours.toString().padStart(2, "0");
    days = days.toString().padStart(2, "0");



    var theTime = days + ":" + hours + ":" + minutes + ":" + seconds;
    // console.log(theTime);

    console.log("i break: " + i);
    timerDivReady[i].innerHTML = theTime;
  }
}

// Dustin's Code ABOVE this line---------------------------------------------------------------------

// Dustin's Code ABOVE this line---------------------------------------------------------------------

// -----> Search Lauches page (Itzel's)
// Itzel's Code BELOW this line -----------------------------------------------------------------------


// Global Variables
var startDate = moment();
var endDate = moment().add(365, "days");
var companies = "";
var cities = "";

// Function to filter data by cities, companies and date

function displayLaunches(response) {
  var results = response.data.results;
  var citiesFilterHTML = `<option value="" disabled selected></option>`;
  for (i = 0; i < results.length; i++) {
    citiesFilterHTML += `<option>${results[i].pad.location.name}</option>`;
  }

  var companyFilterHTML = `<option value="" disabled selected></option>`;
  for (i = 0; i < results.length; i++) {
    companyFilterHTML += `<option>${results[i].launch_service_provider.name}</option>`;
  }

  document.querySelector("#company").innerHTML = companyFilterHTML;
  document.querySelector("#cities").innerHTML = citiesFilterHTML;

  results = results.filter(function (launch) {
    return (
      (companies == launch.launch_service_provider.name || companies == "") &&
      (cities == launch.pad.location.name || cities == "") &&
      (startDate == "" ||
        moment(launch.net).isBetween(moment(startDate), moment(endDate)))
    );
  });

  var searchHTML = ``;
  for (i = 0; i < results.length; i++) {
    searchHTML += launchComponent(results[i]);
  }
  document.querySelector("#searchresults").innerHTML = searchHTML;
  var saveLaunchHandler = function (event) {
    event.preventDefault();
    var el = event.target;
    var dataId = el.dataset.id;
    var index = savedMissions.indexOf(dataId);

    if (index == -1) {
      savedMissions.push(dataId);
      el.textContent = "remove";
    } else {
      el.textContent = "add";
      savedMissions.splice(index, 1);
    }
    localStorage.setItem("savedMissions", savedMissions);
    addFavoriteToList();
  };

  var elements = document.querySelectorAll(".search-add-favorite i");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", saveLaunchHandler);
  }

  for (i = 0; i < results.length; i++) {
    searchHTML += getWeather(results[i]);
  }
}

// Function to search launches inside API
function searchInfo() {
  var apiURL = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";
  axios.get(apiURL).then(displayLaunches);
}

//   Function to insert last launches as HTML in Search Launches page
function launchComponent(launchInfo) {
  var searchHTML = `  
    <div id="search${launchInfo.id}" class="row customCard valign-wrapper">
      <div class="col s0 m3">
        <img class="agencyImg" src="${launchInfo.image}" /> 
      </div>
      <div class="col s6 m4">
        <p>Company: <span>${launchInfo.launch_service_provider.name}</span></p>
        <p>Name: <span>${launchInfo.name}</span></p>
        <p>Date: <span>${moment(launchInfo.net).format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  )}</span></p>
        <p>Location: <span>${launchInfo.pad.location.name}</span></p>  
      </div>
      <div class="col s5 m3 customWeather">
        <p>Weather: <span class="weather"></span></p>
      </div> 
      <div class="col s1 m1 customIcon">
        <a href="#" class="saveBtn search-add-favorite"><i data-id="${launchInfo.id
    }" class="material-icons">
        ${savedMissions.indexOf(launchInfo.id) == -1 ? "add" : "remove"}
        </i></a>
      </div>
    </div>`;
  return searchHTML;
}

// Call function to show upcoming launches
searchInfo();

//// Key for weatherAPI

// var apiKey = "PNESG34KAB5WUHJM8RRPRXZY7";

//// Function to extract weather
// function getWeather(launchInfo) {
//   var date = launchInfo.net;
//   var futuredate = moment(date).format("X");
//   var lat = launchInfo.pad.latitude;
//   var lon = launchInfo.pad.longitude;

//   function showWeather(response) {
//     var weatherElement = document.querySelector(
//       "#search" + launchInfo.id + " .weather"
//     );

//     weatherElement.textContent = response.data.days[0].description;
//   }

//   var apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${futuredate}?unitGroup=us&include=days&key=${apiKey}&contentType=json`;
//   axios.get(apiUrl).then(showWeather);
// }

// Function to filter date, cities and companies
function handleFilterSearch(event) {
  event.preventDefault();
  startDate = document.querySelector("#startDate").value;
  endDate = document.querySelector("#endDate").value;
  cities = document.querySelector("#cities").value;
  companies = document.querySelector("#company").value;
  searchInfo();
}

// Btn Event listener
var findLaunch = document.querySelector("#findBtn");
findLaunch.addEventListener("click", handleFilterSearch);
