import React, { useEffect, useState } from "react";
import "./Products.css"; // ملف CSS لتنسيق الصفحة

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // دالة لجلب المنتجات من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://example.com/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h1>Products</h1>
      {error && <p className="error-message">{error}</p>}

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
