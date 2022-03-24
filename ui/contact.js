// Toggle and Navigation //

const toggle = document.querySelector('.toggle')

const navigation = document.querySelector('.navigation')

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active')
  navigation.classList.toggle('active')
})

//Form Validation//

function validateForm() {

// Setting variables to grab html elements//

let lastName = document.getElementById("name");
isNameValid(lastName.value);
lastName.value = "";

let email = document.getElementById("email");
isEmailValid(email.value);
email.value = "";

let phoneNumber = document.getElementById("phoneNumber");
isPhoneNumberValid(phoneNumber.value);
phoneNumber.value = "";
}

//If statement - passing through the string from the form and testing if the position matches//




function isNameValid(str) {
if (!/^[a-zA-Z ]{2,30}$/.test(str)) {
  alert("Name must be 2 to 30 alphabet characters");
}
}

function isEmailValid(str) {
const validEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
if (!validEmail(str)) {
  alert("Please enter valid email address");
}
}

function isPhoneNumberValid(str) {
const validNumber = (num) => {
  return num.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);
}
if (!validNumber(str)) {
  alert("Please enter valid phone number");
}
}