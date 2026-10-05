import React, { useState, useRef } from 'react';
import { Award, ExternalLink, ShieldCheck, Eye, Upload, FileCheck, Trophy, Users, Globe2, PlusCircle } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  onOpenEditor: () => void;
  onUploadCertFile: (certId: string, fileDataUrl: string, fileName: string, fileType: string) => void;
  onRemoveCertFile: (certId: string) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onOpenEditor,
  onUploadCertFile,
  onRemoveCertFile,
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const quickFileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = (certId: string) => {
    setActiveUploadId(certId);
    quickFileInputRef.current?.click();
  };

  const handleQuickFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB limit. Please upload a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUploadCertFile(activeUploadId, result, file.name, file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="certifications" className="py-12 md:py-16 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hidden quick file input */}
        <input
          ref={quickFileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleQuickFileChange}
          className="hidden"
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <span>Honors & Credentials</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Certificates of Participation & Recognition</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Certifications & Official Recognitions
            </h2>
            <p className="text-base text-slate-300">
              Honors in the CFA Institute Research Challenge, University of Calgary conferences, and community digital literacy leadership. Click any certificate to view or upload the official document file.
            </p>
          </div>

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manage Certificates</span>
          </button>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => {
            const isCFA = cert.id.includes('cfa');
            const isCommunity = cert.id.includes('community');
            const hasUpload = Boolean(cert.uploadedFileUrl);

            return (
              <div
                key={cert.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group relative overflow-hidden"
              >
                {/* Visual accent top line */}
                {isCFA && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                )}
                {isCommunity && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isCFA
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : isCommunity
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >
                      {isCFA ? (
                        <Trophy className="w-5 h-5" />
                      ) : isCommunity ? (
                        <Users className="w-5 h-5" />
                      ) : (
                        <Globe2 className="w-5 h-5" />
                      )}
                    </div>

                    <div className="text-right">
                      {hasUpload ? (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 justify-end font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Document Attached</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{cert.status}</span>
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                        {cert.issuedDate}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400/90 mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Validated Skills */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsValidated.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTriggerUpload(cert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Upload className="w-3 h-3 text-emerald-400" />
                      <span>{hasUpload ? 'Replace File' : 'Upload Certificate'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{hasUpload ? 'View / Download' : 'Details'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal with document viewer */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
        onUploadCertFile={onUploadCertFile}
        onRemoveCertFile={onRemoveCertFile}
      />
    </section>
  );
};
