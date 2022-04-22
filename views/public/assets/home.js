// // FOR PROGRESS BAR AT TOP

window.addEventListener("scroll", moveScrollIndicator);

const scrollIndicatorElt = document.getElementById("myBar");

const maxHeight = window.document.body.scrollHeight - window.innerHeight;

function moveScrollIndicator(e) {
  const percentage = (window.scrollY / maxHeight) * 100;

  scrollIndicatorElt.style.width = percentage + "%";
}

// FOR NAVBAR STICKY

window.onscroll = function () {
  stickybar();
};
var header = document.querySelector(".head-home");
var sticky = header.offsetTop;

function stickybar() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.querySelector(".progress-bar").style.display = "flex";
    
  } else {
    header.classList.remove("sticky");
    document.querySelector(".progress-bar").style.display = "none";
  }
}
