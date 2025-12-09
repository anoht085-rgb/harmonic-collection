let button = document.getElementById("switch-mode")
let page = document.body;

button.addEventListener("click",function (){
    /* stuff*/
    page.classList.toggle("dark-mode");
})

let dropdown = document.getElementById("dropdown");
letimg = document.getElementById("bird");

dropdown.addEventListener("change", functioen(){
    /* first get what the user selected */
    let selection = dropdown.value;
    /* then change the image*/ 
    img.src = selection 
}); 


