import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type SupplierOrderStatus = 'İncelendi' | 'Fiyat Teklifi Verildi' | 'Fiyat Onaylandı';
type OrderProgress = 'Sipariş Alındı' | 'Hazırlanıyor' | 'Kargo' | 'Teslim Edildi';

interface SupplierOrder {
  id: string;
  orderName: string;
  quantity: number;
  season: string;
  dueDate: string;
  status: SupplierOrderStatus;
  productType: string;
  fabricType: string;
  quoteDate?: string;
  pricePerUnit?: number;
  promisedDate?: string;
  specificationFile: string;
  progress?: OrderProgress;
  progressDate?: string;
}

// Örnek siparişler - gerçek uygulamada API'den gelecek
const DUMMY_SUPPLIER_ORDERS: SupplierOrder[] = [
  {
    id: '1',
    orderName: 'Örnek Sipariş 1',
    quantity: 1000,
    season: 'Kış Sezonu 2024',
    dueDate: '2024-03-01',
    status: 'İncelendi',
    productType: 'Gömlek',
    fabricType: 'Pamuk',
    specificationFile: 'teknik-dosya-1.pdf'
  },
  {
    id: '2',
    orderName: 'Örnek Sipariş 2',
    quantity: 500,
    season: 'Yaz Sezonu 2024',
    dueDate: '2024-04-15',
    status: 'Fiyat Teklifi Verildi',
    productType: 'Mont',
    fabricType: 'Deri',
    quoteDate: '2024-01-15',
    pricePerUnit: 48,
    promisedDate: '2024-04-10',
    specificationFile: 'teknik-dosya-2.pdf'
  },
  {
    id: '3',
    orderName: 'Örnek Sipariş 3',
    quantity: 2000,
    season: 'Kış Sezonu 2025',
    dueDate: '2024-05-30',
    status: 'Fiyat Onaylandı',
    productType: 'Kot Pantolon',
    fabricType: 'Keten',
    quoteDate: '2024-01-10',
    pricePerUnit: 51,
    promisedDate: '2024-05-25',
    specificationFile: 'teknik-dosya-3.pdf',
    progress: 'Sipariş Alındı',
    progressDate: '2024-01-20'
  },
  {
    id: '4',
    orderName: 'Örnek Sipariş 4',
    quantity: 1500,
    season: 'Yaz Sezonu 2024',
    dueDate: '2024-06-15',
    status: 'Fiyat Onaylandı',
    productType: 'Gömlek',
    fabricType: 'Pamuk',
    quoteDate: '2024-01-05',
    pricePerUnit: 45,
    promisedDate: '2024-06-10',
    specificationFile: 'teknik-dosya-4.pdf',
    progress: 'Hazırlanıyor',
    progressDate: '2024-01-25'
  },
  {
    id: '5',
    orderName: 'Örnek Sipariş 5',
    quantity: 800,
    season: 'Kış Sezonu 2024',
    dueDate: '2024-03-30',
    status: 'Fiyat Onaylandı',
    productType: 'Ceket',
    fabricType: 'Polyester',
    quoteDate: '2023-12-20',
    pricePerUnit: 120,
    promisedDate: '2024-03-25',
    specificationFile: 'teknik-dosya-5.pdf',
    progress: 'Kargo',
    progressDate: '2024-01-28'
  },
  {
    id: '6',
    orderName: 'Örnek Sipariş 6',
    quantity: 3000,
    season: 'Yaz Sezonu 2025',
    dueDate: '2024-02-28',
    status: 'Fiyat Onaylandı',
    productType: 'Tişört',
    fabricType: 'Pamuk',
    quoteDate: '2023-12-15',
    pricePerUnit: 35,
    promisedDate: '2024-02-25',
    specificationFile: 'teknik-dosya-6.pdf',
    progress: 'Teslim Edildi',
    progressDate: '2024-01-30'
  },
  {
    id: '7',
    orderName: 'Örnek Sipariş 7',
    quantity: 2500,
    season: 'Kış Sezonu 2024',
    dueDate: '2024-07-15',
    status: 'İncelendi',
    productType: 'Ceket',
    fabricType: 'Deri',
    specificationFile: 'teknik-dosya-7.pdf'
  },
  {
    id: '8',
    orderName: 'Örnek Sipariş 8',
    quantity: 1200,
    season: 'Yaz Sezonu 2024',
    dueDate: '2024-05-20',
    status: 'Fiyat Teklifi Verildi',
    productType: 'Kumaş Pantolon',
    fabricType: 'Polyester',
    quoteDate: '2024-01-18',
    pricePerUnit: 65,
    promisedDate: '2024-05-15',
    specificationFile: 'teknik-dosya-8.pdf'
  },
  {
    id: '9',
    orderName: 'Örnek Sipariş 9',
    quantity: 1800,
    season: 'Kış Sezonu 2025',
    dueDate: '2024-04-30',
    status: 'Fiyat Onaylandı',
    productType: 'Mont',
    fabricType: 'Polyester',
    quoteDate: '2024-01-12',
    pricePerUnit: 95,
    promisedDate: '2024-04-25',
    specificationFile: 'teknik-dosya-9.pdf',
    progress: 'Sipariş Alındı',
    progressDate: '2024-01-22'
  },
  {
    id: '10',
    orderName: 'Örnek Sipariş 10',
    quantity: 3500,
    season: 'Yaz Sezonu 2024',
    dueDate: '2024-06-30',
    status: 'Fiyat Onaylandı',
    productType: 'Tişört',
    fabricType: 'Pamuk',
    quoteDate: '2024-01-08',
    pricePerUnit: 40,
    promisedDate: '2024-06-25',
    specificationFile: 'teknik-dosya-10.pdf',
    progress: 'Hazırlanıyor',
    progressDate: '2024-01-27'
  },
  {
    id: '11',
    orderName: 'Örnek Sipariş 11',
    quantity: 900,
    season: 'Kış Sezonu 2024',
    dueDate: '2024-03-15',
    status: 'Fiyat Onaylandı',
    productType: 'Gömlek',
    fabricType: 'Keten',
    quoteDate: '2024-01-05',
    pricePerUnit: 75,
    promisedDate: '2024-03-10',
    specificationFile: 'teknik-dosya-11.pdf',
    progress: 'Kargo',
    progressDate: '2024-01-29'
  },
  {
    id: '12',
    orderName: 'Örnek Sipariş 12',
    quantity: 4000,
    season: 'Yaz Sezonu 2025',
    dueDate: '2024-02-28',
    status: 'Fiyat Onaylandı',
    productType: 'Tişört',
    fabricType: 'Denim',
    quoteDate: '2023-12-20',
    pricePerUnit: 55,
    promisedDate: '2024-02-10',
    specificationFile: 'teknik-dosya-12.pdf',
    progress: 'Teslim Edildi',
    progressDate: '2024-01-31'
  }
];

