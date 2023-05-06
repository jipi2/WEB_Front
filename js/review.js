function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

function loadReviews(reviewJSON)
{
  const testimonialData = JSON.parse(reviewJSON);
  const sectionBody = document.getElementById("testimonials");
  
  for (let i = 0; i < testimonialData.length; i++) 
  {
    const testimonial = testimonialData[i];
  
    const testimonialBox = document.createElement('div');
    testimonialBox.classList.add('testimonial-box');
  
    const boxTop = document.createElement('div');
    boxTop.classList.add('box-top');
  
    const profile = document.createElement('div');
    profile.classList.add('profile');
  
    const profileImg = document.createElement('div');
    profileImg.classList.add('profile-img');
  
    const img = document.createElement('img');
    img.setAttribute('src', '../assets/images/user_picture.jpg');
    img.setAttribute('alt', '');
  
    profileImg.appendChild(img);
  
    const nameUser = document.createElement('div');
    nameUser.classList.add('name-user');
  
    const strong = document.createElement('strong');
    strong.textContent = testimonial.nameOfUser;
  
    const span = document.createElement('span');
    span.textContent = testimonial.usernameOfUser;
  
    nameUser.appendChild(strong);
    nameUser.appendChild(span);
  
    profile.appendChild(profileImg);
    profile.appendChild(nameUser);
  
    const reviews = document.createElement('div');
    reviews.classList.add('reviews');
  
    for (let j = 0; j < 5; j++) 
    {
      const star = document.createElement('i');
      star.classList.add('fa', 'fa-star');
      if (j >= testimonial.numberOfStars) {
        star.classList.add('fa-star-o');
      }
      reviews.appendChild(star);
    }
  
    const viewerComment = document.createElement('div');
    viewerComment.classList.add('viewer-comment');
  
    const commentText = document.createElement('p');
    commentText.textContent = testimonial.content;
  
    viewerComment.appendChild(commentText);
  
    boxTop.appendChild(profile);
    boxTop.appendChild(reviews);
  
    testimonialBox.appendChild(boxTop);
    testimonialBox.appendChild(viewerComment);
  
    sectionBody.appendChild(testimonialBox);
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

      const urlReviews = "http://localhost:2222/api/review/getMovieReview/"+movieId;

      fetch(urlReviews, requestOptions)
      .then(response => response.text())

      .then(result =>{
        
        loadReviews(result);
        //console.log(JSON.parse(result));

      })
      .catch(error => console.log('error', error));

});