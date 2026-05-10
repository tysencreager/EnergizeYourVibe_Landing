import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleSignOut() {
    await signOut();
    setIsMenuOpen(false);
    navigate('/');
  }

  return (
    <>
      <div
        className={`fixed w-full z-50 px-4 pointer-events-none flex justify-center transition-[top] duration-300 ${
          scrolled ? 'top-3' : 'top-[40px] md:top-[52px]'
        }`}
      >
        <nav
          className={`pointer-events-auto transition-all duration-300 w-full max-w-5xl rounded-full border-2 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-pink/20 shadow-xl py-2.5 px-4 md:py-3 md:px-6'
              : 'bg-white/90 border-transparent py-3 px-4 md:py-4 md:px-6'
          } flex justify-between items-center shadow-lg`}
        >
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/logo.png"
              alt="Energize Your Vibe"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
            <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-magenta">
              Energize Your Vibe
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 bg-sun/30 px-6 py-2.5 rounded-full border border-gold/20">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `font-bold text-sm transition-colors ${
                    isActive ? 'text-orange' : 'text-magenta hover:text-orange'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/portal"
                className="bg-pink text-white hover:bg-magenta px-6 py-3 rounded-full text-sm font-bold transition-colors shadow-md uppercase tracking-wider"
              >
                Portal
              </Link>
              <button
                onClick={handleSignOut}
                className="text-magenta hover:text-pink text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-magenta hover:text-pink text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/membership"
                className="bg-pink text-white hover:bg-magenta px-6 py-3 rounded-full text-sm font-bold transition-colors shadow-md uppercase tracking-wider"
              >
                Join Us
              </Link>
            </div>
          )}

          <button
            className="md:hidden text-magenta bg-sun p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-magenta text-white pt-32 px-8 flex flex-col gap-8 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-4xl border-b border-white/20 pb-4"
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink
                to="/portal"
                onClick={() => setIsMenuOpen(false)}
                className="bg-sun text-magenta text-center py-5 rounded-full font-bold text-xl mt-4 uppercase tracking-widest shadow-lg"
              >
                Portal
              </NavLink>
              <button
                onClick={handleSignOut}
                className="font-display text-2xl underline opacity-90"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-3xl border-b border-white/20 pb-4"
              >
                Sign in
              </NavLink>
              <Link
                to="/membership"
                onClick={() => setIsMenuOpen(false)}
                className="bg-sun text-magenta text-center py-5 rounded-full font-bold text-xl mt-4 uppercase tracking-widest shadow-lg"
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
