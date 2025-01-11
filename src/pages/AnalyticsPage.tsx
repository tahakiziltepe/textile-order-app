import React from 'react';
import { Link } from 'react-router-dom';
import { getOrderStatusCounts, getNearestDeadlineOrders, getTopSuppliers, getDelayedOrders } from '../utils/analyticsUtils';

const AnalyticsPage = () => {
  const orderStatusCounts = getOrderStatusCounts();
  const nearestDeadlines = getNearestDeadlineOrders();
  const topSuppliers = getTopSuppliers();
  const delayedOrders = getDelayedOrders();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">KPI ve Veri Analizi</h1>

        {/* Ana Metrikler */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sipariş Durumları */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Durumları</h3>
            <div className="space-y-4">
              {orderStatusCounts.map(({ status, count, color }) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-600">{status}</span>
                  </div>
                  <span className="text-sm font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yaklaşan Terminler */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yaklaşan Terminler</h3>
            <div className="space-y-4">
              {nearestDeadlines.map((order) => (
                <Link
                  key={order.id}
                  to={`/order/${order.id}`}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.orderName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.dueDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-orange-600">
                    {order.daysLeft} gün
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* En İyi Tedarikçiler */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Tercih Edilen Tedarikçiler</h3>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={supplier.supplierName} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 text-sm text-gray-500">{index + 1}.</span>
                    <span className="text-sm text-gray-900">{supplier.supplierName}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {supplier.acceptedQuotes} sipariş
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gecikmeye Düşen Siparişler */}
        <div className="bg-red-50 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Gecikmeye Düşen Siparişler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {delayedOrders.map((order) => (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="flex items-center justify-between bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderName}</p>
                  <p className="text-xs text-gray-500">
                    Termin: {new Date(order.dueDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  {order.delayDays} gün gecikme
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 