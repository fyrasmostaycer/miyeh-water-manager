
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Settings, 
  Calendar,
  List,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function Layout({ children, currentPage = 'dashboard', onPageChange }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);

  const navigation = [
    { id: 'dashboard', label: t('dashboard'), icon: List },
    { id: 'subscribers', label: t('subscribers'), icon: Users },
    { id: 'billing', label: t('billing'), icon: FileText },
    { id: 'payments', label: t('payments'), icon: Calendar },
    { id: 'reports', label: t('reports'), icon: FileText },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚰</span>
              </div>
              <h1 className="text-xl font-bold text-blue-900">
                {language === 'ar' ? 'مجمع المياه' : 'Majma3 Miyeh'}
              </h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageToggle />
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm text-blue-600 hidden sm:block">
                  {user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Navigation */}
        <div className="block md:hidden mb-6">
          <Card className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange?.(item.id)}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <Card className="p-6">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${isRTL ? 'flex-row-reverse' : ''}`}
                      onClick={() => onPageChange?.(item.id)}
                    >
                      <Icon className={`w-4 h-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
