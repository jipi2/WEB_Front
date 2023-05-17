function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

function deleteRow(id) {
    
  const jwt = getCookie('jwt');
  const table = document.getElementById("tableId");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+jwt);
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    mode:'cors',
    redirect: 'follow',
    
  };

  let url = "http://localhost:2222/api/review/deleteReview/"+id;
  console.log(url);

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      row = document.getElementById(id);
      row.remove();
    })
    .catch(error => console.error(error));
}

function validateRow(id) {
    
  const jwt = getCookie('jwt');
  const table = document.getElementById("tableId");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+jwt);
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    mode:'cors',
    redirect: 'follow',
    
  };

  console.log(id);
  let url = "http://localhost:2222/api/review/validateReview/"+id;
  console.log(url);

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      row = document.getElementById(id);
      row.remove();
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function()
{
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
    document.head.appendChild(script);

    const tbody = document.getElementById("tbodyId");

    const jwt = getCookie('jwt');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+jwt);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode:'cors',
      redirect: 'follow',
      
    };

     fetch("http://localhost:2222/api/review/getUnverifiedReviews", requestOptions)
        .then(response => response.json())
        .then(data => {
            // Populate table rows with JSON data
           data.forEach((review) => {
                const row = tbody.insertRow();
                row.insertCell().appendChild(document.createTextNode(review.id));
                row.insertCell().appendChild(document.createTextNode(review.username));
                row.insertCell().appendChild(document.createTextNode(review.content));

                row.id = review.id;

                const buttonCell = row.insertCell();
                const okButton = document.createElement("button");
                const deleteButton = document.createElement("button");
                const okIcon = document.createElement("i");
                const deleteIcon = document.createElement("i");

                okIcon.classList.add("fa", "fa-check");
                deleteIcon.classList.add("fa", "fa-trash");

                okButton.appendChild(okIcon);
                deleteButton.appendChild(deleteIcon);

                buttonCell.appendChild(okButton);
                buttonCell.appendChild(deleteButton);

                okButton.addEventListener("click", () =>{
                  validateRow(review.id);
                });

                deleteButton.addEventListener("click", () => {
                  const confirmed = confirm("Are you sure you want to delete this Review?");
                  if (confirmed) {
                    deleteRow(review.id);
                  }
              });
            });
        })
        .catch(error => {
          //alert("You are not admin!");
           Swal.fire({
                title: 'ERROR',
                text: 'You are not admin',
                icon: 'error',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-error-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                }
          });
        });
});