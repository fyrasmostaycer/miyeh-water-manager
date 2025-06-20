
import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { SubscriberManagement } from '@/components/SubscriberManagement';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscribers':
        return <SubscriberManagement />;
      case 'billing':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">قريباً - Bientôt</h2>
            <p className="text-blue-600">وحدة الفوترة قيد التطوير</p>
            <p className="text-blue-600">Module de facturation en développement</p>
          </div>
        );
      case 'payments':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">قريباً - Bientôt</h2>
            <p className="text-blue-600">وحدة المدفوعات قيد التطوير</p>
            <p className="text-blue-600">Module de paiements en développement</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">قريباً - Bientôt</h2>
            <p className="text-blue-600">وحدة التقارير قيد التطوير</p>
            <p className="text-blue-600">Module de rapports en développement</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">قريباً - Bientôt</h2>
            <p className="text-blue-600">وحدة الإعدادات قيد التطوير</p>
            <p className="text-blue-600">Module de paramètres en développement</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
