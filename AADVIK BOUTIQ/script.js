// select ALL buttons card,gallery
let allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  // only "Add To Cart" buttons filter
  if (button.innerText.trim() === "Add To Cart") {
    button.addEventListener("click", function () {
      let card = this.parentElement;

      let name = card.querySelector("h3").innerText;

      let priceText = card.querySelector("p").innerText;
      let price = priceText.replace("₹", "").trim();

      let product = {
        name: name,
        price: price,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(name + " Added To Cart ✅");
    });
  }
});
