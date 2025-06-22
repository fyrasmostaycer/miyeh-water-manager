
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscribers } from '@/hooks/useSubscribers';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MeterReadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeterReadingDialog({ open, onOpenChange }: MeterReadingDialogProps) {
  const { language, isRTL } = useLanguage();
  const { subscribers } = useSubscribers();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subscriber_id: '',
    current_reading: '',
    reader_name: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('meter_readings')
        .insert([{
          subscriber_id: formData.subscriber_id,
          current_reading: parseFloat(formData.current_reading),
          reader_name: formData.reader_name || null,
          notes: formData.notes || null,
          reading_date: new Date().toISOString().split('T')[0]
        }]);

      if (error) throw error;

      toast({
        title: language === 'ar' ? 'تم حفظ القراءة' : 'Lecture Enregistrée',
        description: language === 'ar' ? 'تم حفظ قراءة العداد بنجاح' : 'La lecture du compteur a été enregistrée avec succès'
      });

      setFormData({
        subscriber_id: '',
        current_reading: '',
        reader_name: '',
        notes: ''
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving meter reading:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Erreur',
        description: language === 'ar' ? 'فشل في حفظ القراءة' : 'Échec de l\'enregistrement de la lecture',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'قراءة عداد جديدة' : 'Nouvelle Lecture Compteur'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subscriber">
              {language === 'ar' ? 'المشترك' : 'Abonné'}
            </Label>
            <Select value={formData.subscriber_id} onValueChange={(value) => setFormData(prev => ({ ...prev, subscriber_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر المشترك' : 'Sélectionner abonné'} />
              </SelectTrigger>
              <SelectContent>
                {subscribers.map((subscriber) => (
                  <SelectItem key={subscriber.id} value={subscriber.id}>
                    {language === 'ar' && subscriber.name_ar ? subscriber.name_ar : subscriber.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="current_reading">
              {language === 'ar' ? 'القراءة الحالية' : 'Lecture Actuelle'}
            </Label>
            <Input
              id="current_reading"
              type="number"
              step="0.1"
              value={formData.current_reading}
              onChange={(e) => setFormData(prev => ({ ...prev, current_reading: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="reader_name">
              {language === 'ar' ? 'اسم القارئ' : 'Nom du Lecteur'}
            </Label>
            <Input
              id="reader_name"
              value={formData.reader_name}
              onChange={(e) => setFormData(prev => ({ ...prev, reader_name: e.target.value }))}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading}>
              {language === 'ar' ? 'حفظ' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
