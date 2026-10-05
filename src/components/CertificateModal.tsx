import React, { useRef } from 'react';
import { X, Award, ExternalLink, ShieldCheck, CheckCircle2, Calendar, Upload, FileCheck, Trash2, Download } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
  onUploadCertFile?: (certId: string, fileDataUrl: string, fileName: string, fileType: string) => void;
  onRemoveCertFile?: (certId: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  onClose,
  onUploadCertFile,
  onRemoveCertFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!cert) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadCertFile) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB limit. Please upload a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUploadCertFile(cert.id, result, file.name, file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isImage = cert.uploadedFileType?.startsWith('image/') || cert.uploadedFileUrl?.startsWith('data:image/');
  const isPdf = cert.uploadedFileType === 'application/pdf' || cert.uploadedFileUrl?.startsWith('data:application/pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Certificate Display Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential Record</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {cert.name}
              </h3>
              <p className="text-xs text-slate-400">{cert.issuer}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Issued: <strong>{cert.issuedDate}</strong></span>
            </div>
            <div className="font-mono text-slate-400">
              Credential ID: <span className="text-emerald-400 font-semibold">{cert.credentialId}</span>
            </div>
          </div>

          {/* Uploaded Certificate Document Viewer or Upload Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-300">
                Official Certificate Document
              </span>
              {cert.uploadedFileUrl && (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Document Uploaded</span>
                </span>
              )}
            </div>

            {cert.uploadedFileUrl ? (
              <div className="rounded-xl border border-slate-700/80 overflow-hidden bg-slate-950 p-4 space-y-4">
                {isImage ? (
                  <div className="max-h-96 overflow-auto rounded-lg bg-black/40 flex items-center justify-center p-2">
                    <img
                      src={cert.uploadedFileUrl}
                      alt={cert.name}
                      className="max-h-80 w-auto object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-2">
                    <FileCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                    <div className="font-semibold text-white text-sm">
                      {cert.uploadedFileName || 'Certificate Document (PDF/Doc)'}
                    </div>
                    <p className="text-xs text-slate-400">
                      Official document file attached and ready for viewing.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400 truncate max-w-xs">
                    {cert.uploadedFileName || 'Uploaded file'}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={cert.uploadedFileUrl}
                      download={cert.uploadedFileName || `${cert.name}.pdf`}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </a>
                    {onRemoveCertFile && (
                      <button
                        onClick={() => onRemoveCertFile(cert.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Remove uploaded document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center space-y-3">
                <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">
                    Upload Your Official Certificate
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Upload an image (PNG, JPG) or PDF copy of this certificate so visitors with your portfolio link can view and verify it.
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Certificate File</span>
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {cert.description}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Validated Competencies:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {cert.skillsValidated.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Candidate: Jimmy Munyangabe
          </span>

          <div className="flex items-center gap-3">
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg transition-colors"
              >
                <span>External Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
