function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
}

document.addEventListener("DOMContentLoaded", function()
{
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
            alert("The passwords are not the same");
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
                
                alert("Old password was not oke");
                pass.value="";
                oldPass.value="";
                conPass.value="";
                throw new Error("Network response was not ok");
            }
            alert("Password modified");
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
        .then(response => {
            if (!response.ok) {
               response.json().then(data =>{
                const errorMess = data.message;
                alert(errorMess);
               });
                oldEmail.value="";
                newEmail.value="";
                return;
            }
            alert("Email modified");
        })

    });

    nameForm.addEventListener('submit', function(e){

        e.preventDefault();

        const oldName = document.getElementById("oldName");
        const newName = document.getElementById("newName");

        let nameUpdate = {
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
                alert("Old name was not oke");
                oldName.value="";
                newName.value="";
                return;
            }
            alert("Name modified");
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
                    alert(errorMess);
                   });

                    oldEmail.value="";
                    newEmail.value="";
                    return;
            }
        
        alert("Name modified");
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