export interface ContactPerson {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
}

export interface SupplierNote {
  id: string;
  date: string;
  content: string;
  author: string;
}

export interface SupplierOrderHistory {
  orderId: string;
  orderDate: string;
  product: string;
  quantity: number;
  unit: string;
  deliveryDate: string;
  rating: number;
  comment: string;
  status: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPersons: ContactPerson[];
  address: string;
  city: string;
  country: string;
  specialties: string[];
  rating: number;
  totalOrders: number;
  completedOrders: number;
  activeOrders: number;
  onTimeDeliveryRate: number;
  status: 'Aktif' | 'Pasif';
  joinDate: string;
  notes: SupplierNote[];
  orderHistory: SupplierOrderHistory[];
  taxNumber?: string;
  website?: string;
  description?: string;
}

export const DUMMY_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP001',
    name: 'ABC Tekstil Ltd. Şti.',
    contactPersons: [
      {
        id: 'CONT001',
        name: 'Ahmet Yılmaz',
        title: 'Satış Müdürü',
        email: 'ahmet@abctekstil.com',
        phone: '+90 212 555 0001',
        department: 'Satış'
      },
      {
        id: 'CONT002',
        name: 'Ayşe Demir',
        title: 'Üretim Sorumlusu',
        email: 'ayse@abctekstil.com',
        phone: '+90 212 555 0002',
        department: 'Üretim'
      }
    ],
    address: 'Osmanbey Cad. No:123, Şişli',
    city: 'İstanbul',
    country: 'Türkiye',
    specialties: ['Pamuklu Kumaş', 'Polyester', 'Denim'],
    rating: 4.8,
    totalOrders: 150,
    completedOrders: 142,
    activeOrders: 8,
    onTimeDeliveryRate: 95,
    status: 'Aktif',
    joinDate: '2020-01-15',
    taxNumber: '1234567890',
    website: 'www.abctekstil.com',
    description: 'Tekstil sektöründe 20 yılı aşkın tecrübesiyle hizmet veren firmamız, modern üretim tesisleri ve uzman kadrosuyla müşterilerimize en kaliteli ürünleri sunmaktadır.',
    notes: [
      {
        id: 'NOTE001',
        date: '2024-01-15',
        content: 'Yeni koleksiyon için numune çalışmaları başlatıldı. 2 hafta içinde numuneler hazır olacak.',
        author: 'Mehmet Kaya'
      },
      {
        id: 'NOTE002',
        date: '2024-01-10',
        content: 'Fiyat görüşmesi yapıldı. Yıllık anlaşma için %10 indirim teklif edildi.',
        author: 'Zeynep Demir'
      }
    ],
    orderHistory: [
      {
        orderId: 'ORD001',
        orderDate: '2024-01-01',
        product: 'Pamuklu Kumaş',
        quantity: 1000,
        unit: 'metre',
        deliveryDate: '2024-01-15',
        rating: 5,
        comment: 'Zamanında teslimat ve kaliteli ürün.',
        status: 'Tamamlandı'
      },
      {
        orderId: 'ORD002',
        orderDate: '2024-01-05',
        product: 'Denim',
        quantity: 500,
        unit: 'metre',
        deliveryDate: '2024-01-20',
        rating: 4,
        comment: 'Ürün kalitesi iyi fakat teslimat 2 gün gecikti.',
        status: 'Tamamlandı'
      }
    ]
  },
  {
    id: 'SUP002',
    name: 'XYZ Kumaş Sanayi A.Ş.',
    contactPersons: [
      {
        id: 'CONT003',
        name: 'Mehmet Demir',
        title: 'Genel Müdür',
        email: 'mehmet@xyzkumas.com',
        phone: '+90 212 555 0002',
        department: 'Yönetim'
      }
    ],
    address: 'Merter Tekstil Merkezi No:45',
    city: 'İstanbul',
    country: 'Türkiye',
    specialties: ['İpek', 'Keten', 'Yün'],
    rating: 4.5,
    totalOrders: 98,
    completedOrders: 95,
    activeOrders: 3,
    onTimeDeliveryRate: 92,
    status: 'Aktif',
    joinDate: '2020-03-20',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP003',
    name: 'DEF Tekstil ve Ticaret',
    contactPersons: [
      {
        id: 'CONT004',
        name: 'Ayşe Kaya',
        title: 'Satış Temsilcisi',
        email: 'ayse@deftekstil.com',
        phone: '+90 212 555 0003',
        department: 'Satış'
      }
    ],
    address: 'Laleli İş Merkezi Kat:5',
    city: 'İstanbul',
    country: 'Türkiye',
    specialties: ['Deri', 'Süet', 'Kadife'],
    rating: 4.9,
    totalOrders: 200,
    completedOrders: 195,
    activeOrders: 5,
    onTimeDeliveryRate: 98,
    status: 'Aktif',
    joinDate: '2019-11-10',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP004',
    name: 'Global Fabrics Co.',
    contactPersons: [
      {
        id: 'CONT005',
        name: 'John Smith',
        title: 'Sales Manager',
        email: 'john@globalfabrics.com',
        phone: '+1 555 0004',
        department: 'Sales'
      }
    ],
    address: '123 Textile Street',
    city: 'New York',
    country: 'USA',
    specialties: ['Organik Pamuk', 'Bambu', 'Ekolojik Kumaşlar'],
    rating: 4.7,
    totalOrders: 75,
    completedOrders: 70,
    activeOrders: 5,
    onTimeDeliveryRate: 94,
    status: 'Aktif',
    joinDate: '2021-02-01',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP005',
    name: 'Anadolu Dokuma',
    contactPersons: [
      {
        id: 'CONT006',
        name: 'Fatma Şahin',
        title: 'Müşteri İlişkileri Sorumlusu',
        email: 'fatma@anadoludokuma.com',
        phone: '+90 322 555 0005',
        department: 'Müşteri İlişkileri'
      }
    ],
    address: 'Organize Sanayi Bölgesi',
    city: 'Adana',
    country: 'Türkiye',
    specialties: ['El Dokuma', 'Geleneksel Desenler', 'Pamuklu'],
    rating: 4.6,
    totalOrders: 120,
    completedOrders: 118,
    activeOrders: 2,
    onTimeDeliveryRate: 96,
    status: 'Aktif',
    joinDate: '2020-06-15',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP006',
    name: 'İpek Yolu Tekstil',
    contactPersons: [
      {
        id: 'CONT007',
        name: 'Ali Öztürk',
        title: 'Üretim Müdürü',
        email: 'ali@ipekyolu.com',
        phone: '+90 232 555 0006',
        department: 'Üretim'
      }
    ],
    address: 'Kemeraltı Cad. No:67',
    city: 'İzmir',
    country: 'Türkiye',
    specialties: ['İpek', 'Şifon', 'Saten'],
    rating: 4.4,
    totalOrders: 85,
    completedOrders: 80,
    activeOrders: 5,
    onTimeDeliveryRate: 91,
    status: 'Aktif',
    joinDate: '2021-04-20',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP007',
    name: 'Karadeniz Tekstil',
    contactPersons: [
      {
        id: 'CONT008',
        name: 'Hasan Yıldız',
        title: 'Pazarlama Müdürü',
        email: 'hasan@karadeniztekstil.com',
        phone: '+90 462 555 0007',
        department: 'Pazarlama'
      }
    ],
    address: 'Sanayi Sitesi B Blok',
    city: 'Trabzon',
    country: 'Türkiye',
    specialties: ['Keten', 'Pamuk', 'Yöresel Kumaşlar'],
    rating: 4.3,
    totalOrders: 60,
    completedOrders: 55,
    activeOrders: 5,
    onTimeDeliveryRate: 90,
    status: 'Aktif',
    joinDate: '2021-08-10',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP008',
    name: 'Marmara Kumaş',
    contactPersons: [
      {
        id: 'CONT009',
        name: 'Zeynep Aydın',
        title: 'Satın Alma Müdürü',
        email: 'zeynep@marmarakumas.com',
        phone: '+90 212 555 0008',
        department: 'Satın Alma'
      }
    ],
    address: 'Tekstilkent D Blok',
    city: 'İstanbul',
    country: 'Türkiye',
    specialties: ['Polyester', 'Viskon', 'Likra'],
    rating: 4.2,
    totalOrders: 45,
    completedOrders: 40,
    activeOrders: 5,
    onTimeDeliveryRate: 89,
    status: 'Aktif',
    joinDate: '2022-01-15',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP009',
    name: 'Ege Tekstil San. Ltd.',
    contactPersons: [
      {
        id: 'CONT010',
        name: 'Mustafa Şen',
        title: 'İhracat Sorumlusu',
        email: 'mustafa@egetekstil.com',
        phone: '+90 232 555 0009',
        department: 'İhracat'
      }
    ],
    address: 'Ege Serbest Bölgesi No:45',
    city: 'İzmir',
    country: 'Türkiye',
    specialties: ['Pamuklu', 'Organik Tekstil', 'Örme Kumaş'],
    rating: 3.8,
    totalOrders: 30,
    completedOrders: 28,
    activeOrders: 0,
    onTimeDeliveryRate: 75,
    status: 'Pasif',
    joinDate: '2021-05-20',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP010',
    name: 'Akdeniz Dokuma',
    contactPersons: [
      {
        id: 'CONT011',
        name: 'Selim Kara',
        title: 'Kalite Kontrol Sorumlusu',
        email: 'selim@akdenizdokuma.com',
        phone: '+90 242 555 0010',
        department: 'Kalite Kontrol'
      }
    ],
    address: 'Antalya OSB C-12',
    city: 'Antalya',
    country: 'Türkiye',
    specialties: ['Dokuma Kumaş', 'Havlu Kumaş'],
    rating: 3.5,
    totalOrders: 25,
    completedOrders: 20,
    activeOrders: 0,
    onTimeDeliveryRate: 70,
    status: 'Pasif',
    joinDate: '2021-03-15',
    notes: [],
    orderHistory: []
  },
  {
    id: 'SUP011',
    name: 'Yıldız İplik',
    contactPersons: [
      {
        id: 'CONT012',
        name: 'Kemal Yıldız',
        title: 'Operasyon Müdürü',
        email: 'kemal@yildiziplik.com',
        phone: '+90 212 555 0011',
        department: 'Operasyon'
      }
    ],
    address: 'Zeytinburnu Tekstil Merkezi',
    city: 'İstanbul',
    country: 'Türkiye',
    specialties: ['İplik Üretimi', 'Boyama'],
    rating: 3.2,
    totalOrders: 15,
    completedOrders: 12,
    activeOrders: 0,
    onTimeDeliveryRate: 65,
    status: 'Pasif',
    joinDate: '2022-02-10',
    notes: [],
    orderHistory: []
  }
]; 