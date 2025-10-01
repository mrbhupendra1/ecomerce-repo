let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const list = document.getElementById("product-list");
  if (list) {
    list.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>💰 Price: ₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart 🛒</button>
      `;
      list.appendChild(card);
    });
  }
}

// Add to cart
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Load cart page
function loadCart() {
  const list = document.getElementById("cart-list");
  const totalElem = document.getElementById("cart-total");

  if (list && totalElem) {
    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>💰 ₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove ❌</button>
      `;
      list.appendChild(card);
    });

    totalElem.textContent = `Total: ₹${total}`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("searchBox")) {
    document.getElementById("searchBox").addEventListener("keyup", async (e) => {
      const keyword = e.target.value;
      const res = await fetch("/api/products/search/" + keyword);
      const products = await res.json();

      const list = document.getElementById("product-list");
      list.innerHTML = "";
      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <h3>${p.name}</h3>
          <p>💰 Price: ₹${p.price}</p>
          <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart 🛒</button>
        `;
        list.appendChild(card);
      });
    });
  }

  // load respective pages
  if (document.getElementById("product-list")) loadProducts();
  if (document.getElementById("cart-list")) loadCart();
});
