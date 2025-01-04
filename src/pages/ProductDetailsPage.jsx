import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  // قائمة المنتجات مع المراجعات
  const products = [
    {
      id: 1,
      name: "Nike Shoes",
      price: 120,
      description: "High-quality sports shoes.",
      image: "/assets/images/nike-shoes.jpg",
      reviews: [
        { id: 1, author: "Mustafa Mohammed", text: "Amazing shoes, very comfortable!" },
        { id: 2, author: "Hussein", text: "Loved the quality, worth the price!" }
      ]
    },
    {
      id: 2,
      name: "Adidas T-Shirt",
      price: 40,
      description: "Comfortable sports t-shirt.",
      image: "/assets/images/adidas-shirt.jpg",
      reviews: []
    },
    {
      id: 3,
      name: "Puma Hat",
      price: 25,
      description: "Stylish sports hat.",
      image: "/assets/images/puma-hat.jpg",
      reviews: []
    },
    {
      id: 4,
      name: "Reebok Shorts",
      price: 35,
      description: "Durable sports shorts.",
      image: "/assets/images/reebok-shorts.jpg",
      reviews: []
    }
  ];

  const product = products.find((p) => p.id === parseInt(productId));
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [newReview, setNewReview] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!product) {
    return <p>Product not found</p>;
  }

  // إضافة مراجعة جديدة
  const handleAddReview = () => {
    if (newReview.trim() && reviewAuthor.trim()) {
      const newReviewObj = {
        id: reviews.length + 1,
        author: reviewAuthor,
        text: newReview
      };
      setReviews([...reviews, newReviewObj]);
      setNewReview("");
      setReviewAuthor("");
      setSuccessMessage("Your review has been added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // إخفاء الرسالة بعد 3 ثوانٍ
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ maxWidth: "300px", display: "block", marginBottom: "20px" }} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>

      {/* قسم المراجعات */}
      <div style={{ marginTop: "30px" }}>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} style={{ marginBottom: "10px" }}>
                <strong>{review.author}:</strong> {review.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {/* إضافة مراجعة جديدة */}
        <div style={{ marginTop: "20px" }}>
          <h3>Add a Review</h3>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <input
            type="text"
            value={reviewAuthor}
            onChange={(e) => setReviewAuthor(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            style={{ width: "100%", resize: "none", padding: "8px" }}
          ></textarea>
          <button
            onClick={handleAddReview}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
