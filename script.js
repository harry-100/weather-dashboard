topEl = document.getElementById("top");
var i = 9;
if (i < 3) {
    topEl.classList.add("low");
}
else if (i >3 && i < 8){
    topEl.classList.add("mid");
}
else if ( i > 8) {
    topEl.classList.add("high");
}