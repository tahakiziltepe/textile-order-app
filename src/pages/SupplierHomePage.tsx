import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupplierHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">Tekstil Sipariş Sistemi - Tedarikçi Paneli</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/supplier/orders')}
              className="flex flex-col items-center p-8 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition duration-150 group"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">Siparişleri Görüntüle</span>
              <p className="text-gray-500 mt-2 text-center">Size atanan siparişleri görüntüleyin ve tekliflerinizi yönetin</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 