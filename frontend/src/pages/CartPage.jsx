import { useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛍️ Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart ❌</p>
      ) : (
        <div className="grid gap-4">
          {cart.map((item, i) => (
            <div key={i} className="bg-white shadow-md p-4 rounded-lg flex justify-between">
              <span>{item.name} - ₹{item.price}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => removeItem(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="text-xl font-bold">Total: ₹{total}</h3>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Checkout ✅
          </button>
        </div>
      )}
    </div>
  );
}

