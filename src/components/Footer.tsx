import React from 'react';
import { ArrowUp, Mail, Linkedin, Github } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface FooterProps {
  profile: UserProfile;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              {profile.fullName}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Business Analyst · B.Sc. in Business Analytics · Kepler College · Kigali, Rwanda
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
              Projects
            </button>
            <button onClick={() => onNavigate('certifications')} className="hover:text-white transition-colors cursor-pointer">
              Certifications
            </button>
            <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors cursor-pointer">
              Skills
            </button>
            <button onClick={() => onNavigate('resume')} className="hover:text-white transition-colors cursor-pointer">
              Resume / CV
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-emerald-400 transition-colors"
            >
              {profile.email}
            </a>
            <span aria-hidden="true">·</span>
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
