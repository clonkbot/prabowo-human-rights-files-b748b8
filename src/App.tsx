import { useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'military' | 'political' | 'investigation';
  sources: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: "1983",
    title: "East Timor Military Operations",
    description: "As a Kopassus special forces officer, participated in military operations in East Timor during Indonesia's occupation. Human rights organizations documented widespread abuses during this period.",
    category: "military",
    sources: ["Amnesty International Reports", "UN Human Rights Commission"]
  },
  {
    year: "1996",
    title: "July 27 Affair (Kudatuli)",
    description: "Indonesian military forces attacked the headquarters of the Indonesian Democratic Party (PDI), resulting in deaths, disappearances, and mass arrests of pro-democracy activists.",
    category: "political",
    sources: ["Human Rights Watch", "Komnas HAM"]
  },
  {
    year: "1997-1998",
    title: "Enforced Disappearances of Activists",
    description: "As commander of Kopassus, linked to the abduction of pro-democracy activists. The Kopassus Tim Mawar (Rose Team) was implicated in kidnapping at least 23 activists; 13 were released, 9 remain missing.",
    category: "military",
    sources: ["Komnas HAM Investigation", "International Court Documents"]
  },
  {
    year: "1998",
    title: "May 1998 Riots",
    description: "During the fall of Suharto, widespread riots occurred with allegations of military involvement in coordinating violence. Over 1,000 people died, and there were mass incidents of sexual violence against ethnic Chinese women.",
    category: "political",
    sources: ["Joint Fact-Finding Team (TGPF)", "Komnas Perempuan"]
  },
  {
    year: "1998",
    title: "Military Tribunal & Discharge",
    description: "Dismissed from the military following a tribunal that found him guilty of kidnapping activists. Barred from entering the United States due to human rights concerns.",
    category: "investigation",
    sources: ["Indonesian Military Records", "US State Department"]
  },
  {
    year: "1999",
    title: "Post-Referendum Violence in East Timor",
    description: "Following East Timor's independence vote, pro-Indonesian militias conducted a campaign of violence. International investigations documented military coordination with militia groups.",
    category: "military",
    sources: ["UN Serious Crimes Unit", "CAVR Final Report"]
  },
  {
    year: "2000s-Present",
    title: "Ongoing Investigations & Political Career",
    description: "Despite unresolved cases, returned to political prominence. Komnas HAM continues to advocate for resolution of enforced disappearance cases. Victims' families still seek justice and acknowledgment.",
    category: "investigation",
    sources: ["Komnas HAM", "Kontras", "International Human Rights Organizations"]
  }
];

const CategoryBadge = ({ category }: { category: TimelineEvent['category'] }) => {
  const colors = {
    military: 'bg-red-900/30 text-red-400 border-red-800',
    political: 'bg-amber-900/30 text-amber-400 border-amber-800',
    investigation: 'bg-cyan-900/30 text-cyan-400 border-cyan-800'
  };

  return (
    <span className={`text-xs uppercase tracking-widest px-3 py-1 border ${colors[category]}`}>
      {category}
    </span>
  );
};

const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="timeline-card group relative pl-8 md:pl-16 pb-12 last:pb-0"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-red-800 via-neutral-700 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-[-4px] md:left-[12px] top-2 w-[9px] h-[9px] bg-red-600 rotate-45 group-hover:bg-red-500 transition-colors duration-300" />

      {/* Year */}
      <div className="text-red-500 font-mono text-sm tracking-[0.3em] mb-2">{event.year}</div>

      {/* Card */}
      <div
        className="bg-neutral-900/50 border border-neutral-800 hover:border-red-900/50 transition-all duration-500 cursor-pointer backdrop-blur-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h3 className="text-xl md:text-2xl font-light text-neutral-100 leading-tight">{event.title}</h3>
            <CategoryBadge category={event.category} />
          </div>

          <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{event.description}</p>

          {/* Sources - expandable */}
          <div className={`mt-4 pt-4 border-t border-neutral-800 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 border-transparent'}`}>
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Sources</div>
            <ul className="space-y-1">
              {event.sources.map((source, i) => (
                <li key={i} className="text-neutral-500 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-700" />
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-xs text-neutral-600 flex items-center gap-2">
            <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>▸</span>
            {isExpanded ? 'Click to collapse' : 'Click to view sources'}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center p-6 border border-neutral-800 bg-neutral-900/30">
    <div className="text-3xl md:text-4xl font-light text-red-500 mb-2 font-mono">{number}</div>
    <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-red-900 selection:text-white">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Header */}
      <header className="relative border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="text-xs uppercase tracking-[0.4em] text-red-600 mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-red-800" />
            Documented Record
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-6 leading-[1.1]">
            <span className="text-neutral-100">Prabowo Subianto</span>
            <br />
            <span className="text-red-500">Human Rights Files</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            A documented timeline of allegations, investigations, and unresolved cases
            concerning Indonesia's current Defense Minister and President-elect.
          </p>
        </div>
      </header>

      {/* Stats section */}
      <section className="border-b border-neutral-800 bg-neutral-900/20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="9" label="Still Missing" />
            <StatCard number="23+" label="Activists Abducted" />
            <StatCard number="1,000+" label="1998 Riot Deaths" />
            <StatCard number="25+" label="Years Unresolved" />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-amber-950/20 border border-amber-900/30 p-6">
            <div className="flex items-start gap-4">
              <div className="text-amber-500 text-xl">⚠</div>
              <div>
                <h3 className="text-amber-400 font-medium mb-2">Editorial Notice</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  This compilation presents documented allegations and investigations from credible human rights organizations,
                  government bodies, and international institutions. Prabowo Subianto has denied involvement in human rights abuses.
                  Readers are encouraged to consult primary sources and form independent conclusions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-2xl font-light text-neutral-300 mb-2">Documented Timeline</h2>
          <p className="text-neutral-500 text-sm">Click each entry to view sources</p>
        </div>

        <div className="relative">
          {timelineData.map((event, index) => (
            <TimelineCard key={index} event={event} index={index} />
          ))}
        </div>
      </main>

      {/* Key Organizations */}
      <section className="border-t border-neutral-800 bg-neutral-900/20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-light text-neutral-300 mb-8">Key Organizations & Sources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-neutral-800 bg-neutral-900/30">
              <h3 className="text-neutral-200 mb-2">Komnas HAM</h3>
              <p className="text-neutral-500 text-sm">Indonesian National Commission on Human Rights - conducted official investigations into disappearances and 1998 events.</p>
            </div>
            <div className="p-6 border border-neutral-800 bg-neutral-900/30">
              <h3 className="text-neutral-200 mb-2">Kontras</h3>
              <p className="text-neutral-500 text-sm">Commission for the Disappeared and Victims of Violence - Indonesian NGO advocating for victims' families.</p>
            </div>
            <div className="p-6 border border-neutral-800 bg-neutral-900/30">
              <h3 className="text-neutral-200 mb-2">International Bodies</h3>
              <p className="text-neutral-500 text-sm">UN Human Rights Commission, Amnesty International, Human Rights Watch - documented abuses in East Timor and Indonesia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-neutral-500 text-sm mb-2">
                For the victims and their families who continue to seek truth and justice.
              </p>
              <p className="text-neutral-600 text-xs">
                9 activists remain missing since 1997-1998.
              </p>
            </div>
            <div className="text-neutral-700 text-xs">
              Requested by @0xthereum · Built by @clonkbot
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
