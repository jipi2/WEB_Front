function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

function loadMovieInfo(movieJson)
{
    const movieInfo = JSON.parse(movieJson);

    document.getElementById("titleMovie").textContent = movieInfo.name;
    document.getElementById("descriptionMovie").textContent = movieInfo.description;
    document.getElementById("coverImg").src = movieInfo.pathImage;
    document.getElementById("trailerId").src = movieInfo.link;
}

document.addEventListener("DOMContentLoaded", function()
{
    const jwt = getCookie('jwt');
    const movieId = localStorage.getItem("movieId");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+jwt);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode:'cors',
      redirect: 'follow',
      
    };

    const url = "http://localhost:2222/api/movie/getMovie/"+movieId;
    
    fetch(url, requestOptions)
      .then(response => response.text())

      .then(result =>{
        
        loadMovieInfo(result);

      })
      .catch(error => console.log('error', error));

});