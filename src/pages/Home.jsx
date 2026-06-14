import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import PowerOfYes from '../components/PowerOfYes.jsx';
import PillarsInteractive from '../components/PillarsInteractive.jsx';
import GlobalSisterhood from '../components/GlobalSisterhood.jsx';
import AboutCondensed from '../components/AboutCondensed.jsx';
import Inclusions from '../components/Inclusions.jsx';
import EventsTeaser from '../components/EventsTeaser.jsx';
import Pricing from '../components/Pricing.jsx';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Only treat the hash as a section anchor if it looks like one. Supabase
    // and other auth flows put non-selector data in the hash (e.g.
    // `#access_token=...&type=magiclink`), and passing that to querySelector
    // throws SyntaxError, which crashes the whole React tree.
    if (!/^#[\w-]+$/.test(hash)) return;
    let el = null;
    try {
      el = document.querySelector(hash);
    } catch {
      return;
    }
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Marquee />
      <PowerOfYes />
      <PillarsInteractive />
      <GlobalSisterhood />
      <AboutCondensed />
      <Inclusions />
      <EventsTeaser />
      <Pricing />
    </>
  );
}
