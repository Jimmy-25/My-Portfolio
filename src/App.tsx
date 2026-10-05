import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { SkillsSection } from './components/SkillsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialCertifications,
} from './data/portfolioData';
import { UserProfile, CertificationItem, ProjectCaseStudy } from './types/portfolio';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('jm_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem('jm_projects_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProjects;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('jm_certifications_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialCertifications;
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'page' | 'all'>('page');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // Sync helpers
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('jm_profile_v3', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
  };

  const saveProjects = (newProjects: ProjectCaseStudy[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('jm_projects_v3', JSON.stringify(newProjects));
    } catch {
      // ignore
    }
  };

  const saveCertifications = (newCerts: CertificationItem[]) => {
    setCertifications(newCerts);
    try {
      localStorage.setItem('jm_certifications_v3', JSON.stringify(newCerts));
    } catch {
      // ignore
    }
  };

  const handleUpdatePhoto = (photoDataUrl?: string) => {
    const updated = { ...profile, customPhotoUrl: photoDataUrl };
    saveProfile(updated);
  };

  const handleUploadResume = (fileDataUrl: string, fileName: string, fileType: string) => {
    const updated: UserProfile = {
      ...profile,
      uploadedResumeUrl: fileDataUrl,
      uploadedResumeName: fileName,
      uploadedResumeType: fileType,
    };
    saveProfile(updated);
  };

  const handleRemoveResume = () => {
    const updated: UserProfile = {
      ...profile,
      uploadedResumeUrl: undefined,
      uploadedResumeName: undefined,
      uploadedResumeType: undefined,
    };
    saveProfile(updated);
  };

  const handleUploadCertFile = (certId: string, fileDataUrl: string, fileName: string, fileType: string) => {
    const updated = certifications.map((c) => {
      if (c.id === certId) {
        return {
          ...c,
          uploadedFileUrl: fileDataUrl,
          uploadedFileName: fileName,
          uploadedFileType: fileType,
        };
      }
      return c;
    });
    saveCertifications(updated);
  };

  const handleRemoveCertFile = (certId: string) => {
    const updated = certifications.map((c) => {
      if (c.id === certId) {
        return {
          ...c,
          uploadedFileUrl: undefined,
          uploadedFileName: undefined,
          uploadedFileType: undefined,
        };
      }
      return c;
    });
    saveCertifications(updated);
  };

  // Projects screenshot and live URL handlers
  const handleUploadProjectImage = (projectId: string, imageDataUrl: string, imageName: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          imageUrl: imageDataUrl,
          imageName: imageName,
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const handleRemoveProjectImage = (projectId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          imageUrl: undefined,
          imageName: undefined,
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const handleUpdateProjectLiveUrl = (projectId: string, liveUrl: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          liveUrl: liveUrl || undefined,
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const handleAddNewProject = (newProject: ProjectCaseStudy) => {
    const updated = [newProject, ...projects];
    saveProjects(updated);
  };

  const handleSelectPage = (pageId: string) => {
    setActivePage(pageId);
    if (viewMode === 'all') {
      const element = document.getElementById(pageId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem('jm_profile_v3');
      localStorage.removeItem('jm_projects_v3');
      localStorage.removeItem('jm_certifications_v3');
    } catch {
      // ignore
    }
    setProfile(initialProfile);
    setProjects(initialProjects);
    setCertifications(initialCertifications);
    setIsEditorOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-400 selection:text-slate-950 font-sans">
      {/* Frozen Aligned Clickable Navigation Bar */}
      <Navbar
        activePage={activePage}
        onSelectPage={handleSelectPage}
        phone={profile.phone}
      />

      {/* View Switcher Notice (Allows switching between Distinct Page Mode and All-in-One View) */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-medium capitalize">
              Viewing: <strong className="text-white">{activePage === 'home' ? 'Home Page' : activePage}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline text-slate-400">View Style:</span>
            <button
              onClick={() => setViewMode('page')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'page'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Page-by-Page
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setViewMode('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Continuous View
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'page' ? (
          /* PAGE-BY-PAGE MODE: Only the chosen page is cleanly rendered */
          <div className="animate-fadeIn">
            {activePage === 'home' && (
              <>
                <Hero
                  profile={profile}
                  onNavigate={handleSelectPage}
                  onUpdatePhoto={handleUpdatePhoto}
                />

                {/* Quick Directory on Home Page */}
                <section className="py-12 border-t border-slate-800/80 bg-slate-900/30">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                      Portfolio Directory
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Explore Jimmy&apos;s Portfolio Sections
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: 'about', title: 'About Me', desc: 'Background, Kepler College studies, and education history.' },
                        { id: 'projects', title: 'Projects & Dashboards', desc: 'CFA valuation model, World Vision MEAL, and interactive dashboards.' },
                        { id: 'certifications', title: 'Certifications & Honors', desc: 'CFA 1st Place, UCalgary conferences, and Community Uplifter award.' },
                        { id: 'skills', title: 'Skills & Toolkit', desc: 'Python, Power BI, Advanced Excel, Streamlit, SPSS, BigData, and SQL.' },
                        { id: 'resume', title: 'Resume / CV', desc: 'Full experience, education, official PDF upload/download, and ATS text.' },
                        { id: 'contact', title: 'Contact Me', desc: 'Direct WhatsApp (+250 791 837 351) and email communication.' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectPage(item.id)}
                          className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                            <span>{item.title}</span>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activePage === 'about' && (
              <AboutSection profile={profile} />
            )}

            {activePage === 'projects' && (
              <ProjectsSection
                projects={projects}
                onUploadProjectImage={handleUploadProjectImage}
                onRemoveProjectImage={handleRemoveProjectImage}
                onUpdateProjectLiveUrl={handleUpdateProjectLiveUrl}
                onAddNewProject={handleAddNewProject}
              />
            )}

            {activePage === 'certifications' && (
              <CertificationsSection
                certifications={certifications}
                onOpenEditor={() => setIsEditorOpen(true)}
                onUploadCertFile={handleUploadCertFile}
                onRemoveCertFile={handleRemoveCertFile}
              />
            )}

            {activePage === 'skills' && (
              <SkillsSection skillCategories={initialSkills} />
            )}

            {activePage === 'resume' && (
              <ResumeSection
                profile={profile}
                experiences={initialExperience}
                certifications={certifications}
                onUploadResume={handleUploadResume}
                onRemoveResume={handleRemoveResume}
              />
            )}

            {activePage === 'contact' && (
              <ContactSection profile={profile} />
            )}
          </div>
        ) : (
          /* CONTINUOUS VIEW MODE: All sections rendered in order */
          <div>
            <Hero
              profile={profile}
              onNavigate={handleSelectPage}
              onUpdatePhoto={handleUpdatePhoto}
            />
            <AboutSection profile={profile} />
            <ProjectsSection
              projects={projects}
              onUploadProjectImage={handleUploadProjectImage}
              onRemoveProjectImage={handleRemoveProjectImage}
              onUpdateProjectLiveUrl={handleUpdateProjectLiveUrl}
              onAddNewProject={handleAddNewProject}
            />
            <CertificationsSection
              certifications={certifications}
              onOpenEditor={() => setIsEditorOpen(true)}
              onUploadCertFile={handleUploadCertFile}
              onRemoveCertFile={handleRemoveCertFile}
            />
            <SkillsSection skillCategories={initialSkills} />
            <ResumeSection
              profile={profile}
              experiences={initialExperience}
              certifications={certifications}
              onUploadResume={handleUploadResume}
              onRemoveResume={handleRemoveResume}
            />
            <ContactSection profile={profile} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onNavigate={handleSelectPage}
      />

      {/* Profile & Certificate Customizer Modal */}
      <ProfileEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        profile={profile}
        certifications={certifications}
        onSave={(up, uc) => {
          saveProfile(up);
          saveCertifications(uc);
        }}
        onReset={handleResetData}
      />
    </div>
  );
}
