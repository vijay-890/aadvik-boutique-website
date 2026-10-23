const buttons = document.querySelectorAll("button");
const searchInput = document.querySelector("#product-search");
const searchButton = document.querySelector(".srhbtn");
const searchStatus = document.querySelector("#search-status");
const productCards = [...document.querySelectorAll(".products .card, .gallery .product-card")];

function filterProducts() {
  const query = searchInput?.value.trim().toLowerCase() ?? "";
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  if (searchStatus) {
    searchStatus.textContent = query && visibleCount === 0
      ? "No sarees match that search. Try another name."
      : query
        ? visibleCount + " matching item" + (visibleCount === 1 ? "" : "s") + "."
        : "";
  }
}

searchInput?.addEventListener("input", filterProducts);
searchButton?.addEventListener("click", filterProducts);

buttons.forEach((button) => {
  if (button.textContent.trim().toLowerCase() !== "add to cart") return;
  button.addEventListener("click", () => {
    const card = button.closest(".card, .product-card");
    const name = card?.querySelector("h3")?.textContent.trim();
    const priceText = card?.querySelector("p")?.textContent ?? "";
    const price = Number(priceText.replace(/[^\d.]/g, ""));
    if (!name || !Number.isFinite(price)) return;

    let cart = [];
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(savedCart)) cart = savedCart;
    } catch {
      cart = [];
    }
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    button.textContent = "Added to Cart";
    window.setTimeout(() => { button.textContent = "Add To Cart"; }, 900);
  });
});