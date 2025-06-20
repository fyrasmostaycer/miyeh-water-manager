
-- Create enum types
CREATE TYPE public.user_role AS ENUM ('super_admin', 'admin', 'treasurer', 'secretary', 'reader', 'member');
CREATE TYPE public.subscriber_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.bill_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
CREATE TYPE public.payment_method AS ENUM ('cash', 'bank_transfer', 'mobile_money', 'check');
CREATE TYPE public.alert_type AS ENUM ('overdue_payment', 'high_consumption', 'system_maintenance', 'new_subscriber', 'payment_confirmation');
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Organizations (Water Committees)
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  settings JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active'
);

-- User profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role public.user_role DEFAULT 'member',
  permissions JSONB DEFAULT '{}',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscribers (Households)
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ar TEXT,
  address TEXT NOT NULL,
  address_ar TEXT,
  phone TEXT,
  meter_number TEXT UNIQUE NOT NULL,
  connection_date DATE DEFAULT CURRENT_DATE,
  status public.subscriber_status DEFAULT 'active',
  tariff_type TEXT DEFAULT 'standard',
  family_size INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meter Readings
CREATE TABLE public.meter_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES public.subscribers(id) ON DELETE CASCADE,
  reading_date DATE NOT NULL DEFAULT CURRENT_DATE,
  current_reading DECIMAL(10,2) NOT NULL,
  previous_reading DECIMAL(10,2) DEFAULT 0,
  consumption DECIMAL(10,2) GENERATED ALWAYS AS (current_reading - previous_reading) STORED,
  reader_name TEXT,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bills
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES public.subscribers(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  consumption DECIMAL(10,2) NOT NULL DEFAULT 0,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status public.bill_status DEFAULT 'pending',
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  notes TEXT
);

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID REFERENCES public.bills(id) ON DELETE SET NULL,
  subscriber_id UUID NOT NULL REFERENCES public.subscribers(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method public.payment_method DEFAULT 'cash',
  receipt_number TEXT,
  collector_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  description_ar TEXT,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  approved_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts & Notifications
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type public.alert_type NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  message TEXT NOT NULL,
  message_ar TEXT,
  severity public.alert_severity DEFAULT 'medium',
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, key)
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meter_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for organization data (users can only access data from their organization)
CREATE POLICY "Users can view organization data" ON public.subscribers
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage organization data" ON public.subscribers
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Similar policies for other tables
CREATE POLICY "Users can view meter readings" ON public.meter_readings
  FOR SELECT USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can manage meter readings" ON public.meter_readings
  FOR ALL USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can view bills" ON public.bills
  FOR SELECT USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can manage bills" ON public.bills
  FOR ALL USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can view payments" ON public.payments
  FOR SELECT USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can manage payments" ON public.payments
  FOR ALL USING (
    subscriber_id IN (
      SELECT s.id FROM public.subscribers s
      JOIN public.profiles p ON s.organization_id = p.organization_id
      WHERE p.id = auth.uid()
    )
  );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample organization
INSERT INTO public.organizations (name, name_ar, address, phone, city, region) 
VALUES (
  'Majma3 Miyeh Tunis',
  'مجمع المياه تونس',
  'Avenue Habib Bourguiba, Tunis',
  '+216 71 123 456',
  'Tunis',
  'Tunis'
);

-- Insert sample subscribers with proper enum casting
INSERT INTO public.subscribers (organization_id, name, name_ar, address, address_ar, phone, meter_number, status)
SELECT 
  o.id,
  'Ahmed Mohamed Ali',
  'أحمد محمد علي',
  'Avenue Habib Bourguiba, Tunis',
  'شارع الحبيب بورقيبة، تونس',
  '+216 20 123 456',
  'MTR-001',
  'active'::public.subscriber_status
FROM public.organizations o
WHERE o.name = 'Majma3 Miyeh Tunis'
UNION ALL
SELECT 
  o.id,
  'Fatima Ben Ali',
  'فاطمة بن علي',
  'Avenue de l''Indépendance, Sfax',
  'شارع الاستقلال، صفاقس',
  '+216 25 987 654',
  'MTR-002',
  'active'::public.subscriber_status
FROM public.organizations o
WHERE o.name = 'Majma3 Miyeh Tunis'
UNION ALL
SELECT 
  o.id,
  'Mohamed Hassan Trabelsi',
  'محمد حسن الطرابلسي',
  'Avenue de la République, Sousse',
  'شارع الجمهورية، سوسة',
  '+216 22 456 789',
  'MTR-003',
  'suspended'::public.subscriber_status
FROM public.organizations o
WHERE o.name = 'Majma3 Miyeh Tunis';
