const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory catalog of makeup products
const products = [
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    category: "Lips",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
  },
  {
    id: 2,
    name: "Radiant Silk Foundation",
    category: "Face",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400"
  },
  {
    id: 3,
    name: "Rose Glow Blush Palette",
    category: "Cheeks",
    price: 29.50,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
  },
  {
    id: 4,
    name: "Volumizing Lash Mascara",
    category: "Eyes",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1560700329-1065e5332f14?w=400"
  }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Mock checkout endpoint
app.post('/api/checkout', (req, res) => {
  const { cartItems, totalAmount } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }
  res.json({
    success: true,
    message: `Order placed successfully! Total: $${totalAmount.toFixed(2)}`
  });
});

app.listen(PORT, () => {
  console.log(`Makeup Store Server running at http://localhost:${PORT}`);
});
// Route d'accueil pour éviter l'erreur Cannot GET /
app.get('/', (req, res) => {
  res.send('✨ Bienvenue sur l\'API de Glow & Grace Cosmetics ! Le serveur fonctionne.');
});