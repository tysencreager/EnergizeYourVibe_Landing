import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import MissionIntro from '../components/MissionIntro.jsx';
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
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Marquee />
      <MissionIntro />
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
