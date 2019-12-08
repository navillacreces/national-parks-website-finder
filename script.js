
const myApiKey = "";

const searchURLBase = "https://developer.nps.gov/api/v1/parks";

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    
    const value = $('option:selected').val();
    const maxResults = $('#js-max-results').val();
    
    callParkAPI(value, maxResults);
  });
}

function callParkAPI(state,numOfResults){

  const myKeyObj = {
    
    stateCode : state,
    limit: numOfResults,
    api_key : myApiKey,

  };

  const theQueryString = formatQueryParams(myKeyObj);

  const url = searchURLBase + '?' + theQueryString;
  

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