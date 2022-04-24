const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function Validatesignup(e) {
  let valid;
  let fields = document
    .getElementById("signup_form")
    .getElementsByTagName("input");

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value == "") {
      fields[i].classList.add("input_err");
      let par = fields[i].parentElement;
      par.classList.add("null_check");
      valid = false;
      e.preventDefault();
    } else {
      fields[i].classList.remove("input_err");
      let par = fields[i].parentElement;
      par.classList.remove("null_check");
      valid = true;
    }
  }

  return valid;
}

function Validatesignin(e) {
  let valid;
  let fields = document
    .getElementById("signin_form")
    .getElementsByTagName("input");

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value == "") {
      fields[i].classList.add("input_err");
      let par = fields[i].parentElement;
      par.classList.add("null_check");
      valid = false;
      e.preventDefault();
    } else {
      fields[i].classList.remove("input_err");
      let par = fields[i].parentElement;
      par.classList.remove("null_check");
      valid = true;
    }
  }

  return valid;
}
