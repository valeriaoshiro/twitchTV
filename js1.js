//array of channels from Twitch
var channelsArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "bobross", "monstercat", "comster404", "Ziqoftw"];
//dom elements
var elAllButton = document.getElementById("allButton");
var elOnlineButton = document.getElementById("onlineButton");
var elOfflineButton = document.getElementById("offlineButton");
var elAllDivs = document.getElementsByTagName("div");
var elContainer = document.getElementById("container");

function init(){
  //get Twitch API for each channel from the array. Call writeData to change the DOM
  channelsArray.forEach(function(val){
    $.getJSON("https://api.twitch.tv/kraken/channels/" + val + "?client_id=7322vrobd9oe59n66mbqam66wm5bavc&callback=?", writeData, false);
  });
  //event listeners for the 3 buttons
  elAllButton.addEventListener("click", allClicked, false);
  elOnlineButton.addEventListener("click", onlineClicked, false);
  elOfflineButton.addEventListener("click", offlineClicked, false);
}

//write the data from Twitch API to HTML
function writeData(data){
  //check if no channel exists
  if(data.error) {  
    var newDiv = document.createElement("div");
    newDiv.textContent = data.message;
    newDiv.setAttribute("class", "doesntExist");
    elContainer.appendChild(newDiv);
  } 
  //else if channel exists
  else { 
    var newDiv = document.createElement("div");
    //create channel's logo
    var newImg = document.createElement("img");
    newImg.setAttribute("src", data.logo);
    newDiv.appendChild(newImg);
    //create link of channel
    var newA = document.createElement("a");
    newA.textContent = data.display_name;
    newA.setAttribute("href", data.url);
    newA.setAttribute("target", "_blank");
    newDiv.appendChild(newA);
    //create description: offline or description of live stream
    var newP = document.createElement("p");
    $.getJSON("https://api.twitch.tv/kraken/streams/" + data.display_name + "?client_id=7322vrobd9oe59n66mbqam66wm5bavc&callback=?", function(d){
      if(d.stream === null){
        newP.textContent = "Offline";
        newDiv.setAttribute("class", "offline");
      }
      else {
        newP.textContent = data.status;
        newDiv.setAttribute("class", "online");
      }
    }, false);
    newDiv.appendChild(newP);
    elContainer.appendChild(newDiv);
  }
}

//when all button is pressed, it shows all the channels
function allClicked(event){
  event.preventDefault();
  for(var i = 0; i < elAllDivs.length; i++){
    elAllDivs[i].style.display = "flex";
  }
  this.style.backgroundColor = "#FFAA91";
  elOnlineButton.style.backgroundColor = "#fedcd2";
  elOfflineButton.style.backgroundColor = "#fedcd2";
}

//when online button is pressed, it shows only online channels
function onlineClicked(event){
  event.preventDefault();
  for(var i = 0; i < elAllDivs.length; i++){
    if((elAllDivs[i].className === "offline") || (elAllDivs[i].className === "doesntExist")){
      elAllDivs[i].style.display = "none";
    }
    else {
      elAllDivs[i].style.display = "flex";
    }
  }
  this.style.backgroundColor = "#FFAA91";
  elAllButton.style.backgroundColor = "#fedcd2";
  elOfflineButton.style.backgroundColor = "#fedcd2";
}

//when offline button is pressed, it shows all offline channels
function offlineClicked(event){
  event.preventDefault();
  for(var i = 0; i < elAllDivs.length; i++){
    if((elAllDivs[i].className === "online") || (elAllDivs[i].className === "doesntExist")){
      elAllDivs[i].style.display = "none";
    }
    else {
      elAllDivs[i].style.display = "flex";
    }
  }
  this.style.backgroundColor = "#FFAA91";
  elOnlineButton.style.backgroundColor = "#fedcd2";
  elAllButton.style.backgroundColor = "#fedcd2";
}


//executes when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function(event) {
    init();
});