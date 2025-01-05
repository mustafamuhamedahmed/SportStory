import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import ProductCard from "../components/ProductCard";
import "./Shop.css";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // تعريف التنقل

  // استخدام useMemo للمصفوفة الثابتة `products` مع إضافة تفاصيل إضافية
  const products = useMemo(() => [
    { id: 1, name: "Nike Shoes", price: 120, description: "High-quality running shoes from Nike.", image: "/assets/images/nike-shoes.jpg" },
    { id: 2, name: "Adidas T-Shirt", price: 40, description: "Comfortable and stylish T-shirt by Adidas.", image: "/assets/images/adidas-shirt.jpg" },
    { id: 3, name: "Rugby ball", price: 25, description: "Rugby ball.", image: "/assets/images/Rugby ball.jpg" },
    { id: 4, name: "Tennis racket", price: 35, description: "Tennis racket.", image: "/assets/images/Tennis racket.jpg" },
    { id: 5, name: "Puma Hat", price: 25, description: "Trendy Puma cap for casual wear.", image: "/assets/images/puma hat.jpg" },
    { id: 6, name: "Basketball", price: 95, description: "Basketball.", image: "/assets/images/Basketball.jpg" }
  ], []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.id === product.id);
      if (!productExists) {
        console.log(`${product.name} added to cart!`);
        return [...prevCart, product];
      }
      console.log(`${product.name} is already in the cart.`);
      return prevCart;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  }, []);

  // حساب السعر الإجمالي
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // استخدام useMemo لتصفية المنتجات بناءً على البحث
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  // دالة للتنقل إلى صفحة تفاصيل المنتج
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // تحويل إلى صفحة المنتج مع تمرير ID
  };

  return (
    <div>
      <h1>Shop</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              onAddToCart={() => addToCart(product)}
              onProductClick={() => handleProductClick(product.id)} // إضافة حدث النقر
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name}
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Shop;
