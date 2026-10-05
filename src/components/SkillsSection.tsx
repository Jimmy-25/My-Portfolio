import React, { useState } from 'react';
import { CheckCircle2, Search, Table, BrainCircuit, Users, Globe, Terminal, BarChart3, Database, FileSpreadsheet, Sparkles } from 'lucide-react';
import { SkillCategory } from '../types/portfolio';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Business Analyst Toolkit highlighted upfront
  const coreTools = [
    {
      name: 'Power BI',
      tag: 'Business Intelligence',
      desc: 'DAX measures, Power Query ETL, data modeling, and interactive executive reporting.',
      level: 'Advanced',
      color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Python',
      tag: 'Data Science & Automation',
      desc: 'Pandas, NumPy, Scikit-learn, exploratory data analysis (EDA), data cleaning, and scripts.',
      level: 'Advanced',
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30'
    },
    {
      name: 'Advanced Excel',
      tag: 'Financial & Spreadsheets',
      desc: 'Pivot tables, complex nested formulas, financial modeling, what-if analysis, and Solver.',
      level: 'Advanced',
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'SQL',
      tag: 'Database Querying',
      desc: 'Relational querying (PostgreSQL, MySQL), window functions, CTEs, self-joins, schema management.',
      level: 'Advanced',
      color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30'
    },
    {
      name: 'Streamlit',
      tag: 'Web App & Dashboards',
      desc: 'Rapid development of interactive Python data applications and dashboard prototypes.',
      level: 'Proficient',
      color: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30'
    },
    {
      name: 'SPSS',
      tag: 'Statistical Analysis',
      desc: 'Hypothesis testing, descriptive statistics, ANOVA, regression models, and survey data analytics.',
      level: 'Proficient',
      color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30'
    },
    {
      name: 'Big Data & Cloud',
      tag: 'Data Warehousing',
      desc: 'Google BigQuery, partitioned datasets, high-volume analytical querying, and data pipelines.',
      level: 'Proficient',
      color: 'from-teal-500/20 to-teal-600/10 text-teal-400 border-teal-500/30'
    },
    {
      name: 'Financial Valuation (DCF)',
      tag: 'Corporate Finance',
      desc: 'Discounted cash flow, ratio analysis, and investment thesis (1st Place CFA Winner).',
      level: 'Advanced',
      color: 'from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/30'
    }
  ];

  const filteredCategories = skillCategories.map((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.appliedIn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredSkills.length === 0) return null;
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter(Boolean) as SkillCategory[];

  return (
    <section id="skills" className="py-12 md:py-16 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>Technical & Analytical Toolkit</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Business Analyst Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tools & Technical Proficiencies
          </h2>
          <p className="text-base text-slate-300">
            Proficient in industry-standard business analysis, quantitative modeling, business intelligence, and database tools.
          </p>
        </div>

        {/* Featured Core Tools Spotlight Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Core Business Analyst Stack</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">8 Primary Tools</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreTools.map((tool, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-gradient-to-br ${tool.color} bg-slate-900/80 border hover:border-slate-600 transition-all space-y-2.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                    {tool.tag}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-white font-mono">
                    {tool.level}
                  </span>
                </div>

                <div className="text-lg font-bold text-white">
                  {tool.name}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Competency Categories with Live Filter */}
        <div className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Domains
              </button>
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g., DAX, BigQuery, Excel)..."
                className="w-full sm:w-64 px-3.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Skill Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-5 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {category.name}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">
                      {category.skills.length} skills
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {category.description}
                  </p>
                </div>

                {/* Skills List in Category */}
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-sm font-semibold text-white">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-semibold">
                          {skill.level}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 pl-6">
                        <span className="text-slate-500 text-[11px] font-medium uppercase tracking-wider block sm:inline sm:mr-1">
                          Practical Application:
                        </span>
                        <span>{skill.appliedIn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
