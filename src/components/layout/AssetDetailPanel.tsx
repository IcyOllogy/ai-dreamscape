import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Share2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  ExternalLink,
  Calendar,
  Fingerprint,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface AssetDetailPanelProps {
  asset: any;
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
  onUpdate?: (updates: any) => void;
  onDelete?: () => void;
}

export function AssetDetailPanel({ 
  asset, 
  isOpen, 
  onClose, 
  isOwner,
  onUpdate,
  onDelete
}: AssetDetailPanelProps) {
  if (!asset) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl glass-panel border-l border-white/10 p-0 overflow-y-auto custom-scrollbar">
        {/* Main Image View */}
        <div className="relative aspect-[2/3] w-full group">
          <img 
            src={asset.image_url} 
            alt={asset.prompt} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full bg-black/40 backdrop-blur-md border-white/10" onClick={() => copyToClipboard(asset.image_url, 'Image link')}>
              <Share2 className="w-4 h-4" />
            </Button>
            {isOwner && (
              <Button size="icon" variant="destructive" className="rounded-full bg-red-500/40 backdrop-blur-md border-red-500/20 hover:bg-red-500/60" onClick={onDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {asset.companion_id || 'Original'}
                </Badge>
                {asset.is_nsfw && (
                  <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">
                    NSFW
                  </Badge>
                )}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {format(new Date(asset.created_at), 'PPP')}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Prompt
              </h3>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 group relative">
                <p className="text-sm text-white/90 leading-relaxed italic">
                  "{asset.prompt || 'No prompt recorded.'}"
                </p>
                <button 
                  onClick={() => copyToClipboard(asset.prompt, 'Prompt')}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                >
                  <Copy className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Seed</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono text-white/80">{asset.seed || 'N/A'}</p>
                {asset.seed && (
                  <button onClick={() => copyToClipboard(asset.seed, 'Seed')}>
                    <Copy className="w-3 h-3 text-white/20 hover:text-white" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Visibility</p>
              <div className="flex items-center gap-2">
                {asset.is_public ? (
                  <>
                    <Eye className="w-3 h-3 text-primary" />
                    <span className="text-sm text-primary font-medium">Public</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 text-white/40" />
                    <span className="text-sm text-white/40 font-medium">Private</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          {isOwner && (
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => onUpdate?.({ is_public: !asset.is_public })}
                variant="outline" 
                className="w-full h-12 glass-panel border-white/10 hover:bg-white/10 gap-2"
              >
                {asset.is_public ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {asset.is_public ? 'Make Private' : 'Publish to Profile'}
              </Button>
              <Button className="w-full h-12 neon-button gap-2">
                <Download className="w-4 h-4" />
                Download Original
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
