import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { companions, findCompanion, type Companion } from "@/data/companions";
import { Send, Mic, Plus, MoreVertical, Phone, Users } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Dreamscape" },
      { name: "description", content: "A private conversation in the Dreamscape." },
      { property: "og:title", content: "Chat — Dreamscape" },
    ],
  }),
  component: ChatPage,
});

type Msg = { from: "her" | "me"; text: string; t: number };

const replies = [
  "Mm. Tell me more, I'm listening.",
  "I was just thinking about you... perfect timing.",
  "Come closer. I want to hear that again, slowly.",
  "You always know exactly what to say to make me smile.",
  "Don't stop. I'm all yours tonight.",
  "I've been waiting for you to message me.",
];

function ChatPage() {
  const [activeId, setActiveId] = useState<string>("katya");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Msg[]>>({});
  const [typing, setTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("dreamscape-chat-id");
      if (stored && findCompanion(stored)) setActiveId(stored);
    } catch {
      // ignore
    }
  }, []);

  const active = useMemo(() => findCompanion(activeId)!, [activeId]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev[activeId]) return prev;
      return {
        ...prev,
        [activeId]: [
          { from: "her", text: active.sample[0] ?? "Hello, you.", t: Date.now() - 60000 },
          { from: "her", text: active.sample[1] ?? "I've been waiting for us to be alone.", t: Date.now() - 30000 },
        ],
      };
    });
  }, [activeId, active]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, activeId, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { from: "me", text, t: Date.now() }],
    }));
    setTyping(true);
    const delay = 800 + Math.random() * 1400;
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] ?? []), { from: "her", text: reply, t: Date.now() }],
      }));
      setTyping(false);
    }, delay);
  };

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col overflow-hidden relative">

      <div className="flex-1 grid lg:grid-cols-[300px_1fr_350px] h-full relative z-10">
        {/* LEFT — companion list */}
        <aside className={`${showSidebar ? 'flex fixed inset-0 z-50 bg-background lg:relative lg:bg-transparent' : 'hidden'} lg:flex flex-col border-r border-white/5 bg-white/[0.02]`}>
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-1">Conversations</h2>
              <div className="text-2xl font-black tracking-tighter">Dreamscape</div>
            </div>
            {showSidebar && (
              <button onClick={() => setShowSidebar(false)} className="lg:hidden p-2 text-white/50 hover:text-white">Close</button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {companions.map(c => (
              <button
                key={c.id}
                onClick={() => { setActiveId(c.id); setShowSidebar(false); }}
                className={`w-full text-left flex items-center gap-3 p-4 border-b border-white/5 transition-all ${activeId === c.id ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-white/5"}`}
              >
                <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate opacity-70 italic">{c.tagline}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER — thread */}
        <main className="flex flex-col relative h-full">
          <header className="px-6 py-4 glass-panel border-b flex items-center gap-4 z-10">
            <button 
              onClick={() => setShowSidebar(true)}
              className="w-10 h-10 rounded-full overflow-hidden border border-white/10 lg:hidden flex items-center justify-center bg-white/5"
            >
               <Users className="w-5 h-5 text-primary" />
            </button>
            <div className="flex-1">
              <div className="font-black text-xl tracking-tight">{active.name}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                {active.online ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-green-400">Online now</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <span className="text-muted-foreground">Away</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-primary transition-colors"><Phone className="w-5 h-5" /></button>
              <button className="p-2 hover:text-primary transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide pb-32">
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30 py-4">— Private Connection —</div>
            {(messages[activeId] ?? []).map((m, i) => (
              <Bubble key={i} m={m} c={active} />
            ))}
            {typing && (
              <div className="flex items-end gap-3 animate-slide-up">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={active.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="glass-card px-5 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon" style={{ animationDelay: "200ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            )}
          </div>

          <footer className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
            <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-2 flex items-center gap-2 shadow-glass">
              <button className="p-3 hover:text-primary transition-colors rounded-xl hover:bg-white/5"><Plus className="w-5 h-5" /></button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={`Message ${active.name}…`}
                className="flex-1 bg-transparent border-0 outline-none text-sm px-2 py-3"
              />
              <button className="p-3 hover:text-primary transition-colors rounded-xl hover:bg-white/5 hidden md:block"><Mic className="w-5 h-5" /></button>
              <button onClick={send} className="neon-button p-3 aspect-square flex items-center justify-center">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </footer>
        </main>

        {/* RIGHT — profile rail */}
        <aside className="hidden lg:flex flex-col border-l border-white/5 bg-white/[0.02] overflow-y-auto scrollbar-hide">
          <div className="aspect-[4/5] relative overflow-hidden group">
            <img src={active.image} alt={active.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">{active.origin}</div>
              <div className="font-black text-4xl tracking-tighter mb-2">{active.name}, {active.age}</div>
              <div className="text-xs font-medium italic text-zinc-300 opacity-80 leading-relaxed">"{active.tagline}"</div>
            </div>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">Memory & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {active.interests.map(i => <span key={i} className="text-[10px] px-3 py-1.5 rounded-full glass-card font-bold">{i}</span>)}
              </div>
            </div>
            <Link to="/companions/$id" params={{ id: active.id }} className="block w-full text-center text-xs font-bold uppercase tracking-[0.2em] border border-white/10 hover:border-primary/50 hover:text-primary transition-all py-4 rounded-xl glass-card">
              View Full Profile
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Bubble({ m, c }: { m: Msg; c: Companion }) {
  if (m.from === "her") {
    return (
      <div className="flex items-end gap-3 max-w-[85%] animate-slide-up">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
          <img src={c.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="glass-card px-5 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-zinc-100">{m.text}</div>
      </div>
    );
  }
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="neon-button px-6 py-3 rounded-2xl rounded-br-sm text-sm max-w-[80%] font-medium">{m.text}</div>
    </div>
  );
}
