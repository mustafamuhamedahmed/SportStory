import React, { useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // حالة البحث

  const products = [
    { id: 1, name: "Nike Shoes", price: 120, image: "/assets/images/nike-shoes.jpg" },
    { id: 2, name: "Adidas T-Shirt", price: 40, image: "/assets/images/adidas-shirt.jpg" },
    { id: 3, name: "Puma Hat", price: 25, image: "/assets/images/puma-hat.jpg" },
    { id: 4, name: "Reebok Shorts", price: 35, image: "/assets/images/reebok-shorts.jpg" }
  ];

  // دالة لإضافة منتج إلى السلة
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

  // دالة لإزالة منتج من السلة
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  }, []);

  // حساب السعر الإجمالي للسلة
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // تصفية المنتجات بناءً على نص البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Shop</h1>
      
      {/* حقل البحث */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // تحديث حالة البحث
        />
      </div>

      {/* عرض المنتجات بناءً على البحث */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p>No products found</p>  // رسالة في حالة عدم وجود نتائج بحث
        )}
      </div>

      {/* عرض السلة */}
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
          <p>Your cart is empty</p> // رسالة عندما تكون السلة فارغة
        )}
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Shop;
