
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Subscriber {
  id: string;
  name: string;
  name_ar: string | null;
  address: string;
  address_ar: string | null;
  phone: string | null;
  meter_number: string;
  status: 'active' | 'inactive' | 'suspended';
  connection_date: string;
  tariff_type: string;
  family_size: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscribers:', error);
        setError(error.message);
        toast({
          title: "Error",
          description: "Failed to fetch subscribers",
          variant: "destructive"
        });
      } else {
        setSubscribers(data || []);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addSubscriber = async (subscriberData: Omit<Subscriber, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Get the user's organization ID
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!profile?.organization_id) {
        throw new Error('User organization not found');
      }

      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ ...subscriberData, organization_id: profile.organization_id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding subscriber:', error);
        toast({
          title: "Error",
          description: "Failed to add subscriber",
          variant: "destructive"
        });
        return null;
      }

      setSubscribers(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Subscriber added successfully"
      });
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateSubscriber = async (id: string, updates: Partial<Subscriber>) => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating subscriber:', error);
        toast({
          title: "Error",
          description: "Failed to update subscriber",
          variant: "destructive"
        });
        return null;
      }

      setSubscribers(prev => prev.map(sub => sub.id === id ? data : sub));
      toast({
        title: "Success",
        description: "Subscriber updated successfully"
      });
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteSubscriber = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting subscriber:', error);
        toast({
          title: "Error",
          description: "Failed to delete subscriber",
          variant: "destructive"
        });
        return false;
      }

      setSubscribers(prev => prev.filter(sub => sub.id !== id));
      toast({
        title: "Success",
        description: "Subscriber deleted successfully"
      });
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return {
    subscribers,
    loading,
    error,
    fetchSubscribers,
    addSubscriber,
    updateSubscriber,
    deleteSubscriber
  };
}
