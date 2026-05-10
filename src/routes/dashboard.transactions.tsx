import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coins, 
  Search,
  Filter,
  Download,
  Calendar,
  CreditCard,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { format } from 'date-fns';

export const Route = createFileRoute('/dashboard/transactions')({
  component: TransactionsPage,
});

function TransactionsPage() {
  const { profile } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (profile?.id) {
      fetchTransactions();
    }
  }, [profile?.id]);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description?.toLowerCase().includes(search.toLowerCase()) || 
                         tx.type?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'replenishment': return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'generation': return <ArrowUpRight className="w-4 h-4 text-zinc-500" />;
      case 'refund': return <ArrowDownLeft className="w-4 h-4 text-amber-400" />;
      default: return <Coins className="w-4 h-4 text-primary" />;
    }
  };

  const getAmountColor = (amount: number, type: string) => {
    if (type === 'generation') return 'text-zinc-500';
    return amount > 0 ? 'text-emerald-400' : 'text-red-400';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
            <History className="w-3 h-3" />
            Financial Ledger
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Transaction History</h2>
          <p className="text-sm text-zinc-500 mt-1">Audit logs of all token movements and credits.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary/50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-3 rounded-2xl border border-white/10 hover:bg-white/5 text-zinc-400 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {['all', 'purchase', 'replenishment', 'generation', 'refund'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filterType === type 
                ? 'bg-primary text-black' 
                : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Event</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Description</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-zinc-600 italic">
                      <RefreshCw className="w-6 h-6 animate-spin text-primary/30" />
                      Decrypting ledger entries...
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-zinc-600 italic">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                          {getIcon(tx.type)}
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-white">{tx.type}</div>
                          <div className="text-[10px] text-zinc-500 font-bold">ID: {tx.id.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium text-zinc-300 max-w-md truncate">{tx.description}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-tight">
                          {format(new Date(tx.created_at), 'MMM dd, yyyy · HH:mm')}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className={`text-sm font-black ${getAmountColor(tx.amount, tx.type)}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} 
                        <span className="text-[10px] ml-1 opacity-50">TKN</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
