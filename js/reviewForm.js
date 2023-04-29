const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");

btn.addEventListener('click',() => 
{
    widget.style.display = "none";
    post.style.display = "block";

    editBtn.addEventListener('click',() =>  
    {
        widget.style.display = "block";
        post.style.display = "none";
    });

    return false;
});