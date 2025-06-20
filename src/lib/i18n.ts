
export type Language = 'ar' | 'fr';

export const translations = {
  ar: {
    // Navigation
    dashboard: 'لوحة القيادة',
    subscribers: 'المشتركين', 
    billing: 'الفوترة',
    payments: 'المدفوعات',
    reports: 'التقارير', 
    settings: 'الإعدادات',
    
    // Dashboard
    welcome: 'مرحباً بك',
    overview: 'نظرة عامة',
    totalSubscribers: 'إجمالي المشتركين',
    activeConnections: 'الاتصالات النشطة',
    monthlyRevenue: 'الإيرادات الشهرية',
    collectionRate: 'معدل التحصيل',
    outstandingBills: 'الفواتير المتأخرة',
    recentActivity: 'النشاط الأخير',
    
    // Subscribers
    addSubscriber: 'إضافة مشترك',
    searchSubscribers: 'البحث في المشتركين',
    name: 'الاسم',
    address: 'العنوان',
    phone: 'الهاتف',
    meterNumber: 'رقم العداد',
    status: 'الحالة',
    actions: 'الإجراءات',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    suspended: 'موقوف',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    add: 'إضافة',
    search: 'بحث',
    export: 'تصدير',
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de Bord',
    subscribers: 'Abonnés',
    billing: 'Facturation',
    payments: 'Paiements',
    reports: 'Rapports',
    settings: 'Paramètres',
    
    // Dashboard
    welcome: 'Bienvenue',
    overview: 'Vue d\'ensemble',
    totalSubscribers: 'Total Abonnés',
    activeConnections: 'Connexions Actives',
    monthlyRevenue: 'Revenus Mensuels',
    collectionRate: 'Taux de Collecte',
    outstandingBills: 'Factures Impayées',
    recentActivity: 'Activité Récente',
    
    // Subscribers
    addSubscriber: 'Ajouter Abonné',
    searchSubscribers: 'Rechercher Abonnés',
    name: 'Nom',
    address: 'Adresse',
    phone: 'Téléphone',
    meterNumber: 'N° Compteur',
    status: 'Statut',
    actions: 'Actions',
    
    // Status
    active: 'Actif',
    inactive: 'Inactif',
    suspended: 'Suspendu',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    add: 'Ajouter',
    search: 'Rechercher',
    export: 'Exporter',
  }
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: keyof typeof translations.ar) => translations[language][key] || key,
    language,
  };
};
