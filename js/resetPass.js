document.addEventListener("DOMContentLoaded", function()
{
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
    document.head.appendChild(script);

    const passForm = document.getElementById("updatePassForm");

    passForm.addEventListener("submit", function(e){

        e.preventDefault();
        
        console.log("mer");

        const pass = document.getElementById("newPass");
        const conPass = document.getElementById("conNewPass");

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

        const emailUser = localStorage.getItem("email");

        let passUpdate = {
            email:emailUser,
            password:newPass.value,
            confirmPassword:conPass.value
        }

        const passUpdateJson = JSON.stringify(passUpdate);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:2222/api/user/resetPass", {
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
            setTimeout(() => {
                window.location.href = "login_register.html";
              }, 3000);
        });

    });
});