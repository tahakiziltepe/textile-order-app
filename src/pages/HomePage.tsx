import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Tekstil Sipariş Yönetim Sistemi</h1>
        
        {/* Ana Aksiyonlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/create-order"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Yeni Sipariş Oluştur</h2>
            <p className="text-sm text-gray-600 text-center">Yeni sipariş taslağı oluştur</p>
          </Link>

          <Link
            to="/track-orders"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Siparişleri Takip Et</h2>
            <p className="text-sm text-gray-600 text-center">Siparişleri görüntüle ve yönet</p>
          </Link>

          <Link
            to="/analytics"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">KPI - Veri Analizi</h2>
            <p className="text-sm text-gray-600 text-center">Detaylı raporlar ve analizler</p>
          </Link>

          <Link
            to="/supplier-module"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Tedarikçi Modülü</h2>
            <p className="text-sm text-gray-600 text-center">Tedarikçi yönetimi</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 