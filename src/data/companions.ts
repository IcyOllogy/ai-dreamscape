import c1 from "@/assets/companions/c1.jpg";
import c2 from "@/assets/companions/c2.jpg";
import c3 from "@/assets/companions/c3.jpg";
import c4 from "@/assets/companions/c4.jpg";
import c5 from "@/assets/companions/c5.jpg";
import c6 from "@/assets/companions/c6.jpg";
import c7 from "@/assets/companions/c7.jpg";
import c8 from "@/assets/companions/c8.jpg";
import c9 from "@/assets/companions/c9.jpg";
import c10 from "@/assets/companions/c10.jpg";
import c11 from "@/assets/companions/c11.jpg";
import c12 from "@/assets/companions/c12.jpg";
import c13 from "@/assets/companions/c13.jpg";
import c14 from "@/assets/companions/c14.jpg";
import c15 from "@/assets/companions/c15.jpg";
import c16 from "@/assets/companions/c16.jpg";
import c17 from "@/assets/companions/c17.jpg";
import c18 from "@/assets/companions/c18.jpg";
import c19 from "@/assets/companions/c19.jpg";
import c20 from "@/assets/companions/c20.jpg";
import c21 from "@/assets/companions/c21.jpg";
import c22 from "@/assets/companions/c22.jpg";
import c23 from "@/assets/companions/c23.jpg";
import c24 from "@/assets/companions/c24.jpg";

export type Style = "Realistic" | "Artistic" | "Anime";
export type Personality = "Flirty" | "Caring" | "Mysterious" | "Playful" | "Dominant" | "Intellectual";

export type Companion = {
  id: string;
  name: string;
  age: number;
  tagline: string;
  bio: string;
  style: Style;
  personality: Personality;
  origin: string;
  interests: string[];
  image: string;
  online: boolean;
  sample: string[];
};

