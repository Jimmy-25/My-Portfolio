import React, { useState, useRef } from 'react';
import { Printer, Copy, Check, FileText, Download, Upload, FileCheck, Trash2, Eye, ExternalLink } from 'lucide-react';
import { UserProfile, ExperienceItem, CertificationItem } from '../types/portfolio';
import { educationHistory, initialVolunteering } from '../data/portfolioData';

interface ResumeSectionProps {
  profile: UserProfile;
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  onUploadResume: (fileDataUrl: string, fileName: string, fileType: string) => void;
  onRemoveResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  profile,
  experiences,
  certifications,
  onUploadResume,
  onRemoveResume,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller PDF/document.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUploadResume(result, file.name, file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyATS = () => {
    const textResume = `
JIMMY MUNYANGABE
Rwanda, Kigali | ${profile.phone} | ${profile.email} | ${profile.linkedinUrl}

PROFESSIONAL PROFILE
${profile.bioIntro}

EDUCATION BACKGROUND
• Kepler College Kigali, Through Kepler (May 2024 – Present) - Kigali, Rwanda
  Bachelor of Science in Business Analytics
• College Saint Andre, Nyamirambo (2020 – 2023) - Kigali, Rwanda
  Mathematics-Physics-Computer Science / Advanced Certificate (A2)
• Groupe Scolaire Saint Joseph Kabgayi (2017 – 2019) - Muhanga, Rwanda
  O-Level Certificate

WORK EXPERIENCE
${experiences
  .map(
    (exp) => `
${exp.role} | ${exp.organization} | ${exp.period}
${exp.achievements.map((a) => `• ${a}`).join('\n')}
`
  )
  .join('\n')}

VOLUNTEERING
${initialVolunteering.role} | ${initialVolunteering.projectTitle} | ${initialVolunteering.organization}, ${initialVolunteering.location} (${initialVolunteering.period})
${initialVolunteering.highlights.map((h) => `• ${h}`).join('\n')}

CERTIFICATIONS & HONORS
${certifications.map((c) => `• ${c.name} - ${c.issuer} (${c.issuedDate})`).join('\n')}

SKILLS & ABILITIES
Technical: Microsoft Excel (pivot tables, data analysis, formulas), Google Sheets, Python for data cleaning, SQL, Data visualization and reporting.
Analytical: Business data analysis, financial modeling, company valuation, and ratio analysis, Structured data organization.
Leadership & Field Skills: Community-based training initiative planning, field settings independent work, relationship-building.
Languages: Kinyarwanda (Native) · English (Fluent) · Kiswahili (Conversational)

REFERENCES
Available upon request.
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasUploadedResume = Boolean(profile.uploadedResumeUrl);

  return (
    <section id="resume" className="py-12 md:py-16 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hidden file input for resume */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <span>Curriculum Vitae</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Official Resume Document</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Resume / CV
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Access official resume document or copy plain-text formatted for job boards.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{hasUploadedResume ? 'Replace PDF Resume' : 'Upload Resume PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleCopyATS}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Copy plain text for ATS application forms"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Uploaded Resume File Banner (when file is uploaded) */}
        {hasUploadedResume ? (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Official Resume File Attached
                </span>
                <span className="text-sm font-semibold text-white block truncate max-w-sm">
                  {profile.uploadedResumeName || 'Jimmy_Munyangabe_Resume.pdf'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={profile.uploadedResumeUrl}
                download={profile.uploadedResumeName || 'Jimmy_Munyangabe_Resume.pdf'}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onRemoveResume}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                title="Remove uploaded resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 rounded-xl bg-slate-950/80 border border-dashed border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Have your original PDF Resume ready? Upload it so anyone visiting your portfolio link can download it directly.</span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md shrink-0 cursor-pointer"
            >
              Upload PDF
            </button>
          </div>
        )}

        {/* Paper-Style Resume Document Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-7 text-slate-200">
          {/* Header matching resume banner */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-mono">
              <span>{profile.location}</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400">
                {profile.phone}
              </a>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <a href={`mailto:${profile.email}`} className="hover:text-emerald-400">
                {profile.email}
              </a>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                linkedin.com/in/jimmymunyangabe
              </a>
            </div>
          </div>

          {/* PROFESSIONAL PROFILE */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-slate-800/80 pb-1">
              Professional Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              {profile.bioIntro}
            </p>
          </div>

          {/* EDUCATION BACKGROUND */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-slate-800/80 pb-1">
              Education Background
            </h3>
            <div className="space-y-3">
              {educationHistory.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                  <div>
                    <div className="font-bold text-white text-sm">{edu.institution}</div>
                    <div className="text-slate-400">{edu.location}</div>
                    <div className="text-emerald-400 italic mt-0.5">{edu.degree}</div>
                  </div>
                  <div className="font-mono text-slate-400 shrink-0">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-slate-800/80 pb-1">
              Work Experience
            </h3>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-white text-sm">{exp.role}</span>
                      <span className="text-slate-400 block sm:inline sm:ml-2 italic">
                        {exp.organization} | {exp.location}
                      </span>
                    </div>
                    <span className="font-mono text-slate-400 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1 text-slate-300 pl-3">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="list-disc leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* VOLUNTEERING */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-slate-800/80 pb-1">
              Volunteering
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-bold text-white">{initialVolunteering.role} | {initialVolunteering.projectTitle}</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2 italic">
                    {initialVolunteering.organization}, {initialVolunteering.location}
                  </span>
                </div>
                <span className="font-mono text-slate-400 shrink-0">
                  {initialVolunteering.period}
                </span>
              </div>
              <ul className="space-y-1 text-slate-300 pl-3">
                {initialVolunteering.highlights.map((h, idx) => (
                  <li key={idx} className="list-disc leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SKILLS & ABILITIES */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-slate-800/80 pb-1">
              Skills & Abilities
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <strong className="text-white font-semibold">Technical: </strong>
                Proficient in Microsoft Excel (pivot tables, data analysis, formulas) and Google Sheets. Basic proficiency in Python for data cleaning, analysis, and visualization. Familiar with SQL and basic database querying for data retrieval and management. Data visualization and reporting using spreadsheet tools and business intelligence concepts.
              </div>
              <div>
                <strong className="text-white font-semibold">Analytical: </strong>
                Business data analysis, financial modeling, company valuation, and ratio analysis. Structured data organization, record-keeping, and operational decision support. Tracking performance against targets and flagging risks early to support timely, informed decisions.
              </div>
              <div>
                <strong className="text-white font-semibold">Leadership & Field Skills: </strong>
                Experience planning, leading, and coaching participants through a community-based training initiative. Comfortable working independently in field settings, with sound judgment on day-to-day operational challenges. Strong relationship-building and communication skills with diverse community members and stakeholders. Reliable and team-oriented, with a strong commitment to team productivity and quality of work.
              </div>
              <div>
                <strong className="text-white font-semibold">Languages: </strong>
                Kinyarwanda (Native) · English (Fluent) · Kiswahili (Conversational)
              </div>
            </div>
          </div>

          {/* REFERENCES */}
          <div className="space-y-1 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              References
            </h3>
            <p className="text-xs text-slate-400 italic">
              Available upon request.
            </p>
          </div>
        </div>

        {/* Modal for previewing uploaded resume */}
        {showPreviewModal && profile.uploadedResumeUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {profile.uploadedResumeName || 'Resume Document'}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={profile.uploadedResumeUrl}
                    download={profile.uploadedResumeName || 'Jimmy_Munyangabe_Resume.pdf'}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-auto bg-slate-950 flex items-center justify-center min-h-[400px]">
                {profile.uploadedResumeType?.startsWith('image/') ? (
                  <img
                    src={profile.uploadedResumeUrl}
                    alt="Resume preview"
                    className="max-h-[70vh] w-auto object-contain rounded"
                  />
                ) : (
                  <iframe
                    src={profile.uploadedResumeUrl}
                    title="Resume Document Preview"
                    className="w-full h-[70vh] rounded border border-slate-800"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
