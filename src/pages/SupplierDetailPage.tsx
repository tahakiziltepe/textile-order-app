import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DUMMY_SUPPLIERS, ContactPerson } from '../utils/dummyData';

interface NewContactFormData {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
}

interface NewNoteFormData {
  content: string;
}

export default function SupplierDetailPage() {
  const { supplierId } = useParams<{ supplierId: string }>();
  const [supplierData, setSupplierData] = useState(DUMMY_SUPPLIERS.find(s => s.id === supplierId));
  
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContactData, setNewContactData] = useState<NewContactFormData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    department: ''
  });

  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNoteData, setNewNoteData] = useState<NewNoteFormData>({
    content: ''
  });

  const [showStatusConfirm, setShowStatusConfirm] = useState(false);

  if (!supplierData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Tedarikçi Bulunamadı</h1>
      </div>
    );
  }

  const handleNewContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada yeni contact kişi ekleme işlemi yapılacak
    alert('Yeni iletişim kişisi ekleme özelliği yakında eklenecek');
    setShowNewContactForm(false);
  };

  const handleNewNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada yeni not ekleme işlemi yapılacak
    alert('Yeni not ekleme özelliği yakında eklenecek');
    setShowNewNoteForm(false);
  };

  const handleStatusChange = () => {
    const newStatus = supplierData.status === 'Aktif' ? 'Pasif' : 'Aktif';
    setSupplierData({
      ...supplierData,
      status: newStatus
    });
    setShowStatusConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Üst Bilgi Kartı */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{supplierData.name}</h1>
            <p className="text-gray-600 mt-2">{supplierData.address}</p>
            <p className="text-gray-600">{supplierData.city}, {supplierData.country}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              supplierData.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {supplierData.status}
            </span>
            <button
              onClick={() => setShowStatusConfirm(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Durumu Değiştir
            </button>
          </div>
        </div>

        {showStatusConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Durum Değiştirme Onayı</h3>
              <p className="text-gray-600 mb-6">
                Tedarikçinin durumunu {supplierData.status === 'Aktif' ? '"Pasif"' : '"Aktif"'} olarak değiştirmek istediğinizden emin misiniz?
                {supplierData.status === 'Aktif' && supplierData.activeOrders > 0 && (
                  <span className="text-red-600 block mt-2">
                    Dikkat: Tedarikçinin {supplierData.activeOrders} adet aktif siparişi bulunmaktadır!
                  </span>
                )}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowStatusConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  onClick={handleStatusChange}
                  className={`px-4 py-2 rounded ${
                    supplierData.status === 'Aktif'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {supplierData.status === 'Aktif' ? 'Pasife Al' : 'Aktif Yap'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {supplierData.description && (
          <p className="text-gray-700 mt-4">{supplierData.description}</p>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Değerlendirme</p>
            <p className="text-xl font-bold text-gray-900">{supplierData.rating}/5</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Zamanında Teslimat</p>
            <p className="text-xl font-bold text-gray-900">%{supplierData.onTimeDeliveryRate}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Toplam Sipariş</p>
            <p className="text-xl font-bold text-gray-900">{supplierData.totalOrders}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Aktif Sipariş</p>
            <p className="text-xl font-bold text-gray-900">{supplierData.activeOrders}</p>
          </div>
        </div>
      </div>

      {/* İletişim Kişileri */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">İletişim Kişileri</h2>
          <button
            onClick={() => setShowNewContactForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeni Kişi Ekle
          </button>
        </div>

        {showNewContactForm && (
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Yeni İletişim Kişisi</h3>
            <form onSubmit={handleNewContactSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ad Soyad"
                className="px-3 py-2 border rounded"
                value={newContactData.name}
                onChange={e => setNewContactData({...newContactData, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Ünvan"
                className="px-3 py-2 border rounded"
                value={newContactData.title}
                onChange={e => setNewContactData({...newContactData, title: e.target.value})}
              />
              <input
                type="email"
                placeholder="E-posta"
                className="px-3 py-2 border rounded"
                value={newContactData.email}
                onChange={e => setNewContactData({...newContactData, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Telefon"
                className="px-3 py-2 border rounded"
                value={newContactData.phone}
                onChange={e => setNewContactData({...newContactData, phone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Departman"
                className="px-3 py-2 border rounded"
                value={newContactData.department}
                onChange={e => setNewContactData({...newContactData, department: e.target.value})}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewContactForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplierData.contactPersons.map((contact) => (
            <div key={contact.id} className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.title}</p>
                </div>
                <span className="text-sm text-gray-500">{contact.department}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notlar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Notlar</h2>
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeni Not Ekle
          </button>
        </div>

        {showNewNoteForm && (
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Yeni Not</h3>
            <form onSubmit={handleNewNoteSubmit} className="space-y-4">
              <textarea
                placeholder="Not içeriği..."
                className="w-full px-3 py-2 border rounded h-32"
                value={newNoteData.content}
                onChange={e => setNewNoteData({...newNoteData, content: e.target.value})}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewNoteForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {supplierData.notes.map((note) => (
            <div key={note.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">{note.date}</span>
                <span className="text-sm font-medium text-gray-700">{note.author}</span>
              </div>
              <p className="text-gray-800">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sipariş Geçmişi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Geçmişi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sipariş No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ürün</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miktar</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teslimat</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Puan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yorum</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Durum</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supplierData.orderHistory.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{order.orderId}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.orderDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{order.product}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.quantity} {order.unit}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.deliveryDate}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`font-medium ${
                      order.rating >= 4 ? 'text-green-600' :
                      order.rating >= 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {order.rating}/5
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.comment}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                      order.status === 'İptal Edildi' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 