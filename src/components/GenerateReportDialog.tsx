
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download } from 'lucide-react';

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GenerateReportDialog({ open, onOpenChange }: GenerateReportDialogProps) {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    report_type: '',
    start_date: '',
    end_date: '',
    format: 'pdf'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: language === 'ar' ? 'تم إنشاء التقرير' : 'Rapport Généré',
        description: language === 'ar' ? 'سيتم تنزيل التقرير قريباً' : 'Le rapport sera téléchargé bientôt'
      });

      onOpenChange(false);
      setFormData({
        report_type: '',
        start_date: '',
        end_date: '',
        format: 'pdf'
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Erreur',
        description: language === 'ar' ? 'فشل في إنشاء التقرير' : 'Échec de la génération du rapport',
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
          <DialogTitle className="flex items-center">
            <FileText className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {language === 'ar' ? 'إنشاء تقرير' : 'Générer Rapport'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <Label htmlFor="report_type">
              {language === 'ar' ? 'نوع التقرير' : 'Type de Rapport'}
            </Label>
            <Select value={formData.report_type} onValueChange={(value) => setFormData(prev => ({ ...prev, report_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر نوع التقرير' : 'Sélectionner type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">
                  {language === 'ar' ? 'تقرير مالي' : 'Rapport Financier'}
                </SelectItem>
                <SelectItem value="consumption">
                  {language === 'ar' ? 'تقرير الاستهلاك' : 'Rapport Consommation'}
                </SelectItem>
                <SelectItem value="subscribers">
                  {language === 'ar' ? 'تقرير المشتركين' : 'Rapport Abonnés'}
                </SelectItem>
                <SelectItem value="payments">
                  {language === 'ar' ? 'تقرير المدفوعات' : 'Rapport Paiements'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="start_date">
              {language === 'ar' ? 'تاريخ البداية' : 'Date Début'}
            </Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="end_date">
              {language === 'ar' ? 'تاريخ النهاية' : 'Date Fin'}
            </Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="format">
              {language === 'ar' ? 'صيغة التقرير' : 'Format Rapport'}
            </Label>
            <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading}>
              <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {loading ? 
                (language === 'ar' ? 'جاري الإنشاء...' : 'Génération...') :
                (language === 'ar' ? 'إنشاء' : 'Générer')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
