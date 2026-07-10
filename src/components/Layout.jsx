import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AlertBanner from './AlertBanner.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import LaunchPopup from './LaunchPopup.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative overflow-x-hidden min-h-screen selection:bg-pink selection:text-white">
      <div className="print:hidden">
        <AlertBanner />
        <Nav />
      </div>
      <main>
        <Outlet />
      </main>
      <div className="print:hidden">
        <Footer />
        <LaunchPopup />
      </div>
    </div>
  );
}
