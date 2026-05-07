import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { companions, findCompanion, type Companion } from "@/data/companions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Noctis" },
      { name: "description", content: "A private conversation, in the dark." },
      { property: "og:title", content: "Chat — Noctis" },
    ],
  }),
  component: ChatPage,
});

type Msg = { from: "her" | "me"; text: string; t: number };

const replies = [
  "Mm. Tell me more.",
  "I was just thinking about you.",
  "Closer. I want to hear that again, slowly.",
  "You always say the most interesting things at this hour.",
  "I won't pretend I'm not smiling.",
  "Don't stop. I'm listening.",
];

function ChatPage() {
  const [activeId, setActiveId] = useState<string>("elise");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Msg[]>>({});
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("noctis-chat-id");
      if (stored && findCompanion(stored)) setActiveId(stored);
    } catch {
      // ignore (e.g. storage disabled)
    }
  }, []);

  const active = useMemo(() => findCompanion(activeId)!, [activeId]);

  // seed conversation on first open of a companion
  useEffect(() => {
    setMessages((prev) => {
      if (prev[activeId]) return prev;
      return {
        ...prev,
        [activeId]: [
          { from: "her", text: active.sample[0] ?? "Hello, you.", t: Date.now() - 60000 },
          { from: "her", text: active.sample[1] ?? "I've been waiting.", t: Date.now() - 30000 },
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
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 pt-20 grid lg:grid-cols-[280px_1fr_320px] h-screen">
        {/* LEFT — companion list */}
        <aside className="hidden lg:flex flex-col border-r border-border bg-card/50 overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="text-[10px] uppercase tracking-[0.3em] gold-text mb-2">
              Conversations
            </div>
            <div className="font-display text-2xl text-ivory">Tonight</div>
          </div>
          <div className="overflow-y-auto">
            {companions.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveId(c.id);
                }}
                className={`w-full text-left flex items-center gap-3 p-3 border-b border-border/50 transition-colors ${activeId === c.id ? "bg-primary/10" : "hover:bg-card"}`}
              >
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary border border-background" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-ivory truncate font-medium">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate italic">
                    {c.tagline}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER — thread */}
        <main className="flex flex-col bg-background">
          <header className="px-6 py-4 border-b border-border flex items-center gap-3">
            <img src={active.image} alt={active.name} className="w-10 h-10 object-cover" />
            <div className="flex-1">
              <div className="font-display text-xl text-ivory">{active.name}</div>
              <div className="text-[11px] text-muted-foreground">
                {active.online ? (
                  <span className="gold-text">● Online · with you</span>
                ) : (
                  "Last seen earlier"
                )}
              </div>
            </div>
            <button className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary">
              Voice
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
            <div className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-6">
              — Today —
            </div>
            {(messages[activeId] ?? []).map((m, i) => (
              <Bubble key={i} m={m} c={active} />
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <img src={active.image} alt="" className="w-7 h-7 object-cover rounded-full" />
                <div className="bg-card px-5 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot"
                    style={{ animationDelay: "200ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          <footer className="border-t border-border p-4">
            <div className="flex items-center gap-2 gold-border bg-card px-4 py-2">
              <button className="text-muted-foreground hover:text-primary text-lg">＋</button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={`Message ${active.name}…`}
                className="flex-1 bg-transparent border-0 outline-none text-sm text-ivory placeholder:text-muted-foreground/60 py-2"
              />
              <button className="text-muted-foreground hover:text-primary text-lg">🎙</button>
              <button
                onClick={send}
                className="px-4 py-2 text-[10px] uppercase tracking-[0.25em] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send
              </button>
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-2 text-center">
              Demo conversation. No data leaves your browser.
            </div>
          </footer>
        </main>

        {/* RIGHT — profile rail */}
        <aside className="hidden lg:flex flex-col border-l border-border bg-card/50 overflow-y-auto">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={active.image}
              alt={active.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-[10px] uppercase tracking-[0.3em] gold-text">
                {active.origin}
              </div>
              <div className="font-display text-3xl text-ivory">
                {active.name}, {active.age}
              </div>
            </div>
          </div>
          <div className="p-5 space-y-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory mb-2">Mood</div>
              <div className="text-sm text-muted-foreground italic">"{active.tagline}"</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory mb-2">Memory</div>
              <div className="flex flex-wrap gap-1.5">
                {active.interests.map((i) => (
                  <span key={i} className="text-[10px] px-2 py-1 gold-border text-muted-foreground">
                    {i}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/companions/$id"
              params={{ id: active.id }}
              className="block text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary border border-border py-3"
            >
              View profile
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
      <div className="flex items-end gap-2 max-w-xl animate-fade-in">
        <img src={c.image} alt="" className="w-7 h-7 object-cover rounded-full" />
        <div className="bg-card px-5 py-3 rounded-2xl rounded-bl-sm text-sm text-ivory">
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl rounded-br-sm text-sm max-w-xl">
        {m.text}
      </div>
    </div>
  );
}
