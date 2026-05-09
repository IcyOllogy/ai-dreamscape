import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Link as LinkIcon, Edit3, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

interface ProfileHeroProps {
  profile: any;
  isOwner: boolean;
}

export function ProfileHero({ profile, isOwner }: ProfileHeroProps) {
  const initials = profile.display_name
    ? profile.display_name.substring(0, 2).toUpperCase()
    : profile.username?.substring(0, 2).toUpperCase() || '??';

  return (
    <div className="relative mb-8">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full relative overflow-hidden rounded-3xl border border-white/10 group">
        {profile.banner_url ? (
          <img 
            src={profile.banner_url} 
            alt="Banner" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      {/* Avatar & Info Container */}
      <div className="px-6 md:px-10 -mt-12 md:-mt-16 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-40"></div>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background ring-2 ring-white/10 relative">
              <AvatarImage src={profile.avatar_url || ''} className="object-cover" />
              <AvatarFallback className="bg-background text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center md:text-left pb-2">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {profile.display_name || profile.username}
              </h1>
              {profile.is_verified && (
                <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 shadow-neon" />
              )}
            </div>
            <p className="text-white/50 font-medium">@{profile.username}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pb-2">
          {isOwner ? (
            <>
              <Button asChild variant="outline" className="glass-panel border-white/10 hover:bg-white/10 gap-2">
                <Link to="/settings" search={{ tab: 'account' }}>
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button asChild variant="outline" className="glass-panel border-white/10 hover:bg-white/10 px-3">
                <Link to="/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
            </>
          ) : (
            <Button className="neon-button px-8">
              Follow
            </Button>
          )}
        </div>
      </div>

      {/* Bio & Metadata */}
      <div className="px-6 md:px-10 mt-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {profile.bio ? (
            <p className="text-white/80 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          ) : (
            <p className="text-white/30 italic">No bio yet.</p>
          )}

          <div className="flex flex-wrap gap-4 text-xs font-medium text-white/40">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Joined {format(new Date(profile.created_at), 'MMMM yyyy')}
            </div>
            {profile.role && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">
                {profile.role.replace('_', ' ')}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex md:justify-end items-start gap-8 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
          <div className="text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-[10px] uppercase tracking-widest text-white/30">Collections</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-[10px] uppercase tracking-widest text-white/30">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-[10px] uppercase tracking-widest text-white/30">Tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
}
