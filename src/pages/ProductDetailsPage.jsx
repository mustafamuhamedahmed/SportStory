import React from "react";
import { useParams } from "react-router-dom"; // استيراد useParams

const ProductDetailsPage = () => {
  const { productId } = useParams(); // الحصول على المعرف من الرابط

  // هنا يمكنك جلب بيانات المنتج باستخدام API أو من البيانات المحلية
  const products = [
    { id: 1, name: "Nike Shoes", price: 120, description: "High-quality sports shoes.", image: "/assets/images/nike-shoes.jpg" },
    { id: 2, name: "Adidas T-Shirt", price: 40, description: "Comfortable sports t-shirt.", image: "/assets/images/adidas-shirt.jpg" },
    { id: 3, name: "Puma Hat", price: 25, description: "Stylish sports hat.", image: "/assets/images/puma-hat.jpg" },
    { id: 4, name: "Reebok Shorts", price: 35, description: "Durable sports shorts.", image: "/assets/images/reebok-shorts.jpg" }
  ];

  const product = products.find((p) => p.id === parseInt(productId)); // البحث عن المنتج حسب ID

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetailsPage;

