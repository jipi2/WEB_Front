
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    formReview = document.getElementById("reviewForm");

    formReview.addEventListener("submit", function(e)
    {

        e.preventDefault();
        const textarea = document.getElementById("textArea");

        let max = -1;
       
        for (let i = 5; i > 0; i--) 
        {
            const rateRadio = document.getElementById("rate-"+i.toString());
  
            if(rateRadio.checked == true)
            {
                max = i;
                break;
            }
        }
       
        let reviewForm = {
            content:textarea.value,
            numberOfStars:max.toString()
        }

        const resJson = JSON.stringify(reviewForm);

        const jwt = getCookie('jwt');
        const movieId = localStorage.getItem("movieId");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+jwt);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode:'cors',
            redirect: 'follow',
            body:resJson
        };

        const url = "http://localhost:2222/api/user/saveReview/movie/"+movieId;

        fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                
                alert("You already wrote a review to this movie.");
                window.location.href = "review.html";
               
            }
            else{
            console.log(response.status);
            alert("Review saved!");
            window.location.href = "review.html";
            }
        })
       

    });
});