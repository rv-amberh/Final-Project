
// Toggle and Navigation //

const toggle = document.querySelector(".toggle");

const navigation = document.querySelector(".navigation");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
});



// Fetching products from the database 

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
         <a href="http://localhost/details.html">
          <img src="${item.image}" alt="${item.image}">
          <p class="title">${item.name}</p>
          </a>
	  <p class="description">${item.description}</p>
	  <p class="price">${item.price}</p>
	</div>
    `;
  }
  /* and last i target the products container and add the data that the
		output variable holds. */
  document.querySelector("#products").innerHTML = output;
}



// Filter - Amazon Style (Kinda) //

// Grabbing the boxes + the products //

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
