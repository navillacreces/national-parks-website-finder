const myApiKey = "";

const searchURLBase = "https://developer.nps.gov/api/v1/parks";


function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    
    const state1 = $('#drop-down1 option:selected').val();
    const state2 = $('#drop-down2 option:selected').val();
    const state3 = $('#drop-down3 option:selected').val();
    const maxResults = $('#js-max-results').val();
    
    callParkAPI(state1,state2,state3,maxResults);
  });
}

function callParkAPI(state1,state2,state3,numOfResults){


  if (state2 !== "" && state3 !== ""){
    state1 = state1 + "," + state2 + "," + state3;
  } else if (state2 !== ""){
    state1 = state1 + "," + state2;
  }

  const myKeyObj = {
    
    stateCode : state1,
    limit: numOfResults,
    api_key : myApiKey,
    
  };


  const theQueryString = formatQueryParams(myKeyObj);

  const url = searchURLBase + '?' + theQueryString;
  console.log(url);
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })      
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  
}

function displayResults(responseJsonObj){
 
  $("#myList").empty();

  for (z = 0; z < 11; z++){
   
    
   $("#myList").append(`<li class="list-element"> 
   <p>${responseJsonObj.data[z].fullName}</p>
   <p>${responseJsonObj.data[z].designation}</p>
   <p><a href="${responseJsonObj.data[z].url}
   ">${responseJsonObj.data[z].url}</a></p>
   </li>`);
  }

  
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function runTheApp(){
  watchForm();
}
$(runTheApp);