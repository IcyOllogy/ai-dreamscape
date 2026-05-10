import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'free_member' | 'member' | 'pro_member' | 'vip_member' | 'admin';

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  is_verified: boolean;
  last_handle_change: string | null;
  role: UserRole;
  tokens_balance: number;
  is_banned: boolean;
  country: string | null;
  last_active_at: string | null;
  admin_notes: string | null;
  created_at: string;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Heartbeat & Ban Check
  useEffect(() => {
    if (user && profile) {
      // 1. Immediate Ban Check
      if (profile.is_banned) {
        console.warn('User is banned. Terminating session.');
        supabase.auth.signOut();
        return;
      }

      // 2. Heartbeat (Update last_active_at every 5 minutes)
      const heartbeatInterval = setInterval(() => {
        supabase
          .from('profiles')
          .update({ last_active_at: new Date().toISOString() })
          .eq('id', user.id)
          .then();
      }, 5 * 60 * 1000);

      // Initial update
      supabase
        .from('profiles')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', user.id)
        .then();

      return () => clearInterval(heartbeatInterval);
    }
  }, [user, profile]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Handle immediate ban on fetch
      if (data.is_banned) {
        setProfile(null);
        await supabase.auth.signOut();
        return;
      }
      
      let avatarUrl = data.avatar_url;
      let bannerUrl = data.banner_url;
      
      // Handle Avatar signed URL
      if (avatarUrl && !avatarUrl.startsWith('http')) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from('avatars')
          .createSignedUrl(avatarUrl, 3600);
        
        if (!signedError) {
          avatarUrl = signedData.signedUrl;
        }
      }

      // Handle Banner signed URL
      if (bannerUrl && !bannerUrl.startsWith('http')) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from('banners')
          .createSignedUrl(bannerUrl, 3600);
        
        if (!signedError) {
          bannerUrl = signedData.signedUrl;
        }
      }

      setProfile({ 
        ...(data as Profile), 
        avatar_url: avatarUrl,
        banner_url: bannerUrl 
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(file: File) {
    try {
      if (!user) throw new Error('No user logged in');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Update profile with the STORAGE PATH
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await fetchProfile(user.id);
      return { success: true };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return { success: false, error };
    }
  }

  async function updateProfile(updates: Partial<Profile>) {
    try {
      if (!user) throw new Error('No user logged in');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh profile state
      await fetchProfile(user.id);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  }

  const signOut = () => supabase.auth.signOut();

  return { session, user, profile, loading, signOut, updateProfile, uploadAvatar };
}
