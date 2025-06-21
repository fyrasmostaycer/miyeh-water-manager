
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  organization_id: string | null;
  full_name: string;
  phone: string | null;
  role: 'super_admin' | 'admin' | 'treasurer' | 'secretary' | 'reader' | 'member';
  permissions: Record<string, any>;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Profile Error",
          description: "Failed to fetch user profile",
          variant: "destructive"
        });
      } else {
        // Cast the data to match our UserProfile interface
        const profileData: UserProfile = {
          ...data,
          permissions: (data.permissions as Record<string, any>) || {}
        };
        setProfile(profileData);
        
        // If user doesn't have an organization, assign them to the default one
        if (!data.organization_id) {
          await assignToDefaultOrganization(user.id);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const assignToDefaultOrganization = async (userId: string) => {
    try {
      // Get the first organization (sample organization we created)
      const { data: organization } = await supabase
        .from('organizations')
        .select('id')
        .limit(1)
        .single();

      if (organization) {
        const { error } = await supabase
          .from('profiles')
          .update({ organization_id: organization.id })
          .eq('id', userId);

        if (!error) {
          toast({
            title: "Welcome!",
            description: "You've been assigned to the default organization.",
          });
          fetchProfile(); // Refresh profile
        }
      }
    } catch (err) {
      console.error('Error assigning organization:', err);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive"
        });
        return false;
      }

      await fetchProfile(); // Refresh profile
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    fetchProfile,
    updateProfile
  };
}
