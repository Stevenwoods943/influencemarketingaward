const show = document.querySelector(".show");

function changeAttribute(){
    document.querySelector("#password").setAttribute("type", "text");
    show.innerHTML = "hide";
}
function changeAttributeAgain(){
    document.querySelector("#password").setAttribute("type", "password");
    show.innerHTML = "show";
}

show.addEventListener("click", function(){
    changeAttribute();
});
