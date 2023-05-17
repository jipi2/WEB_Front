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

    const signinBtn = document.querySelector('.signInBtn');
    const signupBtn = document.querySelector('.signUpBtn');
    const formBx = document.querySelector('.formBx');
    const bodyPage = document.querySelector('.body_page')

    signupBtn.onclick = function()
    {
        formBx.classList.add('active');
        bodyPage.classList.add('active');
    }

    signinBtn.onclick = function()
    {
        formBx.classList.remove('active');
        bodyPage.classList.remove('active');

    }

    const form = document.getElementById("loginForm");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Get form inputs
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        // Create login JSON object
        const loginData = {
            username: username,
            password: password
        };
    
        // Convert login JSON object to string
        const loginDataString = JSON.stringify(loginData);
        
        fetch("http://localhost:2222/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: loginDataString
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
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

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+jwt);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              mode:'cors',
              redirect: 'follow',
              
            };

            let url = "http://localhost:2222/api/user/isAdmin/";
            console.log(url);
            
            let admin = false;

            fetch(url, requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
              }
              else {
                return response.json(); 
              }
            })
            .then(data => {
              admin = data; 
              console.log(admin);
          
              if (admin === true) {
                window.location.href = "admin_useri.html";
              } else {
                window.location.href = "home.html";
              }
            })
            .catch(error => {
              // Handle any error that occurred during the fetch request
              console.error(error);
            });

        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
    
            Swal.fire({
                title: 'Login Failed',
                text: 'Please try again.',
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

    const formReg = document.getElementById("registerForm");
    formReg.addEventListener('submit', function(e)
    {
        e.preventDefault();

        const name = document.getElementById("regName");
        const username = document.getElementById("regUsername");
        const email = document.getElementById("regEmail");
        const pass = document.getElementById("regPass");
        const conPass = document.getElementById("regConfirmPass");

        if (!pass.value || !conPass.value) 
        {
            //alert("Please fill in both password fields");
            Swal.fire({
                title: 'Credentials Problems',
                text: 'Please fill in both password fields',
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
          

        if(pass.value !== conPass.value && pass.value != "" && conPass.value != "")
        {
            //alert("The passwords are not the same");
            Swal.fire({
                title: 'Credentials Problems',
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
        
        let user = {
            name:name.value,
            username:username.value,
            email:email.value,
            password:pass.value
        }

        const registerDataString = JSON.stringify(user);
        
        fetch("http://localhost:2222/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: registerDataString
        })
        .then(response => {
            if(response.ok)
            {
                Swal.fire({
                    title: 'YEY',
                    text: 'The account has been created, you can log in',
                    icon: 'error',
                    customClass: {
                        container: 'custom-swal-container',
                        title: 'custom-swal-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm-button',
                    }
                });
            }
            else
            {
                response.json().then(data => {
                    Swal.fire({
                        title: 'ERROR',
                        text: data.message,
                        icon: 'error',
                        customClass: {
                            container: 'custom-swal-container',
                            title: 'custom-swal-error-title',
                            content: 'custom-swal-content',
                            confirmButton: 'custom-swal-confirm-button',
                        }
                    });
                });
            }
        });


    });

    const forgotLink = document.getElementById("forgotLink");
    forgotLink.addEventListener('click', function(event)
    {
        event.preventDefault();

        //console.log("you pressed here");
        Swal.fire({
            title: 'Enter your email:',
            input: 'text',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            customClass:{
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
            },
            preConfirm: (emailUser) => 
            {
              // Handle the input value (name) here
              console.log('Submitted name:', emailUser);
                
              localStorage.setItem("email", emailUser);

              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
      
              fetch("http://localhost:2222/api/user/resetPassEmail", {
                  method: "PUT",
                  headers: myHeaders,
                  body: emailUser
              })
              .then(response => {
                  if (!response.ok) {
                      
                      //alert("Old password was not oke");
                      Swal.fire({
                          title: 'Mail Problems',
                          text: 'There is no user with this email',
                          icon: 'error',
                          customClass: {
                              container: 'custom-swal-container',
                              title: 'custom-swal-error-title',
                              content: 'custom-swal-content',
                              confirmButton: 'custom-swal-confirm-button',
                          }
                      });
    
                  }
                  //alert("Password modified");

                  Swal.fire({
                      title: 'Email Sent!',
                      customClass: {
                          container: 'custom-swal-container',
                          title: 'custom-swal-title',
                          content: 'custom-swal-content',
                          confirmButton: 'custom-swal-confirm-button',
                      }
                  });
              });

            }

        });
    });
    
});
