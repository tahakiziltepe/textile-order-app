// Dummy sipariş verileri
const DUMMY_ORDERS = [
  {
    id: '1',
    orderName: 'Pamuklu Gömlek Siparişi',
    status: 'Taslak',
    dueDate: '2024-03-01',
    suppliers: []
  },
  {
    id: '2',
    orderName: 'Keten Pantolon Siparişi',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    dueDate: '2024-02-15',
    suppliers: [
      { supplierName: 'ABC Tekstil', hasQuote: true },
      { supplierName: 'XYZ Kumaş', hasQuote: false }
    ]
  },
  {
    id: '3',
    orderName: 'Deri Mont Siparişi',
    status: 'Tüm Tedarikçiler Teklif Verdi',
    dueDate: '2024-02-20',
    suppliers: [
      { supplierName: 'ABC Tekstil', hasQuote: true },
      { supplierName: 'DEF Tekstil', hasQuote: true }
    ]
  },
  {
    id: '4',
    orderName: 'Kot Pantolon Siparişi',
    status: 'Fiyat Onaylandı',
    dueDate: '2024-03-10',
    suppliers: [
      { supplierName: 'XYZ Kumaş', hasQuote: true, isAccepted: true },
      { supplierName: 'DEF Tekstil', hasQuote: true }
    ]
  },
  {
    id: '5',
    orderName: 'Polyester Tişört Siparişi',
    status: 'Fiyat Onaylandı',
    dueDate: '2024-01-15',
    suppliers: [
      { supplierName: 'ABC Tekstil', hasQuote: true, isAccepted: true },
      { supplierName: 'XYZ Kumaş', hasQuote: true }
    ]
  },
  {
    id: '6',
    orderName: 'İpek Gömlek Siparişi',
    status: 'Fiyat Onaylandı',
    dueDate: '2024-01-20',
    suppliers: [
      { supplierName: 'ABC Tekstil', hasQuote: true, isAccepted: true },
      { supplierName: 'DEF Tekstil', hasQuote: true }
    ]
  },
  {
    id: '7',
    orderName: 'Yün Kazak Siparişi',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    dueDate: '2024-03-20',
    suppliers: [
      { supplierName: 'XYZ Kumaş', hasQuote: true },
      { supplierName: 'DEF Tekstil', hasQuote: false }
    ]
  },
  {
    id: '8',
    orderName: 'Spor Giyim Siparişi',
    status: 'Fiyat Onaylandı',
    dueDate: '2024-05-01',
    suppliers: [
      { supplierName: 'XYZ Kumaş', hasQuote: true, isAccepted: true },
      { supplierName: 'ABC Tekstil', hasQuote: true }
    ]
  },
  {
    id: '9',
    orderName: 'Yazlık Elbise Siparişi',
    status: 'Taslak',
    dueDate: '2024-04-15',
    suppliers: []
  },
  {
    id: '10',
    orderName: 'Kışlık Mont Siparişi',
    status: 'Fiyat Onaylandı',
    dueDate: '2024-01-10',
    suppliers: [
      { supplierName: 'DEF Tekstil', hasQuote: true, isAccepted: true },
      { supplierName: 'ABC Tekstil', hasQuote: true }
    ]
  },
  {
    id: '11',
    orderName: 'Çocuk Giyim Siparişi',
    status: 'Tüm Tedarikçiler Teklif Verdi',
    dueDate: '2024-02-28',
    suppliers: [
      { supplierName: 'XYZ Kumaş', hasQuote: true },
      { supplierName: 'ABC Tekstil', hasQuote: true },
      { supplierName: 'DEF Tekstil', hasQuote: true }
    ]
  },
  {
    id: '12',
    orderName: 'Spor Ayakkabı Siparişi',
    status: 'Tedarikçilerden Fiyat Bekleniyor',
    dueDate: '2024-03-15',
    suppliers: [
      { supplierName: 'DEF Tekstil', hasQuote: true },
      { supplierName: 'ABC Tekstil', hasQuote: false }
    ]
  }
];

interface OrderStatusCount {
  status: string;
  count: number;
  color: string;
}

interface NearestDeadlineOrder {
  id: string;
  orderName: string;
  dueDate: string;
  daysLeft: number;
}

interface TopSupplier {
  supplierName: string;
  acceptedQuotes: number;
}

interface DelayedOrder {
  id: string;
  orderName: string;
  dueDate: string;
  delayDays: number;
}

export const getOrderStatusCounts = (): OrderStatusCount[] => {
  const statusCounts = DUMMY_ORDERS.reduce((acc: { [key: string]: number }, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    color: getStatusColor(status)
  }));
};

export const getNearestDeadlineOrders = (limit: number = 5): NearestDeadlineOrder[] => {
  const today = new Date();

  return DUMMY_ORDERS
    .map(order => ({
      id: order.id,
      orderName: order.orderName,
      dueDate: order.dueDate,
      daysLeft: Math.ceil(
        (new Date(order.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
    }))
    .filter(order => order.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, limit);
};

export const getTopSuppliers = (limit: number = 10): TopSupplier[] => {
  const supplierAcceptedQuotes: { [key: string]: number } = {};

  DUMMY_ORDERS.forEach(order => {
    const acceptedSupplier = order.suppliers.find(s => s.isAccepted);
    if (acceptedSupplier) {
      supplierAcceptedQuotes[acceptedSupplier.supplierName] = 
        (supplierAcceptedQuotes[acceptedSupplier.supplierName] || 0) + 1;
    }
  });

  return Object.entries(supplierAcceptedQuotes)
    .map(([supplierName, acceptedQuotes]) => ({
      supplierName,
      acceptedQuotes
    }))
    .sort((a, b) => b.acceptedQuotes - a.acceptedQuotes)
    .slice(0, limit);
};

export const getDelayedOrders = (): DelayedOrder[] => {
  const today = new Date();

  return DUMMY_ORDERS
    .map(order => ({
      id: order.id,
      orderName: order.orderName,
      dueDate: order.dueDate,
      delayDays: Math.ceil(
        (today.getTime() - new Date(order.dueDate).getTime()) / (1000 * 60 * 60 * 24)
      )
    }))
    .filter(order => order.delayDays > 0)
    .sort((a, b) => b.delayDays - a.delayDays);
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Taslak':
      return '#E5E7EB'; // gray-200
    case 'Tedarikçilerden Fiyat Bekleniyor':
      return '#FDE68A'; // yellow-200
    case 'Tüm Tedarikçiler Teklif Verdi':
      return '#93C5FD'; // blue-200
    case 'Fiyat Onaylandı':
      return '#86EFAC'; // green-200
    default:
      return '#E5E7EB'; // gray-200
  }
}; 