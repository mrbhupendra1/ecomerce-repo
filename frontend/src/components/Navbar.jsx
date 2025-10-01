import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-red-500 text-white flex justify-between p-4 shadow-lg">
      <Link to="/" className="font-bold text-xl">🛒 Bhupendra's Shop</Link>
      <Link to="/cart" className="hover:underline">Cart 🛍️</Link>
    </nav>
  );
}

