import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cart, totalAmount })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderStatus(data.message);
          setCart([]);
        }
      });
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>✨ Glow & Grace Cosmetics</h1>
        <div className="cart-badge">🛒 Cart ({cart.reduce((a, c) => a + c.qty, 0)})</div>
      </header>

      <main className="main-content">
        <section className="product-section">
          <h2>Our Collection</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="card">
                <img src={product.image} alt={product.name} />
                <div className="card-body">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-sidebar">
          <h2>Shopping Bag</h2>
          {orderStatus && <p className="success-msg">{orderStatus}</p>}
          {cart.length === 0 ? (
            <p>Your bag is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <p>${item.price.toFixed(2)} x {item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>✕</button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <h3>Total: ${totalAmount.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Complete Order
                </button>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}