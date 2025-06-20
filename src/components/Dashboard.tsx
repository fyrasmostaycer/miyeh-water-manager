
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Plus,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export function Dashboard() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);

  const stats = [
    {
      title: t('totalSubscribers'),
      value: '247',
      change: '+12',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: t('monthlyRevenue'),
      value: '15,420 DT',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: t('collectionRate'),
      value: '87.5%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Calendar,
    },
    {
      title: t('outstandingBills'),
      value: '23',
      change: '+5',
      changeType: 'negative' as const,
      icon: AlertCircle,
    },
  ];

  const recentActivities = [
    { 
      type: 'payment', 
      description: language === 'ar' ? 'دفع فاتورة - أحمد محمد' : 'Paiement reçu - Ahmed Mohamed',
      amount: '45 DT',
      time: '10:30'
    },
    { 
      type: 'reading', 
      description: language === 'ar' ? 'قراءة عداد جديدة - فاطمة علي' : 'Nouvelle lecture - Fatima Ali',
      amount: '156 L',
      time: '09:15'
    },
    { 
      type: 'subscriber', 
      description: language === 'ar' ? 'مشترك جديد - محمد حسن' : 'Nouvel abonné - Mohamed Hassan',
      amount: '',
      time: '08:45'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {t('welcome')}
          </h1>
          <p className="text-blue-600">
            {language === 'ar' 
              ? 'إدارة مجمع المياه - لوحة القيادة الرئيسية' 
              : 'Gestion du Comité d\'Eau - Tableau de Bord Principal'
            }
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('addSubscriber')}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {stat.value}
                </div>
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-600`} />
              {t('recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-blue-600">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <Badge variant="outline" className="text-blue-700">
                      {activity.amount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-600`} />
              {language === 'ar' ? 'إجراءات سريعة' : 'Actions Rapides'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start h-auto p-4">
                <Users className={`w-4 h-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div className="text-left rtl:text-right">
                  <div className="font-medium">{t('addSubscriber')}</div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? 'إضافة مشترك جديد' : 'Ajouter un nouvel abonné'}
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <FileText className={`w-4 h-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div className="text-left rtl:text-right">
                  <div className="font-medium">
                    {language === 'ar' ? 'قراءة العدادات' : 'Lecture Compteurs'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? 'إدخال قراءات جديدة' : 'Saisir nouvelles lectures'}
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <Calendar className={`w-4 h-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div className="text-left rtl:text-right">
                  <div className="font-medium">
                    {language === 'ar' ? 'إنشاء التقارير' : 'Générer Rapports'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? 'تقارير شهرية ومالية' : 'Rapports mensuels et financiers'}
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
