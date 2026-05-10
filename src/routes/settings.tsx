import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, Shield, Bell, Loader2, Camera, Check } from 'lucide-react';

export const Route = createFileRoute('/settings')({
  beforeLoad: ({ context }) => {
    if (!context.auth.loading && !context.auth.profile) {
      throw redirect({ to: '/login' });
    }
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { profile, updateProfile, uploadAvatar } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    display_name: '',
    username: '',
    bio: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Logic for 30-day cooldown check would go here (fetch last_handle_change)
    // For now, simple update
    const result = await updateProfile({
      display_name: formData.display_name,
      username: formData.username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
      bio: formData.bio,
    });

    if (result.success) {
      toast.success('Settings updated');
    } else {
      toast.error('Failed to update settings');
    }
    setIsUpdating(false);
  };

  if (!profile) return null;

  return (
    <div className="container max-w-5xl py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your identity and account preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="account" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <form onSubmit={handleUpdateProfile} className="grid gap-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-1">
              <Card className="glass-panel border-white/10 bg-white/5">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                      <div className="h-24 w-24 rounded-full border-2 border-white/10 relative overflow-hidden bg-background flex items-center justify-center">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-white/20" />
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setIsUploading(true);
                            await uploadAvatar(file);
                            setIsUploading(false);
                            toast.success('Avatar updated');
                          }
                        }}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">Profile Image</CardTitle>
                  <CardDescription>JPG, PNG or WEBP. Max 2MB.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className="glass-panel border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Public Profile</CardTitle>
                  <CardDescription>This information will be visible to other dreamers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="display_name" className="text-white/70">Display Name</Label>
                      <Input 
                        id="display_name" 
                        name="display_name"
                        autoComplete="name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white/70">Handle (@username)</Label>
                      <Input 
                        id="username" 
                        name="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="bio" className="text-white/70">Bio</Label>
                      <span className="text-[10px] text-white/30">{formData.bio.length}/160</span>
                    </div>
                    <textarea 
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      maxLength={160}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full min-h-[100px] rounded-md bg-white/5 border border-white/10 text-white p-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none text-sm"
                      placeholder="Tell the Dreamscape about yourself..."
                    />
                  </div>

                  <Button type="submit" disabled={isUpdating} className="neon-button">
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription>Manage your password and account protection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-white">Password</h4>
                  <p className="text-xs text-muted-foreground">Change your password to keep your account secure.</p>
                </div>
                <Button variant="outline" className="border-white/10 hover:bg-white/10">Update</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Badge variant="outline" className="bg-white/5 border-white/10 text-white/30">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Email Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'New companion releases',
                'Community spotlights',
                'Account security alerts',
                'Promotional offers'
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <span className="text-sm text-white/70">{item}</span>
                  <div className="w-10 h-5 rounded-full bg-primary/20 border border-primary/30 relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-primary shadow-neon" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
