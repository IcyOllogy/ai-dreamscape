import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Shield, Coins, User as UserIcon, Loader2, Camera, Upload } from 'lucide-react';
import { useRef } from 'react';

import { Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: ProfileRedirect,
});

function ProfileRedirect() {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!profile) {
    return <Navigate to="/login" />;
  }

  if (!profile.username) {
    // If user has no username, they need to set one in settings
    setTimeout(() => {
      toast.error('Please set a unique handle first');
    }, 100);
    return <Navigate to="/settings" />;
  }

  return <Navigate to="/$username" params={{ username: `@${profile.username}` }} />;
}

function ProfilePage() {
  const { profile, updateProfile, uploadAvatar, user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    display_name: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
      });
    }
  }, [profile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setIsUploading(true);
    const result = await uploadAvatar(file);
    setIsUploading(false);

    if (result.success) {
      toast.success('Profile picture updated');
    } else {
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const result = await updateProfile({
      display_name: formData.display_name,
    });

    if (result.success) {
      toast.success('Profile updated successfully');
    } else {
      toast.error('Failed to update profile');
    }
    setIsUpdating(false);
  };

  if (!profile) return null;

  const initials = profile.display_name
    ? profile.display_name.substring(0, 2).toUpperCase()
    : profile.username?.substring(0, 2).toUpperCase() || '??';

  return (
    <div className="container max-w-4xl py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your identity and subscription preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Stats Column */}
        <div className="space-y-6">
          <Card className="glass-panel border-white/10 bg-white/5 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                  <Avatar className="h-24 w-24 border-2 border-white/10 relative group-hover:border-primary/50 transition-colors">
                    <AvatarImage src={profile.avatar_url || ''} className="object-cover" />
                    <AvatarFallback className="bg-background text-primary text-xl font-bold">
                      {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">{profile.display_name || profile.username}</h2>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white">Tier</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                  {profile.role.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Coins className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-white">Tokens</span>
                </div>
                <span className="text-sm font-bold text-secondary">
                  {profile.tokens_balance.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form Column */}
        <div className="md:col-span-2">
          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Profile Details</CardTitle>
              <CardDescription>Update your public appearance in the Dreamscape.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">Email Address</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="bg-black/40 border-white/10 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-muted-foreground italic">Email changes are restricted for security.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/70">Username (@slug)</Label>
                  <Input 
                    id="username" 
                    value={profile.username || ''} 
                    disabled 
                    className="bg-black/40 border-white/10 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-muted-foreground italic">Usernames are permanent and linked to your profile URL.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name" className="text-white/70">Display Name</Label>
                  <Input 
                    id="display_name" 
                    placeholder="How should we call you?"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">Profile Photo</h4>
                      <p className="text-xs text-muted-foreground">Click the avatar to upload a new picture.</p>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="border-white/10 hover:bg-white/10"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Change'}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground italic text-center border-t border-white/5 pt-2">
                    Max size: 2MB. Supports JPG, PNG, or WEBP.
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full md:w-auto px-10 py-6 neon-button h-auto"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
