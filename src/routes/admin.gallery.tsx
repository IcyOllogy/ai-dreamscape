import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Filter, Trash2, Eye, EyeOff, User, MoreVertical, Grid, List as ListIcon, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

interface GalleryItem {
  id: string;
  user_id: string;
  image_url: string;
  prompt: string;
  companion_id: string | null;
  is_public: boolean;
  created_at: string;
  profiles: {
    username: string;
    display_name: string;
  };
}

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [filter]);

  async function fetchGallery() {
    setLoading(true);
    try {
      let query = supabase
        .from("user_assets")
        .select(`
          *,
          profiles (
            username,
            display_name
          )
        `)
        .order("created_at", { ascending: false });

      if (filter === "public") query = query.eq("is_public", true);
      if (filter === "private") query = query.eq("is_public", false);

      const { data, error } = await query;
      if (error) throw error;
      setItems(data as any[]);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Neural link to gallery failed.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Are you sure you want to permanently delete this image?")) return;
    try {
      const { error } = await supabase.from("user_assets").delete().eq("id", id);
      if (error) throw error;
      toast.success("Image expunged from memory.");
      setItems(items.filter(i => i.id !== id));
      if (selectedImage?.id === id) setSelectedImage(null);
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  }

  async function togglePrivacy(item: GalleryItem) {
    try {
      const { error } = await supabase
        .from("user_assets")
        .update({ is_public: !item.is_public })
        .eq("id", item.id);
      
      if (error) throw error;
      toast.success(`Image visibility updated.`);
      setItems(items.map(i => i.id === item.id ? { ...i, is_public: !item.is_public } : i));
    } catch (error) {
      toast.error("Failed to update visibility.");
    }
  }

  const filteredItems = items.filter(i => 
    i.profiles?.username?.toLowerCase().includes(search.toLowerCase()) ||
    i.prompt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Gallery Moderator</h1>
          <p className="text-sm text-zinc-500">Full override access to all generated imagery.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-black' : 'text-zinc-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-black' : 'text-zinc-500'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-primary"
          >
            <option value="all">All Sectors</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search prompt or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-64"
            />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square glass-panel rounded-2xl border-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-40 glass-panel rounded-[2rem] border-white/5 border-dashed">
          <div className="text-zinc-700 italic text-sm">No neural fragments found in this sector.</div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-square rounded-2xl border border-white/5 overflow-hidden cursor-pointer hover:border-primary/50 transition-all shadow-2xl"
              onClick={() => setSelectedImage(item)}
            >
              <img 
                src={item.image_url} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="text-[10px] font-black text-white uppercase tracking-widest truncate">@{item.profiles?.username}</div>
                <div className="flex items-center justify-between mt-2">
                   {item.is_public ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-zinc-500" />}
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(item.id);
                    }}
                    className="p-1 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500 transition-colors"
                   >
                     <Trash2 className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Image</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Creator</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Prompt Snippet</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Visibility</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-4">
                    <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white">@{item.profiles?.username}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-[10px] text-zinc-500 line-clamp-1 italic">"{item.prompt}"</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${item.is_public ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {item.is_public ? 'Public' : 'Private'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => togglePrivacy(item)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => deleteImage(item.id)} className="p-2 rounded-lg hover:bg-white/5 text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)} />
          <div className="relative glass-panel rounded-[2.5rem] border-white/10 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden animate-scale-in">
            <div className="flex-1 bg-black/40 flex items-center justify-center p-4">
              <img src={selectedImage.image_url} alt="" className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl" />
            </div>
            <div className="w-full md:w-80 p-8 flex flex-col gap-8 bg-white/[0.02] border-l border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest">@{selectedImage.profiles?.username}</div>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-zinc-600 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Generation Prompt</h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-zinc-400 italic leading-relaxed">
                  "{selectedImage.prompt}"
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Metadata</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Created</div>
                    <div className="text-[10px] font-bold text-white">{new Date(selectedImage.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Visibility</div>
                    <div className="text-[10px] font-bold text-white">{selectedImage.is_public ? 'Public' : 'Private'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => togglePrivacy(selectedImage)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  {selectedImage.is_public ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {selectedImage.is_public ? 'Make Private' : 'Make Public'}
                </button>
                <button 
                  onClick={() => deleteImage(selectedImage.id)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em] text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  Expunge Fragment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function X({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}
