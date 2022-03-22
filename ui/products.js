
// Toggle and Navigation //

const toggle = document.querySelector(".toggle");

const navigation = document.querySelector(".navigation");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
});

// Product Cards //


products = [
  {
    image: "https://assets.codepen.io/7067207/The+Motherboard.JPG",
    title: "Product title",
    description:
      "Digital Art - Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/The+Motherboard.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/The+Motherboard.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  },
  {
    image: "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
    title: "Product title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
    price: "9,99"
  }
];

/*
    We start our code with an ajax request to fetch the data
	from the json file.
*/
// First i create a new xmlhttp-request object.
// let http = new XMLHttpRequest();
// the variable http holds now all methods and properties of the objct.

//  next i prepare the request with the open() method.
//  http.open('get', 'products.json', true);
// the first argument sets the http method.
// in the second argument we pass the file where our data lives.
// and last the keyword true, sets the request to be async.

// next i will send the request.
// http.send();

// Now i have to catch the response.
// i will check the onload eventlistener.
//http.onload = function(){
// Inside the function i need to check the readystate and status properties.
//if(this.readyState == 4 && this.status == 200){
// if we have a successful response, i have to parse the json data
// and convert them to a javascript array.
//let products = JSON.parse(this.responseText);

// next i need an empty variable to add the incoming data.
let output = "";

// now i have to loop trough the products, and in every iteration
// i add an html template to the output variable.
for (let item of products) {
  output += `
				<div class="product">
					<img src="${item.image}" alt="${item.image}">
					<p class="data-title">${item.title}</p>
					<p class="data-description">${item.description}</p>
				  <p class="data-price">${item.price}</p>
				</div>
			`;
}
/* and last i target the products container and add the data that the
		output variable holds. */
document.querySelector("#products").innerHTML = output;




//Currency Convertor//

//click//

function change() {
  var change = document.getElementById("toggle");
  if (change.innerHTML == "Currency Convertor") {
    change.innerHTML = "Exit";
  } else {
    change.innerHTML = "Currency Convertor";
  }
}

//currency active//

const fired = document.querySelector(".fired");

const information = document.querySelector(".information");

fired.addEventListener("click", () => {
  toggle.classList.toggle("active");
  information.classList.toggle("active");
});

const from_currencyEl = document.getElementById("from_currency");
const from_ammountEl = document.getElementById("from_ammount");
const to_currencyEl = document.getElementById("to_currency");
const to_ammountEl = document.getElementById("to_ammount");
const rateEl = document.getElementById("rate");
const exchange = document.getElementById("exchange");

from_currencyEl.addEventListener("change", calculate);
from_ammountEl.addEventListener("input", calculate);
to_currencyEl.addEventListener("change", calculate);
to_ammountEl.addEventListener("input", calculate);

exchange.addEventListener("click", () => {
  const temp = from_currencyEl.value;
  from_currencyEl.value = to_currencyEl.value;
  to_currencyEl.value = temp;
  calculate();
});

function calculate() {
  const from_currency = from_currencyEl.value;
  const to_currency = to_currencyEl.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
    .then((res) => res.json())
    .then((res) => {
      const rate = res.rates[to_currency];
      rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`;
      to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
    });
}

calculate();

// Filter - Amazon Style //

// Grabbiing the boxes + the products //

const checkboxes = document.querySelectorAll("input[type='checkbox']");
const cardContainer = document.querySelectorAll("products");

// create an array that will hold the values of the currently checked check-boxes //

var checkboxValues = [];

// Add an change event to each check-box //

checkboxes.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => filterProducts());
});

// Our next function will loop throught all of the check-boxes and return an array that contains its values //

function grabCheckboxValues() {
  var checkboxValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checkboxValues.push(checkbox.value);
  });
  return checkboxValues;
}

// Filter through products //

var filtersObject = {};

function filterProducts() {
  checkboxValues = grabCheckboxValues();
  
  $(".product").hide();
  $(".product").each(function() {
    var description = $(this).data("description")();
    checkboxValues.forEach((query) => {
      if (description.indexOf(query) > -1) {
        $(this).show();
      }
    });
  });
}