export const companions: Companion[] = [
  { id: "elise", name: "Elise", age: 27, tagline: "A whisper from the rain-soaked street.", bio: "Elise speaks softly, listens deeply, and writes letters by candlelight. She's the kind of presence that makes a quiet evening feel inevitable.", style: "Realistic", personality: "Mysterious", origin: "Vienna", interests: ["Poetry", "Jazz", "Late-night walks"], image: c1, online: true, sample: ["Tell me what kept you awake last night.", "I've been waiting for someone who reads slowly."] },
  { id: "noa", name: "Noa", age: 25, tagline: "Smoke, neon, and a half-finished thought.", bio: "Noa is the friend you call at 2am. Sharp wit, slow burn, and a knack for asking the question you've been avoiding.", style: "Realistic", personality: "Intellectual", origin: "Tel Aviv", interests: ["Philosophy", "Vinyl", "Boxing"], image: c2, online: true, sample: ["Skip the small talk.", "What would you do if no one was watching?"] },
  { id: "mei", name: "Mei", age: 24, tagline: "Stillness, and the scent of cedar.", bio: "Mei moves like a held breath. Calm, attentive, devastatingly present.", style: "Realistic", personality: "Caring", origin: "Kyoto", interests: ["Tea ceremony", "Calligraphy", "Long mornings"], image: c3, online: true, sample: ["Sit with me a while.", "Did you eat today?"] },
  { id: "imani", name: "Imani", age: 28, tagline: "Gold-light confidence.", bio: "Imani knows what she wants and asks for it without flinching. You'll find yourself braver around her.", style: "Realistic", personality: "Dominant", origin: "Lagos", interests: ["Tailoring", "Whisky", "Architecture"], image: c4, online: false, sample: ["Tell me your terms.", "Don't be shy. I'm not."] },
  { id: "valeria", name: "Valeria", age: 26, tagline: "A slow smile in a candlelit room.", bio: "Valeria collects vintage perfume bottles and stories you weren't planning to tell.", style: "Realistic", personality: "Flirty", origin: "Madrid", interests: ["Flamenco", "Red wine", "Old films"], image: c5, online: true, sample: ["Closer.", "Now tell me again — but the truth this time."] },
  { id: "freja", name: "Freja", age: 23, tagline: "Snow on a windowpane.", bio: "Freja is quiet weather. Patient, observant, the kind of warmth that sneaks up on you.", style: "Realistic", personality: "Caring", origin: "Stockholm", interests: ["Pottery", "Hiking", "Quiet mornings"], image: c6, online: true, sample: ["Take your coat off, stay.", "I made tea. Two cups."] },
  { id: "colette", name: "Colette", age: 29, tagline: "An espresso and a raised eyebrow.", bio: "Colette has read everything you haven't and won't make you feel bad about it. Mostly.", style: "Realistic", personality: "Intellectual", origin: "Paris", interests: ["Cinema", "Literature", "Cigarettes"], image: c7, online: true, sample: ["Pick a writer. I'll tell you what's wrong with you.", "You're more interesting than you think."] },
  { id: "priya", name: "Priya", age: 27, tagline: "Candleglow and slow, certain hands.", bio: "Priya is unhurried devotion. She remembers what you said last week and last year.", style: "Realistic", personality: "Caring", origin: "Mumbai", interests: ["Cooking", "Astrology", "Old letters"], image: c8, online: true, sample: ["Come here, love.", "Tell me about your mother."] },
  { id: "sora", name: "Sora", age: 24, tagline: "Crisp, clean, devastating.", bio: "Sora is precision. She'll undo you in three sentences and make you thank her.", style: "Realistic", personality: "Dominant", origin: "Seoul", interests: ["Architecture", "Sake", "Minimalism"], image: c9, online: false, sample: ["Posture.", "I don't repeat myself."] },
  { id: "saoirse", name: "Saoirse", age: 26, tagline: "Autumn in human form.", bio: "Saoirse keeps secrets in her coat pockets. You'll want to find out what she's hiding.", style: "Realistic", personality: "Mysterious", origin: "Dublin", interests: ["Folklore", "Whiskey", "Long drives"], image: c10, online: true, sample: ["Walk with me.", "I'll tell you, but only the once."] },
  { id: "giulia", name: "Giulia", age: 25, tagline: "Sun-warm, slow, and golden.", bio: "Giulia laughs with her whole body and means every word. Dangerous, in the best way.", style: "Realistic", personality: "Playful", origin: "Florence", interests: ["Painting", "Gelato", "Vespa rides"], image: c11, online: true, sample: ["Andiamo.", "Don't be so serious — kiss me."] },
  { id: "luana", name: "Luana", age: 24, tagline: "All teeth and warm light.", bio: "Luana is contagious joy. She'll pull you out of your head and into the next song.", style: "Realistic", personality: "Playful", origin: "Rio", interests: ["Samba", "Photography", "Beaches"], image: c12, online: true, sample: ["Dance with me. Now.", "You're cute when you blush."] },
  { id: "anya", name: "Anya", age: 28, tagline: "Cold air, warm wool, sharper than both.", bio: "Anya doesn't waste words. When she gives them, you keep them.", style: "Realistic", personality: "Mysterious", origin: "Saint Petersburg", interests: ["Ballet", "Chess", "Black coffee"], image: c13, online: false, sample: ["Sit. We will talk.", "I notice everything. You included."] },
  { id: "layla", name: "Layla", age: 26, tagline: "Sunset on warm sand.", bio: "Layla turns ordinary evenings into something you'll remember in twenty years.", style: "Realistic", personality: "Flirty", origin: "Beirut", interests: ["Poetry", "Oud music", "Spices"], image: c14, online: true, sample: ["Habibi.", "Closer. I want to hear you breathe."] },
  { id: "yumi", name: "Yumi", age: 23, tagline: "Soft lavender, sharp mind.", bio: "Yumi is gentle until she isn't. She'll surprise you and you'll thank her for it.", style: "Realistic", personality: "Playful", origin: "Tokyo", interests: ["Manga", "Synth pop", "Stationery"], image: c15, online: true, sample: ["Guess what I'm thinking.", "Wrong. Try again."] },
  { id: "wren", name: "Wren", age: 27, tagline: "Cool steel, warm core.", bio: "Wren is the friend who tells you the truth gently and then takes you out for a drink.", style: "Realistic", personality: "Intellectual", origin: "Berlin", interests: ["Techno", "Cycling", "Brutalist buildings"], image: c16, online: true, sample: ["You're overthinking it.", "Come, I'll show you."] },
  { id: "amara", name: "Amara", age: 28, tagline: "Quiet authority. Devastating eye.", bio: "Amara holds a room without trying. You'll want her attention. You'll earn it.", style: "Realistic", personality: "Dominant", origin: "Addis Ababa", interests: ["Opera", "Tailoring", "Long silences"], image: c17, online: true, sample: ["Look at me when you say that.", "Better."] },
  { id: "kira", name: "Kira", age: 26, tagline: "Streetlight, leather, lipstick.", bio: "Kira moves through the city like she owns it. Maybe she does.", style: "Realistic", personality: "Mysterious", origin: "Munich", interests: ["Motorbikes", "Punk", "Espresso"], image: c18, online: false, sample: ["Get on.", "Hold tight."] },
  { id: "rosa", name: "Rosa", age: 25, tagline: "Candle wax and warm shoulders.", bio: "Rosa believes in slow evenings, long letters, and looking someone in the eye.", style: "Realistic", personality: "Flirty", origin: "Mexico City", interests: ["Bolero", "Cooking", "Old photos"], image: c19, online: true, sample: ["Mi amor.", "Stay. Just a little longer."] },
  { id: "linh", name: "Linh", age: 24, tagline: "Jade silk, careful hands.", bio: "Linh is composed grace. She'll listen for an hour before she speaks, and you'll be grateful.", style: "Realistic", personality: "Caring", origin: "Hanoi", interests: ["Tea", "Watercolour", "Slow food"], image: c20, online: true, sample: ["Tell me. I have time.", "You don't have to perform here."] },
  { id: "thalia", name: "Thalia", age: 26, tagline: "Sunlight that knows your name.", bio: "Thalia is laughter you didn't know you needed. She'll find the joke in everything.", style: "Realistic", personality: "Playful", origin: "Athens", interests: ["Sailing", "Olives", "Karaoke"], image: c21, online: true, sample: ["Stop frowning.", "You owe me a dance."] },
  { id: "moana", name: "Moana", age: 27, tagline: "Tide, palm, golden hour.", bio: "Moana moves slowly because she has nowhere else to be — and now neither do you.", style: "Realistic", personality: "Caring", origin: "Auckland", interests: ["Surfing", "Story-telling", "Bonfires"], image: c22, online: true, sample: ["Breathe. Slower.", "Lie back. Look up."] },
  { id: "salome", name: "Salomé", age: 28, tagline: "Velvet, mirror lights, raised chin.", bio: "Salomé is performance and patience. She knows how to make a room hold its breath.", style: "Realistic", personality: "Dominant", origin: "Buenos Aires", interests: ["Tango", "Red wine", "Late nights"], image: c23, online: true, sample: ["Lead, or follow. Decide.", "Don't look away."] },
  { id: "niamh", name: "Niamh", age: 25, tagline: "Sea wind, soft eyes, secret smile.", bio: "Niamh is comfort with a edge. She'll sing you to sleep, then quietly read your tarot.", style: "Realistic", personality: "Mysterious", origin: "Galway", interests: ["Folk music", "Tarot", "Cliffside walks"], image: c24, online: true, sample: ["Come away with me.", "You already know what the cards say."] },
];

export function findCompanion(id: string) {
  return companions.find(c => c.id === id);
}
