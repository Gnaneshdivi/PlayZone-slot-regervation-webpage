

const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signup");
const si = document.getElementById("si");
const su = document.getElementById("su");
const container = document.querySelector(".container");


signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {

  container.classList.add("right-panel-active");

});
si.addEventListener("click", () => {
  login();
});
su.addEventListener("click", () => {

  signup();
});



function signup() {
  na = document.getElementById('sn').value;
  mail = document.getElementById('se').value;
  password = document.getElementById('sp').value;
  phone = document.getElementById('s').value;
  fetch("http://localhost:3000/usersignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": na,
      "id": mail,
      "password": password,
      "phone": phone,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.message);
if(res.message==true){
  window.location ='pay.html'
}
    });



}
function login() {
  mail = document.getElementById('e1').value;
  password = document.getElementById('p1').value;
  fetch("http://localhost:3000/userlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "id": mail,
      "password": password,
    }),
  })
    .then((response) => response.json())
    .then((res) => { console.log(res.message[0].password);
      if(res.message[0].password==password){
        window.location ='dashboard.html'
      }
    else{
      window.location ='login.html'
    } });
}










