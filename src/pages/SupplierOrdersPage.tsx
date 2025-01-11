import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SupplierOrderStatus = 'Yeni Teklif' | 'İncelendi' | 'Fiyat Teklifi Verildi' | 'Fiyat Onaylandı';
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
    status: 'Yeni Teklif',
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

export default function SupplierOrdersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = DUMMY_SUPPLIER_ORDERS.filter(order => {
    const matchesSearch = order.orderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: SupplierOrderStatus) => {
    switch (status) {
      case 'Yeni Teklif':
        return 'bg-purple-100 text-purple-800';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Siparişleri Takip Et</h1>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sipariş ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Tüm Durumlar</option>
                <option value="Yeni Teklif">Yeni Teklif</option>
                <option value="İncelendi">İncelendi</option>
                <option value="Fiyat Teklifi Verildi">Fiyat Teklifi Verildi</option>
                <option value="Fiyat Onaylandı">Fiyat Onaylandı</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miktar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sezon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Termin Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş Durumu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/supplier/order/${order.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.season}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.dueDate).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.status === 'Fiyat Onaylandı' && (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            getProgressColor(order.progress || 'Sipariş Alındı')
                          }`}
                        >
                          {order.progress || 'Henüz Başlanmadı'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 