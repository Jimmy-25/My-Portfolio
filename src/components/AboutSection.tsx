import React from 'react';
import { GraduationCap, Award, Compass, BookOpen, MapPin, Globe, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/portfolio';
import { educationHistory } from '../data/portfolioData';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-12 md:py-16 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>About Me</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Background & Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Who I Am & What Drives My Work
          </h2>
          <p className="text-base text-slate-300">
            Combining statistical and financial modeling with authentic community commitment and field-level operational excellence.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Key Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">
                Professional Profile
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify">
                {profile.bioIntro}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                {profile.bioDetailed[1]}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                {profile.bioDetailed[2]}
              </p>
            </div>

            {/* Core Competencies from Resume */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Professional Competencies
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Field-Based Data Collection</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Experience in community field settings, hospital labs, and programme evaluations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Financial Modeling & Valuation</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    1st Place CFA Institute Research Challenge winner with deep valuation and ratio analysis skills.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Evidence-Based Decision Support</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Synthesizing raw spreadsheet records into actionable insights and operational KPI indicators.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Community Training & Mentorship</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Recognized Community Uplifter who organized digital literacy training for 50 Rwandan youth participants.
                  </p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center gap-4 text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Languages:</span>
              </span>
              <span className="text-slate-300">
                <strong className="text-white">Kinyarwanda</strong> (Native)
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-slate-300">
                <strong className="text-white">English</strong> (Fluent)
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-slate-300">
                <strong className="text-white">Kiswahili</strong> (Conversational)
              </span>
            </div>
          </div>

          {/* Right Column: Complete Education Background from Resume */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <span>Education Background</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">Bachelor of Science</span>
              </div>

              <div className="space-y-5">
                {educationHistory.map((edu, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-4 border-l-2 space-y-1 ${
                      edu.current ? 'border-emerald-400' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white text-sm">
                        {edu.institution}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-emerald-400">
                      {edu.degree}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>{edu.period}</span>
                      <span aria-hidden="true" className="text-slate-700">·</span>
                      <span>{edu.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                      {edu.highlights}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Commitment Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Academic & Professional Philosophy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                &ldquo;Data is most valuable when it directly uplifts communities and empowers decision-makers. Whether building financial valuation models or empowering youth with digital skills, I am dedicated to excellence, integrity, and measurable impact.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Jimmy Munyangabe</span>
                <span className="font-mono text-emerald-400">Kepler College</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
