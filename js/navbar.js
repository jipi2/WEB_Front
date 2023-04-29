document.addEventListener("DOMContentLoaded", function(){

hamburger = document.querySelector(".hamburger");   //intoarce primul elementr din pagina care apartine clasei respective
hamburger.onclick = function()
{
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}

});