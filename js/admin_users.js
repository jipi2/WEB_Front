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

    let url = "http://localhost:2222/api/user/deleteUser/"+id;
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

    const table  = document.getElementById("tableId");
    const tbody = document.getElementById("tabodyId");    
    var cont = 1;

    const jwt = getCookie('jwt');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+jwt);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode:'cors',
      redirect: 'follow',
      
    };

    fetch("http://localhost:2222/api/user/getNormalUsers", requestOptions)
        .then(response => response.json())
        .then(data => {
            // Populate table rows with JSON data
            data.forEach((user, index) => {
            const row = tbody.insertRow();
            row.insertCell().appendChild(document.createTextNode(user.id ?? index + 1));
            row.insertCell().appendChild(document.createTextNode(user.email));
            row.insertCell().appendChild(document.createTextNode(user.name));
            row.insertCell().appendChild(document.createTextNode(user.username));
            row.insertCell().appendChild(document.createTextNode(user.numberOfPoints));
            row.id = user.id;

            // Create edit and delete buttons
            const buttonCell = row.insertCell();
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const editIcon = document.createElement("i");
            const deleteIcon = document.createElement("i");

            editIcon.classList.add("fa", "fa-pencil-square-o");
            deleteIcon.classList.add("fa", "fa-trash");

            editButton.appendChild(editIcon);
            deleteButton.appendChild(deleteIcon);

            buttonCell.appendChild(editButton);
            buttonCell.appendChild(deleteButton);
            
            deleteButton.addEventListener("click", () => {
                const confirmed = confirm("Are you sure you want to delete this user?");
                if (confirmed) {
                  deleteRow(user.id);
                }
            });

            });
        })
        .catch(error =>{
          alert("You are not admin, you can not see the other users!");
        });
});