export default function SupplierOrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<SupplierOrder | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    pricePerUnit: '',
    promisedDate: ''
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const foundOrder = DUMMY_SUPPLIER_ORDERS.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.pricePerUnit || !quoteForm.promisedDate) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    // Gerçek uygulamada API'ye gönderilecek
    setOrder(prev => prev ? {
      ...prev,
      status: 'Fiyat Teklifi Verildi',
      pricePerUnit: parseFloat(quoteForm.pricePerUnit),
      promisedDate: quoteForm.promisedDate,
      quoteDate: new Date().toISOString().split('T')[0]
    } : null);
  };

  const getStatusColor = (status: SupplierOrderStatus) => {
    switch (status) {
      case 'İncelendi':
        return 'bg-blue-100 text-blue-800';
      case 'Fiyat Teklifi Verildi':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fiyat Onaylandı':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysSinceQuote = (quoteDate: string) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(quoteDate).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleProgressUpdate = (newProgress: OrderProgress) => {
    setOrder(prev => prev ? {
      ...prev,
      progress: newProgress,
      progressDate: new Date().toISOString().split('T')[0]
    } : null);
  };

  const getProgressColor = (progress: OrderProgress) => {
    switch (progress) {
      case 'Sipariş Alındı':
        return 'bg-purple-100 text-purple-800';
      case 'Hazırlanıyor':
        return 'bg-blue-100 text-blue-800';
      case 'Kargo':
        return 'bg-orange-100 text-orange-800';
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-center text-gray-500">Sipariş bulunamadı.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{order.orderName}</h1>
              <p className="text-gray-500 mt-2">Sipariş No: {order.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Miktar</h3>
                <p className="mt-1 text-lg font-semibold">{order.quantity} adet</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sezon</h3>
                <p className="mt-1 text-lg font-semibold">{order.season}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ürün Tipi</h3>
                <p className="mt-1 text-lg font-semibold">{order.productType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kumaş Tipi</h3>
                <p className="mt-1 text-lg font-semibold">{order.fabricType}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">İstenen Termin Tarihi</h3>
                <p className="mt-1 text-lg font-semibold">
                  {new Date(order.dueDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Teknik Dosya</h3>
                <a
                  href="#"
                  className="mt-1 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {order.specificationFile}
                </a>
              </div>
            </div>
          </div>

          {order.status === 'İncelendi' && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Fiyat Teklifi Ver</h2>
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birim Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={quoteForm.pricePerUnit}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Termin Tarihi
                    </label>
                    <input
                      type="date"
                      value={quoteForm.promisedDate}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, promisedDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                  >
                    Teklif Ver
                  </button>
                </div>
              </form>
            </div>
          )}

          {(order.status === 'Fiyat Teklifi Verildi' || order.status === 'Fiyat Onaylandı') && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Verilen Teklif</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Birim Fiyat</h3>
                    <p className="mt-1 text-lg font-semibold">{order.pricePerUnit} TL</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Toplam Fiyat</h3>
                    <p className="mt-1 text-lg font-semibold">{order.pricePerUnit! * order.quantity} TL</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Vaad Edilen Termin</h3>
                    <p className="mt-1 text-lg font-semibold">
                      {new Date(order.promisedDate!).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Teklif Tarihi</h3>
                    <p className="mt-1 text-lg font-semibold">
                      {new Date(order.quoteDate!).toLocaleDateString('tr-TR')}
                      <span className="ml-2 text-sm text-gray-500">
                        ({getDaysSinceQuote(order.quoteDate!)} gün önce)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {order.status === 'Fiyat Onaylandı' && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Durumu</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">Mevcut Durum:</span>
                  {order.progress ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(order.progress)}`}>
                      {order.progress}
                    </span>
                  ) : (
                    <span className="text-gray-500">Henüz başlanmadı</span>
                  )}
                  {order.progressDate && (
                    <span className="text-sm text-gray-500">
                      (Son güncelleme: {new Date(order.progressDate).toLocaleDateString('tr-TR')})
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['Sipariş Alındı', 'Hazırlanıyor', 'Kargo', 'Teslim Edildi'] as OrderProgress[]).map((progress) => (
                    <button
                      key={progress}
                      onClick={() => handleProgressUpdate(progress)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition duration-150 ${
                        order.progress === progress
                          ? getProgressColor(progress)
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {progress}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 