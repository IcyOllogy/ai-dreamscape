import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHaptics } from '@/hooks/use-haptics';
import { createServerFn } from '@tanstack/react-start';
import { checkRateLimit } from '@/lib/rate-limit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Sparkles, CreditCard, ArrowUpRight, History } from 'lucide-react';

export const Route = createFileRoute('/membership')({
  component: MembershipPage,
});

const requestRefill = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { userId: string } }) => {
    if (!checkRateLimit(`refill_${data.userId}`, 2, 86400000)) { // 2 times per day limit
      throw new Error("Refill limit exceeded. Try again tomorrow.");
    }
    // Simulate delay
    await new Promise(r => setTimeout(r, 800));
    return { success: true };
  });

function MembershipPage() {
  const { profile } = useAuth();
  const { hapticUpgrade, hapticRefill } = useHaptics();
  const router = useRouter();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isRefilling, setIsRefilling] = useState(false);

  if (!profile) return null;

  const handleUpgrade = () => {
    hapticUpgrade();
    setIsUpgrading(true);
    setTimeout(() => setIsUpgrading(false), 1000);
  };

  const handleRefill = async () => {
    if (!profile) return;
    setIsRefilling(true);
    
    try {
      await requestRefill({ data: { userId: profile.id } });
      hapticRefill();
      // Optionally trigger a refresh of user data here if needed
      // router.invalidate();
    } catch (error) {
      console.error("Failed to refill:", error);
    } finally {
      setTimeout(() => setIsRefilling(false), 1000);
    }
  };

  return (
    <div className="container max-w-6xl py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Membership Hub</h1>
        <p className="text-muted-foreground">Manage your status and token refills.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Tier Card */}
        <Card className="glass-panel border-primary/30 bg-primary/5 md:col-span-2 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-white text-2xl uppercase tracking-tighter">Current Plan</CardTitle>
                <p className="text-primary font-bold uppercase tracking-widest text-xs">
                  {profile.role.replace('_', ' ')}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30">
                <Sparkles className="w-6 h-6 text-primary shadow-neon" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black tracking-tighter text-white">Active</span>
              <span className="text-sm text-white/40">Since {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleUpgrade}
                className={`neon-button w-full h-12 shimmer-sweep ${isUpgrading ? 'shimmer-active' : ''}`}
              >
                Upgrade Tier
              </Button>
              <Button variant="outline" className="glass-panel border-white/10 hover:bg-white/10 h-12 gap-2">
                Manage Billing
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Token Pulse */}
        <Card className="glass-panel border-secondary/30 bg-secondary/5 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] -mr-16 -mt-16" />
           <CardHeader>
             <CardTitle className="text-white text-lg flex items-center gap-2">
               <Coins className="w-5 h-5 text-secondary" />
               Token Balance
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="text-5xl font-black tracking-tighter text-secondary animate-pulse">
               {profile.tokens_balance.toLocaleString()}
             </div>
             <p className="text-xs text-white/40 leading-relaxed">
               Tokens are used for image generation and premium interactions.
             </p>
             <Button 
               onClick={handleRefill}
               className={`w-full h-12 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 text-secondary font-bold uppercase tracking-widest text-[10px] shimmer-sweep ${isRefilling ? 'shimmer-active' : ''}`}
             >
               Refill Tokens
             </Button>
           </CardContent>
        </Card>
      </div>

      {/* History Placeholder */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-primary/50" />
          Recent Activity
        </h2>
        <Card className="glass-panel border-white/5 bg-white/[0.02]">
          <CardContent className="p-0">
            <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-12">
              <div className="p-4 rounded-full bg-white/5 mb-4">
                <CreditCard className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-white/40 text-sm">No recent transactions or usage logs found.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
