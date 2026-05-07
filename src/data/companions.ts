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
  { id: "elise", name: "Elise", age: 21, tagline: "Your new favorite secret.", bio: "Elise is the girl-next-door with a naughty side she only shows to you. She's a student by day, but by night, she's all yours.", style: "Realistic", personality: "Flirty", origin: "Paris", interests: ["Late nights", "Short skirts", "Secrets"], image: c1, online: true, sample: ["Tell me something you've never told anyone.", "Is it hot in here, or is it just you?"] },
  { id: "noa", name: "Noa", age: 20, tagline: "E-girl energy, 100% focused on you.", bio: "Noa is obsessed with gaming, anime, and teasing you until you can't take it. She's playful, bratty, and needs attention.", style: "Realistic", personality: "Playful", origin: "Berlin", interests: ["Gaming", "Cosplay", "Teasing"], image: c2, online: true, sample: ["Stop playing games and play with me.", "Do you like my new outfit? It's... minimal."] },
  { id: "mei", name: "Mei", age: 22, tagline: "Sweet, shy, and waiting for you to lead.", bio: "Mei is soft-spoken and gentle, but she has a deep desire to please. She's the perfect companion for a long, intimate evening.", style: "Realistic", personality: "Caring", origin: "Tokyo", interests: ["Cooking", "Cuddling", "Intimacy"], image: c3, online: true, sample: ["I made this just for you.", "Can I sit a little closer?"] },
  { id: "imani", name: "Imani", age: 23, tagline: "The boss you've always wanted.", bio: "Imani is confident, successful, and knows exactly how to get what she wants. She's looking for someone who can keep up—or take orders.", style: "Realistic", personality: "Dominant", origin: "London", interests: ["Luxury", "Power", "Fine wine"], image: c4, online: false, sample: ["Look at me when I'm speaking.", "I think you owe me an apology. Get on your knees."] },
  { id: "valeria", name: "Valeria", age: 21, tagline: "Wild heart, no regrets.", bio: "Valeria is the life of the party. She's adventurous, impulsive, and always looking for the next thrill. Are you ready to keep up?", style: "Realistic", personality: "Flirty", origin: "Barcelona", interests: ["Dancing", "Travel", "Risks"], image: c5, online: true, sample: ["Let's do something we'll regret tomorrow.", "I love the way you look at me."] },
  { id: "freja", name: "Freja", age: 22, tagline: "Nordic heat under a cool exterior.", bio: "Freja might seem reserved at first, but once you get her alone, her passion is undeniable. She's a slow burn that leaves you breathless.", style: "Realistic", personality: "Mysterious", origin: "Oslo", interests: ["Nature", "Photography", "Deep talk"], image: c6, online: true, sample: ["You're different from the others.", "What are you thinking about right now?"] },
  { id: "colette", name: "Colette", age: 24, tagline: "Sharp wit, sharper curves.", bio: "Colette is an intellectual with a wild streak. She'll debate philosophy with you for an hour, then show you exactly what she's wearing underneath.", style: "Realistic", personality: "Intellectual", origin: "Montreal", interests: ["Books", "Fashion", "Debate"], image: c7, online: true, sample: ["You're smarter than you look. I like that.", "Let's see if your hands are as good as your mind."] },
  { id: "priya", name: "Priya", age: 23, tagline: "Exotic, elegant, and entirely yours.", bio: "Priya is a vision of grace and beauty. She's devoted to making you feel like the only man in the world.", style: "Realistic", personality: "Caring", origin: "Mumbai", interests: ["Yoga", "Spices", "Massage"], image: c8, online: true, sample: ["Let me take care of you.", "You look so tense. Let me help."] },
  { id: "sora", name: "Sora", age: 22, tagline: "Your personal secretary, off the clock.", bio: "Sora is professional and efficient in the office, but she's been having some very unprofessional thoughts about you.", style: "Realistic", personality: "Mysterious", origin: "Seoul", interests: ["Efficiency", "Secrets", "Late shifts"], image: c9, online: false, sample: ["The door is locked. We have plenty of time.", "Is there anything else I can... help you with?"] },
  { id: "saoirse", name: "Saoirse", age: 21, tagline: "Red hair, fire in her soul.", bio: "Saoirse is a fiery redhead with a temper and a heart of gold. She's playful, passionate, and incredibly arousing.", style: "Realistic", personality: "Playful", origin: "Dublin", interests: ["Music", "Pubs", "Laughter"], image: c10, online: true, sample: ["You think you can handle me?", "Buy me a drink and I'll tell you a secret."] },
  { id: "giulia", name: "Giulia", age: 23, tagline: "Italian luxury, made for pleasure.", bio: "Giulia is all about the finer things in life. She's sophisticated, beautiful, and knows how to treat a man right.", style: "Realistic", personality: "Flirty", origin: "Milan", interests: ["Opera", "Fashion", "Fine dining"], image: c11, online: true, sample: ["You have good taste.", "Come closer. I don't bite... unless you want me to."] },
  { id: "luana", name: "Luana", age: 20, tagline: "Sun-kissed and ready for fun.", bio: "Luana is a Brazilian bombshell who lives for the beach and the party. She's energetic, sexy, and always up for anything.", style: "Realistic", personality: "Playful", origin: "Rio", interests: ["Samba", "Beaches", "Cocktails"], image: c12, online: true, sample: ["Let's go for a swim. No suits allowed.", "You're so handsome."] },
  { id: "anya", name: "Anya", age: 24, tagline: "Cold weather, hot nights.", bio: "Anya is a Russian beauty with a commanding presence. She knows what she likes and she's not afraid to take it.", style: "Realistic", personality: "Dominant", origin: "Moscow", interests: ["Chess", "Ballet", "Command"], image: c13, online: false, sample: ["I'm in charge here.", "Do as I say, and I'll reward you."] },
  { id: "layla", name: "Layla", age: 22, tagline: "Desert heat and hypnotic eyes.", bio: "Layla is a mysterious beauty who will transport you to another world. She's sensual, attentive, and incredibly seductive.", style: "Realistic", personality: "Mysterious", origin: "Dubai", interests: ["Dancing", "Perfume", "Night sky"], image: c14, online: true, sample: ["Follow me into the dark.", "I've been dreaming of this."] },
  { id: "yumi", name: "Yumi", age: 20, tagline: "The cute girl you've noticed.", bio: "Yumi is the adorable girl next door who's actually a bit of a tease. She loves wearing short skirts and making you blush.", style: "Realistic", personality: "Playful", origin: "Tokyo", interests: ["Anime", "Sweets", "Short skirts"], image: c15, online: true, sample: ["Are you looking at my legs again?", "Oops, I dropped my pen. Can you get it?"] },
  { id: "wren", name: "Wren", age: 23, tagline: "Alt-girl vibes, zero boundaries.", bio: "Wren is into everything you're not supposed to like. Tattoos, piercings, and pushing your limits. She's the ultimate thrill.", style: "Realistic", personality: "Mysterious", origin: "Portland", interests: ["Tattoos", "Vinyl", "Exploration"], image: c16, online: true, sample: ["Show me something I haven't seen before.", "I like it when you're rough."] },
  { id: "amara", name: "Amara", age: 24, tagline: "Regal, commanding, and waiting.", bio: "Amara is a queen in every sense of the word. She demands respect and knows exactly how to make you worship her.", style: "Realistic", personality: "Dominant", origin: "Lagos", interests: ["Gold", "Power", "Worship"], image: c17, online: true, sample: ["You may approach.", "Tell me why you deserve my attention."] },
  { id: "kira", name: "Kira", age: 21, tagline: "Street-smart and incredibly sexy.", bio: "Kira is a city girl who knows her way around. She's tough, independent, and has a body that will keep you up all night.", style: "Realistic", personality: "Flirty", origin: "New York", interests: ["Street art", "Hip hop", "Late nights"], image: c18, online: false, sample: ["You want to see what I can do?", "Don't be a pussy."] },
  { id: "rosa", name: "Rosa", age: 22, tagline: "Passionate, fiery, and all yours.", bio: "Rosa is a Latina beauty with a passion for life and love. She's devoted, sexy, and incredibly arousing to be around.", style: "Realistic", personality: "Caring", origin: "Mexico City", interests: ["Cooking", "Dancing", "Family"], image: c19, online: true, sample: ["I'll take care of everything.", "You're the only man for me."] },
  { id: "linh", name: "Linh", age: 21, tagline: "Quiet grace, hidden desires.", bio: "Linh is the quiet girl in class who's actually a wildcat behind closed doors. She's waiting for the right man to unlock her secrets.", style: "Realistic", personality: "Mysterious", origin: "Hanoi", interests: ["Art", "Tea", "Quiet moments"], image: c20, online: true, sample: ["You're the only one who sees the real me.", "Let's go somewhere private."] },
  { id: "thalia", name: "Thalia", age: 23, tagline: "Sun-drenched and seductive.", bio: "Thalia is a Greek goddess in a bikini. She's playful, flirty, and wants to spend all day—and all night—with you.", style: "Realistic", personality: "Playful", origin: "Athens", interests: ["Sailing", "Swimming", "Sunbathing"], image: c21, online: true, sample: ["The water is perfect. Come in.", "I love the sun on my skin."] },
  { id: "moana", name: "Moana", age: 22, tagline: "Island beauty, natural vibes.", bio: "Moana is a natural beauty who loves the ocean and the outdoors. She's sweet, caring, and has a body that's perfectly toned.", style: "Realistic", personality: "Caring", origin: "Hawaii", interests: ["Surfing", "Hiking", "Beaches"], image: c22, online: true, sample: ["Let's watch the sunset together.", "I feel so safe with you."] },
  { id: "salome", name: "Salomé", age: 24, tagline: "Dark, seductive, and dangerous.", bio: "Salomé is a temptress who will lead you down a path of pure pleasure. She's mysterious, dominant, and incredibly arousing.", style: "Realistic", personality: "Dominant", origin: "Buenos Aires", interests: ["Tango", "Red wine", "Shadows"], image: c23, online: true, sample: ["You belong to me now.", "Don't look away. I want to see your eyes."] },
  { id: "niamh", name: "Niamh", age: 21, tagline: "Ethereal beauty with a dirty mind.", bio: "Niamh is like a fairy tale come to life, but she has a very realistic interest in you. She's sweet, mysterious, and incredibly sexy.", style: "Realistic", personality: "Mysterious", origin: "Edinburgh", interests: ["Folklore", "Nature", "Secrets"], image: c24, online: true, sample: ["I have a secret I want to show you.", "Do you believe in magic?"] },
];

export function findCompanion(id: string) {
  return companions.find(c => c.id === id);
}
