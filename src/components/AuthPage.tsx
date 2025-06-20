
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { language } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess(language === 'ar' 
            ? 'تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني للتأكيد.' 
            : 'Compte créé avec succès! Vérifiez votre email pour confirmation.'
          );
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">🚰</span>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">
            {language === 'ar' ? 'مجمع المياه' : 'Majma3 Miyeh'}
          </CardTitle>
          <p className="text-blue-600">
            {isSignUp 
              ? (language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte')
              : (language === 'ar' ? 'تسجيل الدخول' : 'Se connecter')
            }
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                </label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                  placeholder={language === 'ar' ? 'أدخل الاسم الكامل' : 'Entrez le nom complet'}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Entrez votre email'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Entrez votre mot de passe'}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp 
                ? (language === 'ar' ? 'إنشاء حساب' : 'Créer un compte')
                : (language === 'ar' ? 'تسجيل الدخول' : 'Se connecter')
              }
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccess(null);
                }}
              >
                {isSignUp 
                  ? (language === 'ar' ? 'لديك حساب؟ سجل الدخول' : 'Déjà un compte? Se connecter')
                  : (language === 'ar' ? 'ليس لديك حساب؟ أنشئ حساباً' : 'Pas de compte? Créer un compte')
                }
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
