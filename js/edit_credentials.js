function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
    document.head.appendChild(script);

    const jwt = getCookie('jwt');

    const passForm = document.getElementById("updatePassForm");
    const emialForm = document.getElementById("emailForm");
    const nameForm = document.getElementById("nameForm");
    const usernameForm = document.getElementById("userNForm");

    passForm.addEventListener("submit", function(e){

        e.preventDefault();

        const pass = document.getElementById("newPass");
        const conPass = document.getElementById("conNewPass");
        const oldPass = document.getElementById("oldPass");

        if(pass.value !== conPass.value && pass.value != "" && conPass.value != "")
        {
            //alert("The passwords are not the same");
            Swal.fire({
                title: 'Confirm Password',
                text: 'The passwords are not the same',
                icon: 'error',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-error-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                }
            });
            return;
        } 

        let passUpdate = {
            oldPass:oldPass.value,
            newPass:pass.value
        }

        const passUpdateJson = JSON.stringify(passUpdate);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+jwt);
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:2222/api/user/updatePassword", {
            method: "PUT",
            headers: myHeaders,
            body: passUpdateJson
        })
        .then(response => {
            if (!response.ok) {
                
                //alert("Old password was not oke");

                Swal.fire({
                    title: 'Old Password Problems',
                    text: 'Old password was not oke',
                    icon: 'error',
                    customClass: {
                        container: 'custom-swal-container',
                        title: 'custom-swal-error-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm-button',
                    }
                });

                pass.value="";
                oldPass.value="";
                conPass.value="";
                throw new Error("Network response was not ok");
            }
            //alert("Password modified");

            Swal.fire({
                title: 'Password Modified!',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                }
            });
        })

    });

    emialForm.addEventListener('submit', function(e){

        e.preventDefault();

        const oldEmail = document.getElementById("oldEmail");
        const newEmail = document.getElementById("newEmail");

        let emailUpdate = {
            oldEmail:oldEmail.value,
            newEmail:newEmail.value
        }

        const emailUpdateJson = JSON.stringify(emailUpdate);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+jwt);
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:2222/api/user/updateEmail", {
            method: "PUT",
            headers: myHeaders,
            body: emailUpdateJson
        })
        .then(response => 
            {
            if (!response.ok) {
               response.json().then(data =>{
                const errorMess = data.message;
                //alert(errorMess);

                Swal.fire({
                    title: 'Email Problems',
                    text: errorMess,
                    icon: 'error',
                    customClass: {
                        container: 'custom-swal-container',
                        title: 'custom-swal-error-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm-button',
                    }
                });
               });
                oldEmail.value="";
                newEmail.value="";
                return;
            }
            //alert("Email modified");
            Swal.fire({
                title: 'Email Modified!',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                }
            });
        })

    });

    nameForm.addEventListener('submit', function(e){

        e.preventDefault();

        const oldName = document.getElementById("oldName");
        const newName = document.getElementById("newName");

        let nameUpdate = 
        {
            oldName:oldName.value,
            newName:newName.value
        }

        const nameUpdateJson = JSON.stringify(nameUpdate);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+jwt);
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:2222/api/user/updateName", {
            method: "PUT",
            headers: myHeaders,
            body: nameUpdateJson
        })
        .then(response => {
            if (!response.ok) {
                //alert("Old name was not oke");
                
                Swal.fire({
                    title: 'Name Problems',
                    text: 'Old name was not ok!',
                    icon: 'error',
                    customClass: {
                        container: 'custom-swal-container',
                        title: 'custom-swal-error-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm-button',
                    }
                });

                oldName.value="";
                newName.value="";
                return;
            }
            //alert("Name modified");
            Swal.fire({
                title: 'Name Modified!',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                }
            });
        })
    });

    usernameForm.addEventListener('submit', function(e){

        e.preventDefault();

        const oldUsername = document.getElementById("oldUsername");
        const newUsername = document.getElementById("newUsername");

        let usernameUpdate = {
            oldUsername:oldUsername.value,
            newUsername:newUsername.value
        }

        const usernameUpdateJson = JSON.stringify(usernameUpdate);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+jwt);
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:2222/api/user/updateUsername", {
            method: "PUT",
            headers: myHeaders,
            body: usernameUpdateJson
        })
        .then(response => {
            if (!response.ok) 
            {
                response.json().then(data =>{
                    const errorMess = data.message;
                   // alert(errorMess);
                   Swal.fire({
                    title: 'Name Problems',
                    text: errorMess,
                    icon: 'error',
                    customClass: {
                        container: 'custom-swal-container',
                        title: 'custom-swal-error-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm-button',
                    }
                });
                   });

                    oldEmail.value="";
                    newEmail.value="";
                    return;
            }
        
        //alert("Name modified");
        Swal.fire({
            title: 'Name Modified!',
            customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
            }
        });
        return response.json();
           
        })
        .then(data => {
            // Handle successful login response
            const token = data['token'];
            console.log(data);
            // const tokenValue = JSON.parse(token);
            document.cookie = "jwt="+token+"; path=/";
            const jwt=getCookie("jwt");
            console.log(jwt);

        })
        .catch(error => {
  
        });
    });

});