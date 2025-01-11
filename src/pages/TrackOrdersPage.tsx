import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrderStatus = 'Taslak' | 'Tedarikçilerden Fiyat Bekleniyor' | 'Tüm Tedarikçiler Teklif Verdi' | 'Yönetici Onayı Bekleniyor' | 'Onaylandı';
type OrderProgress = 'Sipariş Alındı' | 'Hazırlanıyor' | 'Kargo' | 'Teslim Edildi';

interface Order {
  id: string;
  orderName: string;
  quantity: number;
  season: string;
  dueDate: string;
  status: OrderStatus;
  suppliers: {
    supplierId: number;
    supplierName: string;
    isAccepted?: boolean;
    progress?: OrderProgress;
    hasQuote?: boolean;
  }[];
}

// Örnek siparişler - gerçek uygulamada API'den gelecek
const DUMMY_ORDERS: Order[] = [
  {
    id: '1',
    orderName: 'Örnek Sipariş 1',
    quantity: 1000,
    season: 'W4',
    dueDate: '2024-03-01',
    status: 'Taslak',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: false },
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: false },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: false }
    ]
  },
  {
    id: '2',
    orderName: 'Örnek Sipariş 2',
    quantity: 500,
    season: 'S4',
    dueDate: '2024-04-15',
    status: 'Tüm Tedarikçiler Teklif Verdi',
    suppliers: [
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: true }
    ]
  },
  {
    id: '3',
    orderName: 'Örnek Sipariş 3',
    quantity: 2000,
    season: 'W3',
    dueDate: '2024-05-30',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true },
      { supplierId: 5, supplierName: 'Tedarikçi 5', hasQuote: true }
    ]
  },
  {
    id: '4',
    orderName: 'Örnek Sipariş 4',
    quantity: 1500,
    season: 'S4',
    dueDate: '2024-06-15',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true }
    ]
  },
  {
    id: '5',
    orderName: 'Örnek Sipariş 5',
    quantity: 800,
    season: 'W4',
    dueDate: '2024-03-30',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true },
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: true }
    ]
  },
  {
    id: '6',
    orderName: 'Örnek Sipariş 6',
    quantity: 3000,
    season: 'S3',
    dueDate: '2024-02-28',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 5, supplierName: 'Tedarikçi 5', hasQuote: true }
    ]
  },
  {
    id: '7',
    orderName: 'Örnek Sipariş 7',
    quantity: 2500,
    season: 'W4',
    dueDate: '2024-07-15',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: false }
    ]
  },
  {
    id: '8',
    orderName: 'Örnek Sipariş 8',
    quantity: 1200,
    season: 'S4',
    dueDate: '2024-05-20',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    suppliers: [
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: false }
    ]
  },
  {
    id: '9',
    orderName: 'Örnek Sipariş 9',
    quantity: 1800,
    season: 'W3',
    dueDate: '2024-04-30',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 5, supplierName: 'Tedarikçi 5', hasQuote: true },
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true }
    ]
  },
  {
    id: '10',
    orderName: 'Örnek Sipariş 10',
    quantity: 3500,
    season: 'S4',
    dueDate: '2024-06-30',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: true }
    ]
  },
  {
    id: '11',
    orderName: 'Örnek Sipariş 11',
    quantity: 900,
    season: 'W4',
    dueDate: '2024-03-15',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true },
      { supplierId: 1, supplierName: 'Tedarikçi 1', hasQuote: true },
      { supplierId: 5, supplierName: 'Tedarikçi 5', hasQuote: true }
    ]
  },
  {
    id: '12',
    orderName: 'Örnek Sipariş 12',
    quantity: 4000,
    season: 'S3',
    dueDate: '2024-02-28',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: true }
    ]
  },
  {
    id: '13',
    orderName: 'Örnek Sipariş 13',
    quantity: 2500,
    season: 'W4',
    dueDate: '2024-04-15',
    status: 'Yönetici Onayı Bekleniyor',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', isAccepted: true, hasQuote: true },
      { supplierId: 2, supplierName: 'Tedarikçi 2', hasQuote: true }
    ]
  },
  {
    id: '14',
    orderName: 'Örnek Sipariş 14',
    quantity: 1800,
    season: 'S4',
    dueDate: '2024-05-01',
    status: 'Onaylandı',
    suppliers: [
      { supplierId: 3, supplierName: 'Tedarikçi 3', hasQuote: true },
      { supplierId: 4, supplierName: 'Tedarikçi 4', hasQuote: true }
    ]
  }
];

export default function TrackOrdersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = DUMMY_ORDERS.filter(order => {
    const matchesSearch = order.orderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Taslak':
        return 'bg-gray-100 text-gray-800';
      case 'Tedarikçilerden Fiyat Bekleniyor':
        return 'bg-yellow-100 text-yellow-800';
      case 'Tüm Tedarikçiler Teklif Verdi':
        return 'bg-blue-100 text-blue-800';
      case 'Yönetici Onayı Bekleniyor':
        return 'bg-purple-100 text-purple-800';
      case 'Onaylandı':
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
                <option value="Taslak">Taslak</option>
                <option value="Tedarikçilerden Fiyat Bekleniyor">Tedarikçilerden Fiyat Bekleniyor</option>
                <option value="Tüm Tedarikçiler Teklif Verdi">Tüm Tedarikçiler Teklif Verdi</option>
                <option value="Yönetici Onayı Bekleniyor">Yönetici Onayı Bekleniyor</option>
                <option value="Onaylandı">Onaylandı</option>
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
                    Tedarikçiler
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
                    onClick={() => navigate(`/order/${order.id}`)}
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
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.suppliers.length} Tedarikçi
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status === 'Tedarikçilerden Fiyat Bekleniyor' 
                          ? `${order.status} (${order.suppliers.filter(s => s.hasQuote).length}/${order.suppliers.length})`
                          : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.status === 'Yönetici Onayı Bekleniyor' && (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            getProgressColor(
                              order.suppliers.find(s => s.isAccepted)?.progress || 'Sipariş Alındı'
                            )
                          }`}
                        >
                          {order.suppliers.find(s => s.isAccepted)?.progress || 'Henüz Başlanmadı'}
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