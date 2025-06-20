
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
      className="h-8 px-3 text-sm font-medium"
    >
      {language === 'ar' ? 'FR' : 'عر'}
    </Button>
  );
}
