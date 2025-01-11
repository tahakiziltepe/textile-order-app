import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type OrderProgress = 'Sipariş Alındı' | 'Hazırlanıyor' | 'Kargo' | 'Teslim Edildi';

interface SupplierQuote {
  supplierId: number;
  supplierName: string;
  pricePerUnit?: number;
  promisedDate?: string;
  isAccepted?: boolean;
  hasQuote?: boolean;
  progress?: OrderProgress;
  progressDate?: string;
}

type OrderStatus = 'Taslak' | 'Tedarikçilerden Fiyat Bekleniyor' | 'Tüm Tedarikçiler Teklif Verdi' | 'Yönetici Onayı Bekleniyor' | 'Onaylandı';

type ProductType = 'Gömlek' | 'Tişört' | 'Ceket' | 'Kaban' | 'Mont' | 'Kot Pantolon' | 'Kumaş Pantolon';
type FabricType = 'Deri' | 'Pamuk' | 'Triko' | 'Keten' | 'Polyester' | 'Denim';

interface Order {
  id: string;
  orderName: string;
  quantity: number;
  season: string;
  dueDate: string;
  status: OrderStatus;
  specificationFile: string;
  productType: ProductType;
  fabricType: FabricType;
  suppliers: SupplierQuote[];
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
    specificationFile: 'teknik-dosya-1.pdf',
    productType: 'Gömlek',
    fabricType: 'Pamuk',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', pricePerUnit: 50, hasQuote: false },
      { supplierId: 2, supplierName: 'Tedarikçi 2', pricePerUnit: 45, hasQuote: false },
      { supplierId: 3, supplierName: 'Tedarikçi 3', pricePerUnit: 55, hasQuote: false }
    ]
  },
  {
    id: '2',
    orderName: 'Örnek Sipariş 2',
    quantity: 500,
    season: 'S4',
    dueDate: '2024-04-15',
    status: 'Tüm Tedarikçiler Teklif Verdi',
    productType: 'Mont',
    fabricType: 'Deri',
    specificationFile: 'teknik-dosya-2.pdf',
    suppliers: [
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 48, 
        hasQuote: true,
        promisedDate: '2024-04-10'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        pricePerUnit: 52, 
        hasQuote: true,
        promisedDate: '2024-04-12'
      }
    ]
  },
  {
    id: '3',
    orderName: 'Örnek Sipariş 3',
    quantity: 2000,
    season: 'W3',
    dueDate: '2024-05-30',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Kot Pantolon',
    fabricType: 'Keten',
    specificationFile: 'teknik-dosya-3.pdf',
    suppliers: [
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 47, 
        hasQuote: true,
        promisedDate: '2024-05-28'
      },
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 51, 
        hasQuote: true, 
        isAccepted: true,
        promisedDate: '2024-05-25',
        progress: 'Sipariş Alındı',
        progressDate: '2024-01-20'
      },
      { 
        supplierId: 5, 
        supplierName: 'Tedarikçi 5', 
        pricePerUnit: 53, 
        hasQuote: true,
        promisedDate: '2024-05-30'
      }
    ]
  },
  {
    id: '4',
    orderName: 'Örnek Sipariş 4',
    quantity: 1500,
    season: 'S4',
    dueDate: '2024-06-15',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Gömlek',
    fabricType: 'Pamuk',
    specificationFile: 'teknik-dosya-4.pdf',
    suppliers: [
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 45, 
        hasQuote: true,
        promisedDate: '2024-06-10',
        isAccepted: true,
        progress: 'Hazırlanıyor',
        progressDate: '2024-01-25'
      },
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 48, 
        hasQuote: true,
        promisedDate: '2024-06-12'
      },
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 47, 
        hasQuote: true,
        promisedDate: '2024-06-14'
      }
    ]
  },
  {
    id: '5',
    orderName: 'Örnek Sipariş 5',
    quantity: 800,
    season: 'W4',
    dueDate: '2024-03-30',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Ceket',
    fabricType: 'Polyester',
    specificationFile: 'teknik-dosya-5.pdf',
    suppliers: [
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 120, 
        hasQuote: true,
        promisedDate: '2024-03-25',
        isAccepted: true,
        progress: 'Kargo',
        progressDate: '2024-01-28'
      },
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 125, 
        hasQuote: true,
        promisedDate: '2024-03-28'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        pricePerUnit: 118, 
        hasQuote: true,
        promisedDate: '2024-03-29'
      }
    ]
  },
  {
    id: '6',
    orderName: 'Örnek Sipariş 6',
    quantity: 3000,
    season: 'S3',
    dueDate: '2024-02-28',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Tişört',
    fabricType: 'Pamuk',
    specificationFile: 'teknik-dosya-6.pdf',
    suppliers: [
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 35, 
        hasQuote: true,
        promisedDate: '2024-02-25',
        isAccepted: true,
        progress: 'Teslim Edildi',
        progressDate: '2024-01-30'
      },
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 38, 
        hasQuote: true,
        promisedDate: '2024-02-26'
      },
      { 
        supplierId: 5, 
        supplierName: 'Tedarikçi 5', 
        pricePerUnit: 36, 
        hasQuote: true,
        promisedDate: '2024-02-27'
      }
    ]
  },
  {
    id: '7',
    orderName: 'Örnek Sipariş 7',
    quantity: 2500,
    season: 'W4',
    dueDate: '2024-07-15',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    productType: 'Ceket',
    fabricType: 'Deri',
    specificationFile: 'teknik-dosya-7.pdf',
    suppliers: [
      { supplierId: 1, supplierName: 'Tedarikçi 1', pricePerUnit: 150, hasQuote: true },
      { supplierId: 3, supplierName: 'Tedarikçi 3', pricePerUnit: 145, hasQuote: false }
    ]
  },
  {
    id: '8',
    orderName: 'Örnek Sipariş 8',
    quantity: 1200,
    season: 'S4',
    dueDate: '2024-05-20',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    productType: 'Kumaş Pantolon',
    fabricType: 'Polyester',
    specificationFile: 'teknik-dosya-8.pdf',
    suppliers: [
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 65, 
        hasQuote: true,
        promisedDate: '2024-05-15'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        pricePerUnit: 68,
        hasQuote: false
      }
    ]
  },
  {
    id: '9',
    orderName: 'Örnek Sipariş 9',
    quantity: 1800,
    season: 'W3',
    dueDate: '2024-04-30',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Mont',
    fabricType: 'Polyester',
    specificationFile: 'teknik-dosya-9.pdf',
    suppliers: [
      { 
        supplierId: 5, 
        supplierName: 'Tedarikçi 5', 
        pricePerUnit: 95, 
        hasQuote: true,
        promisedDate: '2024-04-25',
        isAccepted: true,
        progress: 'Sipariş Alındı',
        progressDate: '2024-01-22'
      },
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 98, 
        hasQuote: true,
        promisedDate: '2024-04-28'
      },
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 92, 
        hasQuote: true,
        promisedDate: '2024-04-27'
      }
    ]
  },
  {
    id: '10',
    orderName: 'Örnek Sipariş 10',
    quantity: 3500,
    season: 'S4',
    dueDate: '2024-06-30',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Tişört',
    fabricType: 'Pamuk',
    specificationFile: 'teknik-dosya-10.pdf',
    suppliers: [
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 40, 
        hasQuote: true,
        promisedDate: '2024-06-25',
        isAccepted: true,
        progress: 'Hazırlanıyor',
        progressDate: '2024-01-27'
      },
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 42, 
        hasQuote: true,
        promisedDate: '2024-06-28'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        pricePerUnit: 41, 
        hasQuote: true,
        promisedDate: '2024-06-27'
      }
    ]
  },
  {
    id: '11',
    orderName: 'Örnek Sipariş 11',
    quantity: 900,
    season: 'W4',
    dueDate: '2024-03-15',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Gömlek',
    fabricType: 'Keten',
    specificationFile: 'teknik-dosya-11.pdf',
    suppliers: [
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 75, 
        hasQuote: true,
        promisedDate: '2024-03-10',
        isAccepted: true,
        progress: 'Kargo',
        progressDate: '2024-01-29'
      },
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        pricePerUnit: 78, 
        hasQuote: true,
        promisedDate: '2024-03-12'
      },
      { 
        supplierId: 5, 
        supplierName: 'Tedarikçi 5', 
        pricePerUnit: 73, 
        hasQuote: true,
        promisedDate: '2024-03-14'
      }
    ]
  },
  {
    id: '12',
    orderName: 'Örnek Sipariş 12',
    quantity: 4000,
    season: 'S3',
    dueDate: '2024-02-28',
    status: 'Yönetici Onayı Bekleniyor',
    productType: 'Tişört',
    fabricType: 'Denim',
    specificationFile: 'teknik-dosya-12.pdf',
    suppliers: [
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        pricePerUnit: 55, 
        hasQuote: true,
        promisedDate: '2024-02-10',
        isAccepted: true,
        progress: 'Teslim Edildi',
        progressDate: '2024-01-31'
      },
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        pricePerUnit: 58, 
        hasQuote: true,
        promisedDate: '2024-02-12'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        pricePerUnit: 54, 
        hasQuote: true,
        promisedDate: '2024-02-15'
      }
    ]
  },
  {
    id: '13',
    orderName: 'Örnek Sipariş 13',
    quantity: 2500,
    season: 'W4',
    dueDate: '2024-04-15',
    status: 'Yönetici Onayı Bekleniyor',
    specificationFile: 'teknik-dosya-13.pdf',
    productType: 'Gömlek',
    fabricType: 'Pamuk',
    suppliers: [
      { 
        supplierId: 1, 
        supplierName: 'Tedarikçi 1', 
        isAccepted: true, 
        hasQuote: true,
        pricePerUnit: 45,
        promisedDate: '2024-04-10'
      },
      { 
        supplierId: 2, 
        supplierName: 'Tedarikçi 2', 
        hasQuote: true,
        pricePerUnit: 48,
        promisedDate: '2024-04-12'
      }
    ]
  },
  {
    id: '14',
    orderName: 'Örnek Sipariş 14',
    quantity: 1800,
    season: 'S4',
    dueDate: '2024-05-01',
    status: 'Onaylandı',
    specificationFile: 'teknik-dosya-14.pdf',
    productType: 'Tişört',
    fabricType: 'Pamuk',
    suppliers: [
      { 
        supplierId: 3, 
        supplierName: 'Tedarikçi 3', 
        isAccepted: true, 
        progress: 'Sipariş Alındı',
        hasQuote: true,
        pricePerUnit: 35,
        promisedDate: '2024-04-25'
      },
      { 
        supplierId: 4, 
        supplierName: 'Tedarikçi 4', 
        hasQuote: true,
        pricePerUnit: 38,
        promisedDate: '2024-04-28'
      }
    ]
  }
];

