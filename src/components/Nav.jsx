import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  {
    label: 'About',
    to: '/about',
    items: [
      { to: '/about', label: 'Meet Jenn' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { to: '/pillars', label: '7 Pillars' },
      { to: '/eyv-method', label: 'EYV Method' },
      { to: '/events', label: 'Events' },
    ],
  },
  { to: '/shop', label: 'Shop' },
];

function DesktopDropdown({ item }) {
  const { pathname } = useLocation();
  const isActive = item.items.some((sub) => sub.to === pathname);

  return (
    <div className="relative group">
      {item.to ? (
        <NavLink
          to={item.to}
          end={item.to === '/'}
          className={({ isActive: linkActive }) =>
            `inline-flex items-center gap-1 font-bold text-sm transition-colors ${
              linkActive || isActive ? 'text-orange' : 'text-magenta hover:text-orange'
            }`
          }
        >
          {item.label}
          <ChevronDown size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:rotate-180" />
        </NavLink>
      ) : (
        <button
          type="button"
          className={`inline-flex items-center gap-1 font-bold text-sm transition-colors ${
            isActive ? 'text-orange' : 'text-magenta hover:text-orange'
          }`}
        >
          {item.label}
          <ChevronDown size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:rotate-180" />
        </button>
      )}

      {/* Panel (pt bridges the hover gap so the menu doesn't flicker) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
        <div className="min-w-[210px] bg-white rounded-2xl shadow-xl border-2 border-pink/15 p-2">
          {item.items.map((sub) => (
            <NavLink
              key={sub.to}
              to={sub.to}
              className={({ isActive: linkActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  linkActive ? 'text-orange bg-sun/40' : 'text-magenta hover:text-orange hover:bg-sun/30'
                }`
              }
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

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

          <div className="hidden md:flex items-center space-x-7 bg-sun/30 px-6 py-2.5 rounded-full border border-gold/20">
            {navItems.map((item) =>
              item.items ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `font-bold text-sm transition-colors ${
                      isActive ? 'text-orange' : 'text-magenta hover:text-orange'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
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
        <div className="fixed inset-0 z-40 bg-magenta text-white pt-32 px-8 pb-12 flex flex-col gap-6 md:hidden overflow-y-auto">
          {navItems.map((item) =>
            item.items ? (
              <div key={item.label} className="border-b border-white/20 pb-5">
                {item.to ? (
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-4xl block mb-4"
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <p className="font-display text-4xl mb-4">{item.label}</p>
                )}
                <div className="flex flex-col gap-4 pl-1">
                  {item.items.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold text-white/85"
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-4xl border-b border-white/20 pb-5"
              >
                {item.label}
              </NavLink>
            )
          )}
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
                className="font-display text-3xl border-b border-white/20 pb-5"
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
