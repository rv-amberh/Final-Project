
// Toggle and Navigation //

const toggle = document.querySelector(".toggle");

const navigation = document.querySelector(".navigation");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
});

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
fetch('http://localhost:8000/products')
        .then(resp => resp.json())
        .then(data => showProducts(data));

function showProducts(products) {
  let output = "";

  // now i have to loop trough the products, and in every iteration
  // i add an html template to the output variable.
  for (let item of products) {
    output += `
	<div class="product">
          <img src="${item.image}" alt="${item.image}">
          <p class="title">${item.name}</p>
	  <p class="description">${item.description}</p>
	  <p class="price">${item.price}</p>
	</div>
    `;
  }
  /* and last i target the products container and add the data that the
		output variable holds. */
  document.querySelector("#products").innerHTML = output;
}



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
  if (checkboxValues.length == 0) {
    $(".product").show();
  } else {
    $(".product").hide();
    $(".product").each(function() {
      var description = $(this).find('.description').prop('innerHTML').toLowerCase();
      checkboxValues.forEach((query) => {
        if (description.indexOf(query) > -1) {
          $(this).show();
        }
      });
    });
  }
}
