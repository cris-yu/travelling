import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Booking from './pages/Booking';
import MyOrders from './pages/MyOrders';
import ItineraryDetail from './pages/ItineraryDetail';
import CustomerService from './components/CustomerService';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/itinerary/:orderId" element={<ItineraryDetail />} />
        </Routes>
        
        {/* 全局客服悬浮按钮 */}
        <CustomerService />
      </div>
    </Router>
  );
}

export default App;
