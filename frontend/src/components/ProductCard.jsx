import { motion } from "framer-motion";

export default function ProductCard({ product, addToCart }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <img src={product.img} alt={product.name} className="rounded-lg mb-3" />
      <h3 className="font-bold">{product.name}</h3>
      <p>💰 ₹{product.price}</p>
      <button
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </motion.div>
  );
}

