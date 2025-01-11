import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Örnek tedarikçi listesi - gerçek uygulamada API'den gelecek
const SUPPLIERS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `X Tedarikçi | No: ${i + 1}`
}));

const PRODUCT_TYPES = ['Gömlek', 'Tişört', 'Ceket', 'Kaban', 'Mont', 'Kot Pantolon', 'Kumaş Pantolon'] as const;
const FABRIC_TYPES = ['Deri', 'Pamuk', 'Triko', 'Keten', 'Polyester'] as const;

type ProductType = typeof PRODUCT_TYPES[number];
type FabricType = typeof FABRIC_TYPES[number];

interface OrderFormData {
  orderName: string;
  quantity: number;
  season: string;
  dueDate: string;
  selectedSuppliers: number[];
  specificationFile: File | null;
  status: string;
  productType: ProductType | '';
  fabricType: FabricType | '';
}

const SEASONS = [
  { code: 'W4', name: 'Kış Sezonu 2024' },
  { code: 'S4', name: 'Yaz Sezonu 2024' },
  { code: 'W3', name: 'Kış Sezonu 2025' },
  { code: 'S3', name: 'Yaz Sezonu 2025' }
] as const;

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState<OrderFormData>({
    orderName: '',
    quantity: 0,
    season: '',
    dueDate: '',
    selectedSuppliers: [],
    specificationFile: null,
    status: 'Taslak',
    productType: '',
    fabricType: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSuppliers = SUPPLIERS.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSeasonSelect = (season: string) => {
    setFormData(prev => ({
      ...prev,
      season
    }));
    setError('');
  };

  const handleSupplierSelect = (supplierId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFormData(prev => ({
      ...prev,
      selectedSuppliers: prev.selectedSuppliers.includes(supplierId)
        ? prev.selectedSuppliers.filter(id => id !== supplierId)
        : [...prev.selectedSuppliers, supplierId]
    }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setError('Sadece PDF dosyası yükleyebilirsiniz.');
        return;
      }
      setFormData(prev => ({
        ...prev,
        specificationFile: file
      }));
      setError('');
    }
  };

  const handleProductTypeSelect = (type: ProductType) => {
    setFormData(prev => ({
      ...prev,
      productType: type
    }));
    setError('');
  };

  const handleFabricTypeSelect = (type: FabricType) => {
    setFormData(prev => ({
      ...prev,
      fabricType: type
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedSuppliers.length < 2) {
      setError('En az 2 tedarikçi seçmelisiniz.');
      return;
    }
    if (!formData.specificationFile) {
      setError('Teknik Dosya PDF dosyası yüklemeniz zorunludur.');
      return;
    }
    if (!formData.productType) {
      setError('Ürün tipi seçmelisiniz.');
      return;
    }
    if (!formData.fabricType) {
      setError('Kumaş tipi seçmelisiniz.');
      return;
    }
    console.log('Form data:', formData);
    navigate('/track-orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Yeni Sipariş Taslağı Oluştur</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ürün Adı</label>
                <input
                  type="text"
                  name="orderName"
                  value={formData.orderName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Miktar</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ürün Tipi</label>
                <select
                  value={formData.productType}
                  onChange={(e) => handleProductTypeSelect(e.target.value as ProductType)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                >
                  <option value="">Ürün tipi seçin</option>
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sezon</label>
                <select
                  value={formData.season}
                  onChange={(e) => handleSeasonSelect(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                >
                  <option value="">Sezon seçin</option>
                  {SEASONS.map((season) => (
                    <option key={season.code} value={season.code}>
                      {season.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">İstenen Termin Tarihi</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kumaş Tipi</label>
                <select
                  value={formData.fabricType}
                  onChange={(e) => handleFabricTypeSelect(e.target.value as FabricType)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  required
                >
                  <option value="">Kumaş tipi seçin</option>
                  {FABRIC_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teklif İstenecek Tedarikçiler
              <span className="text-sm font-normal text-gray-500 ml-2">(En az 2 tedarikçi seçilmeli)</span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <div className="flex flex-wrap items-center gap-2 p-3 border rounded-lg min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition duration-150">
                {formData.selectedSuppliers.map(id => (
                  <span
                    key={id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 transition duration-150 hover:bg-indigo-200"
                  >
                    {SUPPLIERS.find(s => s.id === id)?.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSupplierSelect(id, e);
                      }}
                      className="ml-2 text-indigo-500 hover:text-indigo-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={formData.selectedSuppliers.length === 0 ? "Tedarikçi ara..." : ""}
                  className="flex-1 outline-none min-w-[150px]"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredSuppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition duration-150"
                      onClick={(e) => handleSupplierSelect(supplier.id, e)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedSuppliers.includes(supplier.id)}
                        onChange={() => {}}
                        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-3"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-gray-700">{supplier.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teknik Dosya PDF
              <span className="text-sm font-normal text-gray-500 ml-2">(Zorunlu)</span>
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    {formData.specificationFile ? (
                      <span className="font-semibold">{formData.specificationFile.name}</span>
                    ) : (
                      <span>PDF dosyasını buraya sürükleyin veya seçin</span>
                    )}
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
            >
              Sipariş Taslağı Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 