import React, { useState, useRef } from 'react';
import { ArrowUpRight, BarChart2, TrendingUp, Layers, Check, Database, ExternalLink, Upload, Image, Trash2, Globe, Link2, PlusCircle, Sparkles } from 'lucide-react';
import { ProjectCaseStudy } from '../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';

interface ProjectsSectionProps {
  projects: ProjectCaseStudy[];
  onUploadProjectImage?: (projectId: string, imageDataUrl: string, imageName: string) => void;
  onRemoveProjectImage?: (projectId: string) => void;
  onUpdateProjectLiveUrl?: (projectId: string, liveUrl: string) => void;
  onAddNewProject?: (newProject: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onUploadProjectImage,
  onRemoveProjectImage,
  onUpdateProjectLiveUrl,
  onAddNewProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [editingUrlProjectId, setEditingUrlProjectId] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');

  // Add project modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'finance' | 'meal' | 'community' | 'education' | 'healthcare'>('finance');
  const [newSummary, setNewSummary] = useState('');
  const [newTools, setNewTools] = useState('Power BI, Python, SQL, Advanced Excel');
  const [newLiveUrl, setNewLiveUrl] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string | undefined>(undefined);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const addProjectFileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'All Projects & Dashboards' },
    { id: 'finance', label: 'Finance & Valuation' },
    { id: 'meal', label: 'World Vision MEAL' },
    { id: 'community', label: 'Community Giveback' },
    { id: 'healthcare', label: 'Health Operations' },
    { id: 'education', label: 'Education Analytics' },
  ];

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const handleImageFileChange = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadProjectImage) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Image file exceeds 8MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUploadProjectImage(projectId, result, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLiveUrl = (projectId: string) => {
    if (onUpdateProjectLiveUrl) {
      onUpdateProjectLiveUrl(projectId, urlInput.trim());
    }
    setEditingUrlProjectId(null);
    setUrlInput('');
  };

  const handleNewProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const newProject: ProjectCaseStudy = {
      id: `custom-proj-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Interactive Business Analytics Dashboard',
      category: newCategory,
      categoryLabel: newCategory.toUpperCase(),
      date: '2026',
      summary: newSummary.trim(),
      problem: 'Business operational challenge addressed via quantitative analysis and interactive dashboard reporting.',
      approach: 'Constructed custom data pipelines, validated metrics, and engineered an intuitive user-facing dashboard.',
      tools: newTools.split(',').map((t) => t.trim()).filter(Boolean),
      impactMetrics: [
        { metric: 'Live', label: 'Interactive Dashboard', changeType: 'positive' },
        { metric: '100%', label: 'Data Accuracy', changeType: 'positive' }
      ],
      visualType: 'bar',
      chartData: [
        { label: 'Q1 Performance', value: 85, baseline: 70 },
        { label: 'Q2 Performance', value: 92, baseline: 75 }
      ],
      keyTakeaways: ['Delivered actionable business insights through interactive visual controls.'],
      liveUrl: newLiveUrl.trim() || undefined,
      imageUrl: newImagePreview,
      imageName: 'dashboard_screenshot.png'
    };

    if (onAddNewProject) {
      onAddNewProject(newProject);
    }

    // Reset
    setNewTitle('');
    setNewSubtitle('');
    setNewSummary('');
    setNewLiveUrl('');
    setNewImagePreview(undefined);
    setIsAddModalOpen(false);
  };

  return (
    <section id="projects" className="py-12 md:py-16 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <span>Applied Dashboards & Case Studies</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Interactive Business Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Dashboards & Analytics Projects
            </h2>
            <p className="text-base text-slate-300">
              Showcasing practical analytical dashboards built in Power BI, Python, Streamlit, and Advanced Excel. Click any dashboard to visit its live link or upload screenshots of your work.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-500/20 self-start md:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Dashboard</span>
          </button>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit max-w-full overflow-x-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const hasCustomImage = Boolean(project.imageUrl);
            const hasLiveUrl = Boolean(project.liveUrl);

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
              >
                {/* Dashboard Image / Showcase Banner */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden">
                  {hasCustomImage ? (
                    <div className="relative w-full h-full group/img">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                        <button
                          onClick={() => fileInputRefs.current[project.id]?.click()}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg flex items-center gap-1 cursor-pointer shadow-md"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change Screenshot</span>
                        </button>
                        {onRemoveProjectImage && (
                          <button
                            onClick={() => onRemoveProjectImage(project.id)}
                            className="p-1.5 text-rose-300 hover:text-rose-200 bg-rose-500/20 rounded-lg cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Clean visual dashboard placeholder with 1-click screenshot uploader */
                    <div className="p-6 text-center space-y-2.5 max-w-sm">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shadow-inner">
                        <BarChart2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Dashboard Showcase Slot
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Upload your dashboard screenshot to display your Power BI, Python or Excel interface.
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRefs.current[project.id]?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Dashboard Screenshot</span>
                      </button>
                    </div>
                  )}

                  {/* Hidden file input for this project */}
                  <input
                    ref={(el) => { fileInputRefs.current[project.id] = el; }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(project.id, e)}
                    className="hidden"
                  />
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2 font-medium">
                        <span className="text-emerald-400">{project.categoryLabel}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>{project.date}</span>
                      </div>
                      {project.datasetSize && (
                        <span className="font-mono text-[11px] text-slate-400">
                          {project.datasetSize}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Quantifiable Impact Metrics Banner */}
                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      {project.impactMetrics.map((item, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-base font-bold font-mono text-white tabular-nums">
                            {item.metric}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tools used */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-950 border border-slate-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar: Live Link & Case Study Modal */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                    {/* Live Link editor inline or display */}
                    {editingUrlProjectId === project.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="Paste live link (e.g. PowerBI, Streamlit, Tableau)..."
                          className="flex-1 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded text-white"
                        />
                        <button
                          onClick={() => handleSaveLiveUrl(project.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-950 bg-emerald-400 rounded cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUrlProjectId(null)}
                          className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {hasLiveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Live Dashboard / Link</span>
                            </a>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingUrlProjectId(project.id);
                                setUrlInput('');
                              }}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <Link2 className="w-3 h-3" />
                              <span>Add Live Dashboard Link</span>
                            </button>
                          )}
                          {hasLiveUrl && (
                            <button
                              onClick={() => {
                                setEditingUrlProjectId(project.id);
                                setUrlInput(project.liveUrl || '');
                              }}
                              className="text-[10px] text-slate-500 hover:text-slate-300 underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Modal: Add New Project / Dashboard */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Add New Dashboard / Project
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Dashboard / Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Performance & Forecasting Dashboard"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Domain Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="finance">Finance & Valuation</option>
                    <option value="meal">World Vision MEAL</option>
                    <option value="community">Community Giveback</option>
                    <option value="healthcare">Health Operations</option>
                    <option value="education">Education Analytics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Subtitle / Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. Power BI & Python modeling"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Description / Business Impact *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the business problem, your analytical approach, and quantifiable outcomes..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Tools & Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="Power BI, Python, SQL, Advanced Excel, Streamlit"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Live Dashboard URL (PowerBI / Streamlit / Tableau link)</label>
                <input
                  type="url"
                  placeholder="https://app.powerbi.com/... or https://share.streamlit.io/..."
                  value={newLiveUrl}
                  onChange={(e) => setNewLiveUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-slate-300 font-medium block">Dashboard Screenshot</label>
                <input
                  ref={addProjectFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleNewProjectImageChange}
                  className="hidden"
                />
                {newImagePreview ? (
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-slate-700">
                    <img src={newImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewImagePreview(undefined)}
                      className="absolute top-2 right-2 p-1 bg-black/70 rounded text-rose-400"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addProjectFileInputRef.current?.click()}
                    className="w-full py-3 border border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Upload Dashboard Image</span>
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded-lg shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
