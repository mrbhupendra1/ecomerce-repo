async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>💰 Price: ₹${p.price}</p>
    `;
    list.appendChild(card);
  });
}

loadProducts();

