import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Megaphone, X } from "lucide-react";

export function PlatformBanner() {
  const [banner, setBanner] = useState<{ text: string; is_visible: boolean } | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetchBanner();
    
    // Subscribe to changes
    const channel = supabase
      .channel('platform_settings_changes')
      .on('postgres_changes', { event: 'UPDATE', table: 'platform_settings', schema: 'public' }, (payload) => {
        if (payload.new.key === 'global_announcement') {
          setBanner(payload.new.value);
          setClosed(false); // Re-open if banner content changes
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchBanner() {
    const { data } = await supabase
      .from("platform_settings")
      .select("value")
      .eq("key", "global_announcement")
      .single();
    
    if (data?.value?.is_visible) {
      setBanner(data.value);
    }
  }

  if (!banner?.is_visible || !banner.text || closed) return null;

  return (
    <div className="relative bg-primary text-black py-2 px-4 animate-slide-down overflow-hidden group">
      {/* Animated Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative z-10">
        <Megaphone className="w-4 h-4 animate-bounce" />
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-center">
          {banner.text}
        </p>
        <button 
          onClick={() => setClosed(true)}
          className="absolute right-0 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
