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
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
    document.head.appendChild(script);

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

    fetch("http://localhost:2222/api/user/UsersExceptThisUser", requestOptions)
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

            console.log(user);
            // Create edit and delete buttons
            const buttonCell = row.insertCell();
           // const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const checkboxButton = document.createElement("button");
            //const editIcon = document.createElement("i");
            const deleteIcon = document.createElement("i");
            const checkbox = document.createElement("i");

            deleteIcon.classList.add("fa", "fa-trash");
            if(user.admin === true)
              checkbox.classList.add("fa", "fa-check-circle");
            else 
              checkbox.classList.add("fa", "fa-check-circle-o")
            checkbox.id = "check-"+user.id;

            deleteButton.appendChild(deleteIcon);
            checkboxButton.appendChild(checkbox);


            buttonCell.appendChild(deleteButton);
            buttonCell.appendChild(checkboxButton);
            
            deleteButton.addEventListener("click", () => {
                //const confirmed = confirm("Are you sure you want to delete this user?");
                const confirmMesg = "Are you sure you want to delete this user?";
                // if (confirmed) {
                //   deleteRow(user.id);
                // }
                Swal.fire({
                  title: 'Delete User',
                  text: confirmMesg,
                  showCancelButton: true, // Display the cancel button
                  customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button', // Add the CSS class for the cancel button
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    // User clicked "OK"
                    // Handle the logic for OK button here
              
                    deleteRow(user.id);
                    
                  } 
                });
            });

            checkboxButton.addEventListener('click', ()=>{

              var child = document.getElementById("check-"+user.id);

              if(child.classList.contains("fa-check-circle-o"))
              { 
                requestOptions.method='PUT';
                let url = "http://localhost:2222/api/user/makeAdmin/"+user.id;
                console.log(url);
            
                fetch(url, requestOptions)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error ${response.status}`);
                    }
                    else
                    {
                      child.classList.remove("fa-check-circle-o");
                      child.classList.add("fa-check-circle");
                      //alert(user.username +" is now admin");
                      const mesgal = user.username+" is now admin.";
                      Swal.fire({
                        title: 'New Admin',
                        text: mesgal,
                        customClass: {
                            container: 'custom-swal-container',
                            title: 'custom-swal-title',
                            content: 'custom-swal-content',
                            confirmButton: 'custom-swal-confirm-button',
                        }
                    });
                    }
                  });
              }
              else
              {
                requestOptions.method='PUT';
                let url = "http://localhost:2222/api/user/deleteAdminRights/"+user.id;
                console.log(url);
            
                fetch(url, requestOptions)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error ${response.status}`);
                    }
                    else
                    {
                      child.classList.remove("fa-check-circle")
                      child.classList.add("fa-check-circle-o");
                      //alert(user.username +" is no longer admin");
                      const mesgal = user.username+" is no longer admin.";
                      Swal.fire({
                        title: 'Lost Admin',
                        text: mesgal,
                        customClass: {
                            container: 'custom-swal-container',
                            title: 'custom-swal-title',
                            content: 'custom-swal-content',
                            confirmButton: 'custom-swal-confirm-button',
                        }
                    });
                    }
                  });
              }

            });

            });
        })
        .catch(error =>{
          //alert("You are not admin, you can not see the other users!");
          Swal.fire({
            title: 'ERROR',
            text: 'You are not admin, you can not see the other users!',
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
