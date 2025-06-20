
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus,
  Edit,
  Search
} from 'lucide-react';

export function SubscriberManagement() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const [searchTerm, setSearchTerm] = useState('');

  const subscribers = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali',
      address: language === 'ar' ? 'شارع الحبيب بورقيبة، تونس' : 'Avenue Habib Bourguiba, Tunis',
      phone: '+216 20 123 456',
      meterNumber: 'MTR-001',
      status: 'active',
      balance: '45 DT',
      lastPayment: '2024-01-15'
    },
    {
      id: 2,
      name: language === 'ar' ? 'فاطمة بن علي' : 'Fatima Ben Ali',
      address: language === 'ar' ? 'شارع الاستقلال، صفاقس' : 'Avenue de l\'Indépendance, Sfax',
      phone: '+216 25 987 654',
      meterNumber: 'MTR-002',
      status: 'active',
      balance: '0 DT',
      lastPayment: '2024-01-20'
    },
    {
      id: 3,
      name: language === 'ar' ? 'محمد حسن الطرابلسي' : 'Mohamed Hassan Trabelsi',
      address: language === 'ar' ? 'شارع الجمهورية، سوسة' : 'Avenue de la République, Sousse',
      phone: '+216 22 456 789',
      meterNumber: 'MTR-003',
      status: 'suspended',
      balance: '120 DT',
      lastPayment: '2023-12-10'
    },
  ];

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.meterNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {t(status as any)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {t('subscribers')}
          </h1>
          <p className="text-blue-600">
            {language === 'ar' 
              ? 'إدارة المشتركين والعضويات' 
              : 'Gestion des abonnés et adhésions'
            }
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('addSubscriber')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} h-4 w-4 text-gray-400`} />
              <Input
                placeholder={t('searchSubscribers')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
            <Button variant="outline">
              {language === 'ar' ? 'فلترة' : 'Filtrer'}
            </Button>
            <Button variant="outline">
              {t('export')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-600`} />
            {language === 'ar' ? 'قائمة المشتركين' : 'Liste des Abonnés'}
            <Badge variant="outline" className={`${isRTL ? 'mr-auto' : 'ml-auto'}`}>
              {filteredSubscribers.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600`}>
                    {t('name')}
                  </th>
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600 hidden md:table-cell`}>
                    {t('address')}
                  </th>
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600 hidden sm:table-cell`}>
                    {t('phone')}
                  </th>
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600`}>
                    {t('meterNumber')}
                  </th>
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600`}>
                    {t('status')}
                  </th>
                  <th className={`py-3 px-4 text-left rtl:text-right font-medium text-gray-600`}>
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-blue-900">
                          {subscriber.name}
                        </div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {subscriber.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-gray-600">
                      {subscriber.address}
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-gray-600">
                      {subscriber.phone}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="font-mono">
                        {subscriber.meterNumber}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(subscriber.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {t('view')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {subscribers.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'مشتركين نشطين' : 'Abonnés Actifs'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {subscribers.filter(s => s.status === 'suspended').length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'مشتركين موقوفين' : 'Abonnés Suspendus'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {subscribers.length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'إجمالي المشتركين' : 'Total Abonnés'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
