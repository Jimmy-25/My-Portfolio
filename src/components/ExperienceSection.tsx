import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, HeartHandshake, Award, Users, Trophy } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { initialVolunteering } from '../data/portfolioData';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-16 md:py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>Work & Leadership Experience</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Field Operations & Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Work Experience & Community Leadership
          </h2>
          <p className="text-base text-slate-300">
            Practical experience spanning non-profit MEAL programmes, financial research competitions, humanitarian hospital clinical data, and community youth empowerment.
          </p>
        </div>

        {/* Work Experience List */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.id === 'exp-cfa' && (
                      <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        1st Place Winner
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1">
                    <span className="text-emerald-400 font-semibold">{exp.organization}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements from Resume */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Key Responsibilities & Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  Core Skills Applied:
                </span>
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-800 border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Volunteering & Community Giveback Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Volunteering & Community Giveback
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {initialVolunteering.role} · {initialVolunteering.projectTitle}
                </h3>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{initialVolunteering.location}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{initialVolunteering.period}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Direct Community Impact: <strong className="text-white">{initialVolunteering.beneficiaries}</strong>
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {initialVolunteering.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
