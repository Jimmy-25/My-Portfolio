import React from 'react';
import { X, CheckCircle2, TrendingUp, Database, ArrowRight, BarChart3, Layers, Calendar, HardDrive } from 'lucide-react';
import { ProjectCaseStudy } from '../types/portfolio';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60 sticky top-0 z-10 backdrop-blur">
          <div className="space-y-1">
            {/* Clean unboxed metadata with separators */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{project.date}</span>
              {project.datasetSize && (
                <>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{project.datasetSize}</span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-200">
          {/* Quantifiable Impact Metrics Grid */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Quantifiable Business Impact
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {m.metric}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive / Visual Chart Representation */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Impact Comparison: Baseline vs Optimized Result
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 bg-slate-600 rounded-sm" /> Baseline
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> Optimized Solution
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {project.chartData.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{d.label}</span>
                    <span className="font-mono text-emerald-400 tabular-nums">
                      {d.value} {d.baseline && <span className="text-slate-500 font-normal">/ prev {d.baseline}</span>}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
                    <div
                      className="bg-emerald-400 rounded-full h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (d.value / (d.baseline || d.value * 1.5)) * 100)}%` }}
                    />
                    {d.baseline && (
                      <div
                        className="bg-slate-600 rounded-full h-full opacity-60"
                        style={{ width: `${Math.max(5, 100 - (d.value / d.baseline) * 100)}%` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>The Business Problem & Friction</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {project.problem}
            </p>
          </div>

          {/* Analytical Approach & Architecture */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Analytical Methodology & Technical Execution</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {project.approach}
            </p>
          </div>

          {/* Tools & Stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technologies & Methodologies Utilized
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {project.tools.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700/60 font-mono text-[11px]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Takeaways */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Business Deliverables & Strategic Takeaways</span>
            </h3>
            <ul className="space-y-2">
              {project.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Kepler College · Business Analytics Capstone Portfolio
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
