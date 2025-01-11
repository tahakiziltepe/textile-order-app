import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateOrderPage from './pages/CreateOrderPage';
import TrackOrdersPage from './pages/TrackOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SupplierHomePage from './pages/SupplierHomePage';
import SupplierOrdersPage from './pages/SupplierOrdersPage';
import SupplierOrderDetailPage from './pages/SupplierOrderDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SuppliersPage from './pages/SuppliersPage';
import SupplierDetailPage from './pages/SupplierDetailPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/track-orders" element={<TrackOrdersPage />} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />
          <Route path="/supplier" element={<SupplierHomePage />} />
          <Route path="/supplier/orders" element={<SupplierOrdersPage />} />
          <Route path="/supplier/order/:orderId" element={<SupplierOrderDetailPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/supplier/:supplierId" element={<SupplierDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
