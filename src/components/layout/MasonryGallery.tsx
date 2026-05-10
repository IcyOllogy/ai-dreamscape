import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Maximize2, Heart, Share2, Info } from 'lucide-react';
import { LuxuryImage } from '@/components/ui/luxury-image';

interface Asset {
  id: string;
  image_url: string;
  prompt?: string;
  is_nsfw: boolean;
  companion_id?: string;
}

interface MasonryGalleryProps {
  assets: Asset[];
  loading?: boolean;
  onAssetClick?: (asset: Asset) => void;
}

export function MasonryGallery({ assets, loading, onAssetClick }: MasonryGalleryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] rounded-2xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return null; // Parent handles empty state
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} onClick={() => onAssetClick?.(asset)} />
      ))}
    </div>
  );
}

function AssetCard({ asset, onClick }: { asset: Asset; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="relative break-inside-avoid overflow-hidden rounded-2xl border-white/5 bg-white/5 group cursor-pointer transition-all duration-500 hover:shadow-neon-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <LuxuryImage 
          src={asset.image_url} 
          alt={asset.prompt || "Generated Asset"} 
        />
        
        {/* Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {asset.is_nsfw && (
            <Badge variant="destructive" className="text-[9px] h-4 px-1.5 bg-red-500/80 backdrop-blur-sm border-none">
              NSFW
            </Badge>
          )}
        </div>

        {/* Actions Overlay */}
        <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex justify-end gap-2">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-primary/20 hover:text-primary transition-colors">
              <Heart strokeWidth={1.5} className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-primary/20 hover:text-primary transition-colors">
              <Share2 strokeWidth={1.5} className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {asset.prompt && (
              <p className="text-[10px] text-white/70 line-clamp-2 leading-tight italic">
                "{asset.prompt}"
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-neon" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  {asset.companion_id || 'Original'}
                </span>
              </div>
              <button className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
