// Toggle and Navigation //
  const toggle = document.querySelector('.toggle')

  const navigation = document.querySelector('.navigation')

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active')
    navigation.classList.toggle('active')
})

//Fetch products from the database 

fetch('http://localhost:8000/products')
        .then(resp => resp.json())
        .then(data => showProducts(data));

//Showing + Creating the Products in HTML//

function showProducts(data) {

var products = "",
	makes = "",
	types = "";

  for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);

	var make = data[i].name,
		price = data[i].price,
		type = data[i].description,
		image = data[i].image;
	
//create product cards
	products += "<div class='col-sm-4 product' data-make='" + make + "' data-price='" + price + "' data-type='" + type + "'><div class='product-inner text-center'><img src='" + image + "'><br /> " + make + "<br />Price: " + price + "<br />Type: " + type + "</div></div>";
	
  }

  $("#products").html(products);
}

//Going to use this for price sorting
function compareFn(a,b) {
    return a.data('price') - b.data('price')
}

// on filter change
$(".filter").on("change",function() {
	var filterName = $(this).data("filter"),
    	     filterVal = $(this).val();
	
        console.log(filterName);
        console.log(filterVal);
// this will actually be used for sorting not filtering - did not want to alter html
        if (filterName = "sortPrice") {
                var productElems = [];
                $(".product").each(function() {
                        productElems.push($(this))
                });
                
                switch (filterVal) {
                        case 'asc':
                                $("#products").html(productElems.sort(compareFn));
                                break;
                        case 'desc':
                                $("#products").html(productElems.sort(compareFn).reverse());
                                break;
                }
        } else {
                $("#products").html(productElems);
        }
});

//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var make = $(this).data("make").toLowerCase(),
		    type = $(this).data("type").toLowerCase();

// this is calling indexOf on the description variable and scans for a position of the substring within the superstring 

		if (make.indexOf(query) > -1 || type.indexOf(query) > -1) {
			$(this).show();
		}
	});
});


