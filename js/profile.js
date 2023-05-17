function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}


function loadGrid(movieJSON, grid_id)
{
  const moviesVector = JSON.parse(movieJSON);
  const container = document.getElementById(grid_id);
  for (let movie of moviesVector)
  {
    const anchor = document.createElement("a");
    anchor.href = "review.html";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    anchor.appendChild(movieCard);

    const cardHead = document.createElement("div");
    cardHead.classList.add("card-head");

    const img = document.createElement("img");
    img.src = movie.pathImage;
    img.alt = "";
    img.classList.add("card-img");

    const cardOverlay = document.createElement("div");
    cardOverlay.classList.add("card-overlay");

    const xsignDiv = document.createElement("div");
    xsignDiv.classList.add("xsign");

    const xsignIcon = document.createElement("i");
    xsignIcon.classList.add("fa", "fa-times");
    xsignIcon.setAttribute("aria-hidden", "true");

    xsignDiv.appendChild(xsignIcon);

    const rating = document.createElement("div");
    rating.classList.add("rating");

    const ratingIcon = document.createElement("i");
    ratingIcon.classList.add("fa", "fa-star");
    ratingIcon.setAttribute("aria-hidden", "true");

    const ratingSpan = document.createElement("span");
    ratingSpan.textContent = movie.rating;

    rating.appendChild(ratingIcon);
    rating.appendChild(ratingSpan);

    cardOverlay.appendChild(xsignDiv);
    cardOverlay.appendChild(rating);

    cardHead.appendChild(img);
    cardHead.appendChild(cardOverlay);

    const cardBody = document.createElement("div");
    movieCard.appendChild(cardHead);
    movieCard.appendChild(cardBody);
    container.appendChild(movieCard);
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = movie.name;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const genreSpan = document.createElement("span");
    genreSpan.classList.add("genre");
    genreSpan.textContent = movie.gender;

    const yearSpan = document.createElement("span");
    yearSpan.classList.add("year");
    yearSpan.textContent = movie.year;

    cardInfo.appendChild(genreSpan);
    cardInfo.appendChild(yearSpan);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);

    container.appendChild(movieCard);

    xsignIcon.addEventListener("click", function(e){
      e.preventDefault();

      const jwt = getCookie('jwt');

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+jwt);
    
      const movieId = movie.id;
      const url = "http://localhost:2222/api/user/removeMovieWatchList/movie/"+movieId;

      fetch(url, {
        method: "PUT",
        headers: myHeaders,
      })
      .then(response => {
        if (!response.ok) 
        {
           response.json().then(data =>{
            const errorMess = data.message;
            alert(errorMess);
            return;
           });
        }
        else
        {
          container.removeChild(movieCard);
          //alert(cardTitle.textContent+"was deleted from watch list.");
        }
      });
    });

    movieCard.addEventListener("click", function(e) {
      if(e.target == cardOverlay){
        localStorage.setItem("movieId", movie.id);
        window.location.href = anchor.href;
        }
    });
  }
}


document.addEventListener("DOMContentLoaded", function()
{
    const jwt = getCookie('jwt');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+jwt);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode:'cors',
      redirect: 'follow',
      
    };

    fetch("http://localhost:2222/api/user/getUserFromJwt", requestOptions)
      .then(response => response.text())

      .then(result =>{

        const userInfo = JSON.parse(result);

        console.log(userInfo);

        let userLabel = document.getElementById("username");
        userLabel.innerHTML  = userInfo.username;

        let emailLabel = document.getElementById("emailUser");
        emailLabel.innerHTML = userInfo.email;

        let numberOfpoints = document.getElementById("numberOfPoints");
        numberOfpoints.innerHTML = userInfo.numberOfPoints;

      })
      .catch(error => console.log('error', error));

    fetch("http://localhost:2222/api/user/getWatchList", requestOptions)
      .then(response => response.text())

      .then(result =>{
        
        loadGrid(result, "movieGrid");

      })
      .catch(error => console.log('error', error));
});



