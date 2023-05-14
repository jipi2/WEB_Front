function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

document.addEventListener("DOMContentLoaded", function()
{

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
            if(username === 'admin' && password === 'admin')
            {
                window.location.href="admin_useri.html";
            }
            else
                window.location.href = "home.html";



        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            alert('Login failed. Please try again.');
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

        if (!pass.value || !conPass.value) {
            alert("Please fill in both password fields");
            return;
          }
          

        if(pass.value !== conPass.value && pass.value != "" && conPass.value != "")
        {
            alert("The passwords are not the same");
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
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            alert("The account has been created, you can log in");
        })
        .catch(error => {
            console.error(error);
            alert("Something went wrong");
        });



    })
    
});