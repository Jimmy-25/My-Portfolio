import React, { useState } from 'react';
import {
  Home,
  User,
  FolderGit2,
  Award,
  Briefcase,
  Wrench,
  FileText,
  Mail,
  Menu,
  X,
  Phone,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  phone: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onSelectPage, phone }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'resume', label: 'Resume / CV', icon: FileText },
    { id: 'contact', label: 'Contact Me', icon: Mail },
  ];

  const handlePageClick = (id: string) => {
    onSelectPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Jimmy, I reviewed your Business Analytics portfolio and would like to connect.')}`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand Wordmark (Clickable to Home) */}
          <button
            onClick={() => handlePageClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow-sm">
              JM
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap block">
                Jimmy Munyangabe
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Kepler College · Business Analytics
              </span>
            </div>
          </button>

          {/* Frozen Aligned Clickable Navigation Bar (Desktop & Tablet) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800/80 rounded-xl overflow-x-auto">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick WhatsApp & Contact Action (Right) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
              title="Chat on WhatsApp (+250 791 837 351)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            <button
              onClick={() => handlePageClick('contact')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Horizontal scroll sub-nav on tablet/mobile for instant 1-click access */}
        <div className="lg:hidden flex items-center gap-1.5 py-2 overflow-x-auto border-t border-slate-800/60 no-scrollbar">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-slate-300 bg-slate-900 border border-slate-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{page.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu (Full Expanded) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 px-2 pb-1 border-b border-slate-800/80">
            Select Page
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page.id)}
                  className={`flex items-center gap-2 p-2.5 text-xs font-semibold rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-850 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{page.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
