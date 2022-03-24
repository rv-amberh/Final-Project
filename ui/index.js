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

fetch('http://localhost:8000/products')
        .then(resp => resp.json())
        .then(data => showFeatured(data));
  
  
  

function showFeatured(products) {
      // next i need an empty variable to add the incoming data.
      let output = "";

      // now i have to loop trough the products, and in every iteration
      // i add an html template to the output variable.
      for(let item of products.filter(p => p.feature)){
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
      document.querySelector(".products").innerHTML = output;
}  



