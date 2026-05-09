import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ProfileHero } from '@/components/layout/ProfileHero';
import { MasonryGallery } from '@/components/layout/MasonryGallery';
import { AssetDetailPanel } from '@/components/layout/AssetDetailPanel';
import { CollectionFilters } from '@/components/layout/CollectionFilters';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image as ImageIcon, Heart, Lock, ShieldAlert, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/$username')({
  loader: async ({ params }) => {
    let { username } = params;
    
    // Strip leading @ if present to match DB
    if (username.startsWith('@')) {
      username = username.substring(1);
    }
    
    // Fetch profile by username
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !profile) {
      throw new Error('Profile not found');
    }

    return { profile };
  },
  component: ProfilePage,
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-full bg-red-500/10 mb-6">
        <ShieldAlert className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Dreamer Not Found</h1>
      <p className="text-white/50 max-w-md">
        The user you are looking for has either left the Dreamscape or never existed.
      </p>
      <button 
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-2 glass-panel border-white/10 hover:bg-white/10 text-white rounded-xl transition-all"
      >
        Go Back
      </button>
    </div>
  ),
});

function ProfilePage() {
  const { profile } = Route.useLoaderData();
  const { profile: currentUser } = useAuth();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  
  // Filter states
  const [nsfwFilter, setNsfwFilter] = useState<boolean | 'all'>('all');
  const [companionFilter, setCompanionFilter] = useState<string>('all');
  
  const isOwner = currentUser?.id === profile.id;
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      try {
        let query = supabase
          .from('user_assets')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false });

        // If not owner or admin, only show public assets
        if (!isOwner && !isAdmin) {
          query = query.eq('is_public', true);
        }

        const { data, error } = await query;
        if (error) throw error;
        setAssets(data || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, [profile.id, isOwner, isAdmin]);

  const handleUpdateAsset = async (updates: any) => {
    if (!selectedAsset) return;
    
    const { error } = await supabase
      .from('user_assets')
      .update(updates)
      .eq('id', selectedAsset.id);

    if (error) {
      toast.error('Failed to update asset');
    } else {
      setAssets(assets.map(a => a.id === selectedAsset.id ? { ...a, ...updates } : a));
      setSelectedAsset({ ...selectedAsset, ...updates });
      toast.success('Asset updated');
    }
  };

  const handleDeleteAsset = async () => {
    if (!selectedAsset) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this generation?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('user_assets')
      .delete()
      .eq('id', selectedAsset.id);

    if (error) {
      toast.error('Failed to delete asset');
    } else {
      setAssets(assets.filter(a => a.id !== selectedAsset.id));
      setSelectedAsset(null);
      toast.success('Asset deleted');
    }
  };

  const filteredAssets = assets.filter(asset => {
    if (nsfwFilter !== 'all' && asset.is_nsfw !== nsfwFilter) return false;
    if (companionFilter !== 'all' && asset.companion_id !== companionFilter) return false;
    return true;
  });

  const uniqueCompanions = Array.from(new Set(assets.map(a => a.companion_id).filter(Boolean)));

  return (
    <div className="container max-w-7xl py-10 px-4">
      <ProfileHero profile={profile} isOwner={isOwner} />

      <Tabs defaultValue="collection" className="mt-12">
        <div className="flex items-center justify-between border-b border-white/5 pb-px">
          <TabsList className="bg-transparent h-12 gap-8">
            <TabsTrigger 
              value="collection" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 text-sm font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Collection
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="favorites"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 text-sm font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Favorites
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="collection" className="mt-8 outline-none">
          {!loading && assets.length > 0 && (
            <CollectionFilters 
              nsfwFilter={nsfwFilter}
              onNsfwChange={setNsfwFilter}
              companionFilter={companionFilter}
              onCompanionChange={setCompanionFilter}
              companions={uniqueCompanions}
            />
          )}

          {loading ? (
            <MasonryGallery assets={[]} loading={true} />
          ) : filteredAssets.length > 0 ? (
            <MasonryGallery 
              assets={filteredAssets} 
              onAssetClick={(asset) => setSelectedAsset(asset)} 
            />
          ) : assets.length > 0 ? (
             <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-12 glass-panel border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
                <p className="text-white/40 text-sm">Try adjusting your filters.</p>
             </div>
          ) : (
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-12 glass-panel border-white/10 rounded-3xl bg-white/5">
              <div className="p-4 rounded-full bg-white/5 mb-4">
                {isOwner ? (
                  <ImageIcon className="w-8 h-8 text-white/20" />
                ) : (
                  <Lock className="w-8 h-8 text-white/20" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isOwner ? "Your collection is empty" : "This collection is private"}
              </h3>
              <p className="text-white/40 max-w-sm text-sm">
                {isOwner 
                  ? "Start generating with your companions to build your personal gallery." 
                  : "This user has chosen to keep their creations private for now."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-8 outline-none">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-12 glass-panel border-white/10 rounded-3xl bg-white/5">
            <div className="p-4 rounded-full bg-white/5 mb-4">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No favorites yet</h3>
            <p className="text-white/40 max-w-sm text-sm">
              Explore the gallery and heart the creations you love most.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <AssetDetailPanel 
        asset={selectedAsset}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isOwner={isOwner}
        onUpdate={handleUpdateAsset}
        onDelete={handleDeleteAsset}
      />
    </div>
  );
}
