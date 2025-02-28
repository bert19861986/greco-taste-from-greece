import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  { id: 1, name: "Pork Sandwich", price: 5.99 },
  { id: 2, name: "Chicken Sandwich", price: 6.49 },
  { id: 3, name: "Chicken Bacon", price: 6.99 },
  { id: 4, name: "Kebab", price: 7.49 },
  { id: 5, name: "Coca Cola", price: 2.00 },
];

function Home({ addToCart }) {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Greco Taste from Greece!</h1>
      <p className="mb-4">Authentic Greek flavors in Amsterdam!</p>
      <Link to="/shop">
        <Button>Go to Shop</Button>
      </Link>
    </div>
  );
}

function Shop({ addToCart }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Our Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <CardContent>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">€{product.price.toFixed(2)}</p>
              <Button className="mt-2" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link to="/cart">
        <Button className="mt-4">Go to Cart</Button>
      </Link>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name} - €{item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <Link to="/shop">
        <Button className="mt-4">Back to Shop</Button>
      </Link>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}