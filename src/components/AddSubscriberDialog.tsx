
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscribers, Subscriber } from '@/hooks/useSubscribers';

export function AddSubscriberDialog() {
  const { language, isRTL } = useLanguage();
  const { addSubscriber, loading } = useSubscribers();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    address: '',
    address_ar: '',
    phone: '',
    meter_number: '',
    status: 'active' as const,
    tariff_type: 'standard',
    family_size: 1,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addSubscriber({
      ...formData,
      connection_date: new Date().toISOString().split('T')[0]
    });
    
    if (result) {
      setOpen(false);
      setFormData({
        name: '',
        name_ar: '',
        address: '',
        address_ar: '',
        phone: '',
        meter_number: '',
        status: 'active',
        tariff_type: 'standard',
        family_size: 1,
        notes: ''
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {language === 'ar' ? 'إضافة مشترك' : 'Ajouter Abonné'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'إضافة مشترك جديد' : 'Ajouter Nouvel Abonné'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {language === 'ar' ? 'الاسم (فرنسي)' : 'Nom (Français)'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="name_ar">
              {language === 'ar' ? 'الاسم (عربي)' : 'Nom (Arabe)'}
            </Label>
            <Input
              id="name_ar"
              value={formData.name_ar}
              onChange={(e) => setFormData(prev => ({ ...prev, name_ar: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="address">
              {language === 'ar' ? 'العنوان (فرنسي)' : 'Adresse (Français)'}
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="address_ar">
              {language === 'ar' ? 'العنوان (عربي)' : 'Adresse (Arabe)'}
            </Label>
            <Input
              id="address_ar"
              value={formData.address_ar}
              onChange={(e) => setFormData(prev => ({ ...prev, address_ar: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">
              {language === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="meter_number">
              {language === 'ar' ? 'رقم العداد' : 'Numéro Compteur'}
            </Label>
            <Input
              id="meter_number"
              value={formData.meter_number}
              onChange={(e) => setFormData(prev => ({ ...prev, meter_number: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">
              {language === 'ar' ? 'الحالة' : 'Statut'}
            </Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  {language === 'ar' ? 'نشط' : 'Actif'}
                </SelectItem>
                <SelectItem value="inactive">
                  {language === 'ar' ? 'غير نشط' : 'Inactif'}
                </SelectItem>
                <SelectItem value="suspended">
                  {language === 'ar' ? 'موقوف' : 'Suspendu'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="family_size">
              {language === 'ar' ? 'حجم العائلة' : 'Taille Famille'}
            </Label>
            <Input
              id="family_size"
              type="number"
              min="1"
              value={formData.family_size}
              onChange={(e) => setFormData(prev => ({ ...prev, family_size: parseInt(e.target.value) || 1 }))}
            />
          </div>

          <div>
            <Label htmlFor="notes">
              {language === 'ar' ? 'ملاحظات' : 'Notes'}
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading}>
              {language === 'ar' ? 'إضافة' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
