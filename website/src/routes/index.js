const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  // Add more products as needed
];

let cart = [];

router.get('/', (req, res) => {
  res.render('index', { products });
});

router.get('/cart', (req, res) => {
  res.render('cart', { cart });
});

router.post('/add-to-cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    cart.push({ ...product, quantity: 1 });
  }

  res.redirect('/');
});

router.post('/checkout', (req, res) => {
  // Handle checkout logic here
  // For simplicity, clear the cart in this example
  cart = [];
  res.redirect('/cart');
});

module.exports = router;
