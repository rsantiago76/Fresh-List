import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { motion } from 'motion/react';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { getUser, logout } from '../../utils/storage';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getUser();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/pricing', label: 'Pricing' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--neutral-200)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)] flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] bg-clip-text text-transparent">
              FreshList
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-4 py-2 rounded-xl font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? 'text-[var(--primary-600)] bg-gradient-to-br from-emerald-50 to-lime-50 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--neutral-50)]'
                  }
                `}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-1 left-2 right-2 h-1 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="primary" size="sm">
                    Try Demo
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--neutral-50)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-[var(--neutral-200)]"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-2 rounded-lg font-medium transition-colors
                    ${location.pathname === link.path
                      ? 'bg-gradient-to-br from-[var(--primary-50)] to-[var(--accent-50)] text-[var(--primary-600)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--neutral-50)]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-[var(--neutral-200)] space-y-2">
                {user ? (
                  <>
                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" fullWidth>
                        <User className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" fullWidth onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" size="sm" fullWidth>
                        Try Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}