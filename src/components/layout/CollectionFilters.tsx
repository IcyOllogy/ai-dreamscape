import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Eye, EyeOff, SlidersHorizontal } from "lucide-react";

interface CollectionFiltersProps {
  nsfwFilter: boolean | 'all';
  onNsfwChange: (value: boolean | 'all') => void;
  companionFilter: string;
  onCompanionChange: (value: string) => void;
  companions: string[];
}

export function CollectionFilters({
  nsfwFilter,
  onNsfwChange,
  companionFilter,
  onCompanionChange,
  companions
}: CollectionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
          <Button 
            variant={nsfwFilter === 'all' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-8 text-[10px] uppercase tracking-widest px-3 rounded-lg"
            onClick={() => onNsfwChange('all')}
          >
            All
          </Button>
          <Button 
            variant={nsfwFilter === false ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-8 text-[10px] uppercase tracking-widest px-3 rounded-lg gap-2"
            onClick={() => onNsfwChange(false)}
          >
            <Eye className="w-3 h-3" />
            SFW
          </Button>
          <Button 
            variant={nsfwFilter === true ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-8 text-[10px] uppercase tracking-widest px-3 rounded-lg gap-2"
            onClick={() => onNsfwChange(true)}
          >
            <EyeOff className="w-3 h-3" />
            NSFW
          </Button>
        </div>

        <Select value={companionFilter} onValueChange={onCompanionChange}>
          <SelectTrigger className="w-[180px] h-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary/50">
            <SelectValue placeholder="All Companions" />
          </SelectTrigger>
          <SelectContent className="glass-panel border-white/10 bg-background/95">
            <SelectItem value="all">All Companions</SelectItem>
            {companions.map(companion => (
              <SelectItem key={companion} value={companion}>
                {companion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" className="text-white/40 hover:text-white gap-2">
        <SlidersHorizontal className="w-4 h-4" />
        Advanced Filters
      </Button>
    </div>
  );
}