// Progress badge renklerini belirle
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

const getProgressStepStatus = (currentProgress: OrderProgress | undefined, step: OrderProgress) => {
  if (!currentProgress) return 'incomplete';
  
  const steps: OrderProgress[] = ['Sipariş Alındı', 'Hazırlanıyor', 'Kargo', 'Teslim Edildi'];
  const currentIndex = steps.indexOf(currentProgress);
  const stepIndex = steps.indexOf(step);
  
  if (stepIndex <= currentIndex) return 'completed';
  return 'incomplete';
};

const ProgressBar = ({ currentProgress }: { currentProgress: OrderProgress | undefined }) => {
  const steps: OrderProgress[] = ['Sipariş Alındı', 'Hazırlanıyor', 'Kargo', 'Teslim Edildi'];
  
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                getProgressStepStatus(currentProgress, step) === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {getProgressStepStatus(currentProgress, step) === 'completed' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm ${
                getProgressStepStatus(currentProgress, step) === 'completed'
                  ? 'text-green-500 font-medium'
                  : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 ${
                getProgressStepStatus(currentProgress, steps[index + 1]) === 'completed'
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    orderName: '',
    quantity: 0,
    season: '',
    dueDate: '',
    productType: '',
    fabricType: '',
    selectedSuppliers: [] as number[]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);

  // Tüm tedarikçiler listesi
  const ALL_SUPPLIERS = [
    { supplierId: 1, supplierName: 'Tedarikçi 1' },
    { supplierId: 2, supplierName: 'Tedarikçi 2' },
    { supplierId: 3, supplierName: 'Tedarikçi 3' },
    { supplierId: 4, supplierName: 'Tedarikçi 4' },
    { supplierId: 5, supplierName: 'Tedarikçi 5' }
  ];

  // Tedarikçi arama ve filtreleme
  const filteredSuppliers = ALL_SUPPLIERS.filter(supplier => 
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !editForm.selectedSuppliers.includes(supplier.supplierId)
  );

  useEffect(() => {
    const foundOrder = DUMMY_ORDERS.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      if (foundOrder.status === 'Taslak') {
        setEditForm({
          orderName: foundOrder.orderName,
          quantity: foundOrder.quantity,
          season: foundOrder.season,
          dueDate: foundOrder.dueDate,
          productType: foundOrder.productType,
          fabricType: foundOrder.fabricType,
          selectedSuppliers: foundOrder.suppliers.map(s => s.supplierId)
        });
      }
      // Eğer sipariş onaylanmışsa, kabul edilen tedarikçiyi seç
      const acceptedSupplier = foundOrder.suppliers.find(s => s.isAccepted);
      if (acceptedSupplier) {
        setSelectedSupplier(acceptedSupplier.supplierId);
      }

      // Tüm tedarikçilerin teklif verip vermediğini kontrol et
      if (foundOrder.status === 'Tedarikçilerden Fiyat Bekleniyor') {
        const allSuppliersQuoted = foundOrder.suppliers.every(s => s.hasQuote);
        if (allSuppliersQuoted) {
          setOrder(prev => prev ? {
            ...prev,
            status: 'Tüm Tedarikçiler Teklif Verdi'
          } : null);
        }
      }
    }
  }, [orderId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editForm.selectedSuppliers.length < 2) {
      alert('En az 2 tedarikçi seçmelisiniz.');
      return;
    }

    setOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orderName: editForm.orderName,
        quantity: editForm.quantity,
        season: editForm.season,
        dueDate: editForm.dueDate,
        productType: editForm.productType as ProductType,
        fabricType: editForm.fabricType as FabricType,
        suppliers: ALL_SUPPLIERS
          .filter(s => editForm.selectedSuppliers.includes(s.supplierId))
          .map(s => ({
            supplierId: s.supplierId,
            supplierName: s.supplierName,
            hasQuote: false,
            pricePerUnit: 0
          }))
      };
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (order) {
      setEditForm({
        orderName: order.orderName,
        quantity: order.quantity,
        season: order.season,
        dueDate: order.dueDate,
        productType: order.productType,
        fabricType: order.fabricType,
        selectedSuppliers: order.suppliers.map(s => s.supplierId)
      });
    }
    setIsEditing(false);
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

  const handleSendToSuppliers = () => {
    setOrder(prev => prev ? {
      ...prev,
      status: 'Tedarikçilerden Fiyat Bekleniyor'
    } : null);
  };

  const handleAcceptQuote = (supplierId: number) => {
    if (order.status !== 'Tedarikçilerden Fiyat Bekleniyor' && order.status !== 'Tüm Tedarikçiler Teklif Verdi') {
      return;
    }
    setSelectedSupplier(supplierId);
    setOrder(prev => prev ? {
      ...prev,
      status: 'Yönetici Onayı Bekleniyor',
      suppliers: prev.suppliers.map(s => ({
        ...s,
        isAccepted: s.supplierId === supplierId
      }))
    } : null);
  };

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

  const handleManagerApproval = () => {
    setOrder(prevOrder => {
      if (prevOrder) {
        return {
          ...prevOrder,
          status: 'Onaylandı'
        };
      }
      return prevOrder;
    });
    setShowApprovalConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.orderName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, orderName: e.target.value }))}
                  className="text-3xl font-bold text-gray-900 border rounded px-2 py-1"
                />
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">{order.orderName}</h1>
                  <p className="text-gray-500 mt-2">Sipariş No: {order.id}</p>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {order.status === 'Yönetici Onayı Bekleniyor' && (
                  <button
                    onClick={() => setShowApprovalConfirm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Onayla
                  </button>
                )}
              </div>
              {order.status === 'Taslak' && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Düzenle
                </button>
              )}
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    İptal
                  </button>
                </div>
              )}
              {order.status === 'Taslak' && !isEditing && (
                <button
                  onClick={handleSendToSuppliers}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Tedarikçilere Gönder
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Miktar</h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    className="mt-1 text-lg font-semibold border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="mt-1 text-lg font-semibold">{order.quantity} adet</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sezon</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.season}
                    onChange={(e) => setEditForm(prev => ({ ...prev, season: e.target.value }))}
                    className="mt-1 text-lg font-semibold border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="mt-1 text-lg font-semibold">{order.season}</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ürün Tipi</h3>
                {isEditing ? (
                  <select
                    value={editForm.productType}
                    onChange={(e) => setEditForm(prev => ({ ...prev, productType: e.target.value }))}
                    className="mt-1 text-lg font-semibold border rounded px-2 py-1 w-full"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Gömlek">Gömlek</option>
                    <option value="Tişört">Tişört</option>
                    <option value="Ceket">Ceket</option>
                    <option value="Kaban">Kaban</option>
                    <option value="Mont">Mont</option>
                    <option value="Kot Pantolon">Kot Pantolon</option>
                    <option value="Kumaş Pantolon">Kumaş Pantolon</option>
                  </select>
                ) : (
                  <p className="mt-1 text-lg font-semibold">{order.productType}</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kumaş Tipi</h3>
                {isEditing ? (
                  <select
                    value={editForm.fabricType}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fabricType: e.target.value }))}
                    className="mt-1 text-lg font-semibold border rounded px-2 py-1 w-full"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Deri">Deri</option>
                    <option value="Pamuk">Pamuk</option>
                    <option value="Triko">Triko</option>
                    <option value="Keten">Keten</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Denim">Denim</option>
                  </select>
                ) : (
                  <p className="mt-1 text-lg font-semibold">{order.fabricType}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Termin Tarihi</h3>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="mt-1 text-lg font-semibold border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="mt-1 text-lg font-semibold">{new Date(order.dueDate).toLocaleDateString('tr-TR')}</p>
                )}
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
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tedarikçiler</h3>
                {isEditing ? (
                  <div className="mt-2 space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tedarikçi ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      {searchTerm && filteredSuppliers.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
                          {filteredSuppliers.map(supplier => (
                            <button
                              key={supplier.supplierId}
                              onClick={() => {
                                setEditForm(prev => ({
                                  ...prev,
                                  selectedSuppliers: [...prev.selectedSuppliers, supplier.supplierId]
                                }));
                                setSearchTerm('');
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                              {supplier.supplierName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editForm.selectedSuppliers.map(supplierId => {
                        const supplier = ALL_SUPPLIERS.find(s => s.supplierId === supplierId);
                        if (!supplier) return null;
                        return (
                          <span
                            key={supplier.supplierId}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                          >
                            {supplier.supplierName}
                            <button
                              onClick={() => {
                                setEditForm(prev => ({
                                  ...prev,
                                  selectedSuppliers: prev.selectedSuppliers.filter(id => id !== supplier.supplierId)
                                }));
                              }}
                              className="ml-1 text-indigo-600 hover:text-indigo-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                    {editForm.selectedSuppliers.length < 2 && (
                      <p className="text-red-500 text-sm">En az 2 tedarikçi seçmelisiniz</p>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {order.suppliers.map(supplier => (
                      <span
                        key={supplier.supplierId}
                        className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {supplier.supplierName}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            {order.status === 'Onaylandı' && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Durumu</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Mevcut Durum:</span>
                    {order.suppliers.find(s => s.isAccepted)?.progress ? (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(order.suppliers.find(s => s.isAccepted)?.progress!)}`}>
                        {order.suppliers.find(s => s.isAccepted)?.progress}
                      </span>
                    ) : (
                      <span className="text-gray-500">Henüz başlanmadı</span>
                    )}
                    {order.suppliers.find(s => s.isAccepted)?.progressDate && (
                      <span className="text-sm text-gray-500">
                        (Son güncelleme: {new Date(order.suppliers.find(s => s.isAccepted)?.progressDate!).toLocaleDateString('tr-TR')})
                      </span>
                    )}
                  </div>
                  <ProgressBar currentProgress={order.suppliers.find(s => s.isAccepted)?.progress} />
                </div>
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-900 mb-6">Tedarikçi Teklifleri</h2>
            {order.status === 'Taslak' ? (
              <p className="text-gray-500 text-center py-8">
                Tedarikçi tekliflerini görüntülemek için siparişi tedarikçilere göndermeniz gerekmektedir.
              </p>
            ) : (
              <div className="space-y-4">
                {order.suppliers
                  .sort((a, b) => {
                    // Onaylanan tedarikçi en üstte
                    if (a.isAccepted) return -1;
                    if (b.isAccepted) return 1;
                    // Teklif verenler teklif vermeyenlerden önce
                    if (a.hasQuote && !b.hasQuote) return -1;
                    if (!a.hasQuote && b.hasQuote) return 1;
                    return 0;
                  })
                  .map((supplier) => (
                  <div
                    key={supplier.supplierId}
                    className={`p-6 rounded-lg border ${
                      supplier.isAccepted
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-indigo-500'
                    } transition-all duration-200`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{supplier.supplierName}</h3>
                        {supplier.hasQuote ? (
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-600">
                              Birim Fiyat: <span className="font-semibold">{supplier.pricePerUnit} TL</span>
                            </p>
                            <p className="text-gray-600">
                              Toplam Fiyat:{' '}
                              <span className="font-semibold">{(supplier.pricePerUnit || 0) * order.quantity} TL</span>
                            </p>
                            <p className="text-gray-600">
                              Termin Tarihi:{' '}
                              <span className="font-semibold">
                                {new Date(supplier.promisedDate!).toLocaleDateString('tr-TR')}
                              </span>
                              {supplier.promisedDate && new Date(supplier.promisedDate) > new Date(order.dueDate) && (
                                <span className="ml-2 text-red-500 text-sm">
                                  (İstenen tarihten {Math.ceil((new Date(supplier.promisedDate).getTime() - new Date(order.dueDate).getTime()) / (1000 * 60 * 60 * 24))} gün geç)
                                </span>
                              )}
                            </p>
                          </div>
                        ) : (
                          <p className="mt-2 text-gray-500">Henüz teklif vermedi</p>
                        )}
                      </div>
                      {supplier.hasQuote && (order.status === 'Tedarikçilerden Fiyat Bekleniyor' || order.status === 'Tüm Tedarikçiler Teklif Verdi') && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleAcceptQuote(supplier.supplierId)}
                            disabled={selectedSupplier !== null}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              supplier.isAccepted
                                ? 'bg-green-500 text-white'
                                : selectedSupplier !== null
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            } transition-colors duration-200`}
                          >
                            {supplier.isAccepted
                              ? 'Teklif Kabul Edildi'
                              : selectedSupplier !== null
                              ? 'Kapalı'
                              : 'Teklifi Kabul Et'}
                          </button>
                          {!supplier.isAccepted && selectedSupplier === null && (
                            <button
                              onClick={() => alert('Revize fiyat isteme özelliği yakında eklenecek')}
                              className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200"
                            >
                              Revize Fiyat İste
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showApprovalConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Sipariş Onay Konfirmasyonu</h3>
                <p className="text-gray-600 mb-6">
                  Bu siparişi onaylamak istediğinizden emin misiniz? Onaylandıktan sonra tedarikçi sipariş sürecini başlatabilecek.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowApprovalConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleManagerApproval}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Onayla
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 