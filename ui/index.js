// Toggle and Navigation //

const toggle = document.querySelector('.toggle')

const navigation = document.querySelector('.navigation')

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active')
  navigation.classList.toggle('active')
})

//Slideshow//

const slider = document.querySelector(".items");
      const slides = document.querySelectorAll(".item");
      const button = document.querySelectorAll(".button");

      let current = 0;
      let prev = 4;
      let next = 1;

      for (let i = 0; i < button.length; i++) {
          button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
      }

      const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

      const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

      const gotoNum = number => {
          current = number;
          prev = current - 1;
          next = current + 1;

          for (let i = 0; i < slides.length; i++) {
              slides[i].classList.remove("active");
              slides[i].classList.remove("prev");
              slides[i].classList.remove("next");
          }

          if (next == 5) {
              next = 0;
          }

          if (prev == -1) {
              prev = 4;
          }

          slides[current].classList.add("active");
          slides[prev].classList.add("prev");
          slides[next].classList.add("next");
      }

  //Products
  
products = [
  {
      "image": "https://assets.codepen.io/7067207/The+Motherboard.JPG",
      "title": "The MotherBoard",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
      "price": "300"
  },
  {
      "image": "https://assets.codepen.io/7067207/Revolution+in+Motion..JPG",
      "title": "Revolution in Motion",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
      "price": "400"
  },
  {
      "image": "https://assets.codepen.io/7067207/Relative+Conscious.JPG",
      "title": "Relative Conscious",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Blanditiis, ducimus.",
      "price": "300"
  }
]

  
  
  
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
      for(let item of products){
          output += `
              <div class="product">
                  <img src="${item.image}" alt="${item.image}">
                  <p class="title">${item.title}</p>
                  <p class="description">${item.description}</p>
              <p class="price">${item.price}</p>
              </div>
          `;
      }
      /* and last i target the products container and add the data that the
      output variable holds. */
      document.querySelector(".products").innerHTML = output;
  



