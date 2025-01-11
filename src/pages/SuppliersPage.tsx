import React, { useEffect, useState } from 'react';
import { DUMMY_SUPPLIERS, Supplier } from '../utils/dummyData';
import { useNavigate } from 'react-router-dom';

export default function SuppliersPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'Tümü' | 'Aktif' | 'Pasif'>('Tümü');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = DUMMY_SUPPLIERS.filter(supplier => {
    const matchesStatus = statusFilter === 'Tümü' || supplier.status === statusFilter;
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tedarikçi Listesi</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Tedarikçi ara..."
            className="px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'Tümü' | 'Aktif' | 'Pasif')}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="Tümü">Tümü</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tedarikçi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uzmanlık Alanları</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Değerlendirme</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Zamanında Teslimat</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Sipariş</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aktif Sipariş</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tamamlanan</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <tr 
                key={supplier.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/supplier/${supplier.id}`)}
              >
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{supplier.name}</span>
                    <span className="text-sm text-gray-500">{supplier.city}, {supplier.country}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col text-sm">
                    <span>{supplier.contactPersons[0]?.name || '-'}</span>
                    <span className="text-gray-500">{supplier.contactPersons[0]?.email || '-'}</span>
                    <span className="text-gray-500">{supplier.contactPersons[0]?.phone || '-'}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {supplier.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`font-medium ${
                    supplier.rating >= 4.5 ? 'text-green-600' :
                    supplier.rating >= 4.0 ? 'text-blue-600' :
                    supplier.rating >= 3.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {supplier.rating}/5
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`font-medium ${
                    supplier.onTimeDeliveryRate >= 95 ? 'text-green-600' :
                    supplier.onTimeDeliveryRate >= 90 ? 'text-blue-600' :
                    supplier.onTimeDeliveryRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    %{supplier.onTimeDeliveryRate}
                  </span>
                </td>
                <td className="px-4 py-4 text-center font-medium text-gray-900">
                  {supplier.totalOrders}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`font-medium ${supplier.activeOrders > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                    {supplier.activeOrders}
                  </span>
                </td>
                <td className="px-4 py-4 text-center font-medium text-gray-900">
                  {supplier.completedOrders}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    supplier.status === 'Aktif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 