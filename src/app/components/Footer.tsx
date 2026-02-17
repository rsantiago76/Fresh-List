import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] bg-clip-text text-transparent">
                FreshList
              </span>
            </div>
            <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">
              Smart grocery habits, simplified. Build healthier shopping lists with real-time insights.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-[var(--text-sm)] text-[var(--text-secondary)]">
              <li>
                <Link to="/demo" className="hover:text-[var(--primary-600)] transition-colors">
                  Try Demo
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[var(--primary-600)] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[var(--primary-600)] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[var(--primary-600)] transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[var(--text-sm)] text-[var(--text-secondary)]">
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-[var(--text-sm)] text-[var(--text-secondary)]">
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-600)] transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--neutral-200)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">
            © 2026 FreshList. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/freshlist"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-emerald-50 text-[var(--text-secondary)] hover:text-emerald-600 transition-all hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/freshlist"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-emerald-50 text-[var(--text-secondary)] hover:text-emerald-600 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/freshlist"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-emerald-50 text-[var(--text-secondary)] hover:text-emerald-600 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}