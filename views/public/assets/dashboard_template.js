//menu toggle
let toggle = document.getElementById("toggle_btn");
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.page-wrapper');

toggle.onclick=function(){
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}
