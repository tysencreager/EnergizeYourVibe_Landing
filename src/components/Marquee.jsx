const phrases = [
  'Energize your vibe',
  'Empower your energy',
  'Transform your life',
  'Find your people',
];

export default function Marquee() {
  const items = [...phrases, ...phrases];
  return (
    <div className="relative z-20 border-y-4 border-magenta bg-pink py-5 overflow-hidden shadow-xl">
      <div className="flex whitespace-nowrap animate-ticker gap-10 text-lg font-bold tracking-widest uppercase text-sun items-center">
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{p}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-sun/90" />
          </span>
        ))}
      </div>
    </div>
  );
}
