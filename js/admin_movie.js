function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

document.addEventListener("DOMContentLoaded", function()
{
  const myTextarea = document.getElementById('raitingBox');
  const yearArea = document.getElementById("yearBox");

  myTextarea.addEventListener('input', function() {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    const isValid = regex.test(this.value);

    if (!isValid) {
      this.value = this.value.replace(/[^\d\.]/g, '');
    }
});

yearArea.addEventListener('input', function() {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  const isValid = regex.test(this.value);

  if (!isValid) {
    this.value = this.value.replace(/[^\d\.]/g, '');
  }
});

  const movieForm = document.getElementById("movieForm");
    
  movieForm.addEventListener("submit", function(e){

    e.preventDefault();

    const title = document.getElementById("title");
    var actors  ="";
    const description = document.getElementById("description");
    const rating = document.getElementById("raitingBox");
    const yearBox = document.getElementById("yearBox");
    const link = document.getElementById("link");
    const pathImage = document.getElementById("pathImage");
    const genre = document.getElementById("genre");

    let movieObject=
    {
      name:title.value,
      rating:rating.value,
      pathImage:pathImage.value,
      nameActors:actors,
      trailer:link.value,
      gender:genre.value,
      year:yearBox.value,
      description:description.value
    };

    const movieJson = JSON.stringify(movieObject);
    const jwt = getCookie('jwt');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+jwt);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode:'cors',
        redirect: 'follow',
        body:movieJson
    };

    const url = "http://localhost:2222/api/movie/addMovie";
      fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                
              alert("This movie already exists.");
               
            }
            else
            {
              console.log(response.status);
              alert("Movie saved!");
              window.location.href = "admin_home.html";
            }
        })

  });

});