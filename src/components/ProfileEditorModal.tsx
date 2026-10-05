import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Award, Check } from 'lucide-react';
import { UserProfile, CertificationItem } from '../types/portfolio';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  certifications: CertificationItem[];
  onSave: (updatedProfile: UserProfile, updatedCerts: CertificationItem[]) => void;
  onReset: () => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  certifications,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [certsData, setCertsData] = useState<CertificationItem[]>([...certifications]);
  const [activeTab, setActiveTab] = useState<'profile' | 'certs'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Cert form
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [newCertId, setNewCertId] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData, certsData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertIssuer.trim()) return;

    const newCert: CertificationItem = {
      id: `cert-custom-${Date.now()}`,
      name: newCertName.trim(),
      issuer: newCertIssuer.trim(),
      issuedDate: newCertDate.trim() || '2025',
      credentialId: newCertId.trim() || `VER-${Math.floor(100000 + Math.random() * 900000)}`,
      credentialUrl: newCertUrl.trim() || undefined,
      status: 'Verified',
      skillsValidated: ['Business Analytics', 'Data Visualization'],
      description: `Professional certification conferred by ${newCertIssuer}.`,
    };

    setCertsData([newCert, ...certsData]);
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertDate('');
    setNewCertId('');
    setNewCertUrl('');
  };

  const handleDeleteCert = (id: string) => {
    setCertsData(certsData.filter((c) => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Personalize Portfolio & Certificates
            </h2>
            <p className="text-xs text-slate-400">
              Update your contact links, biographical notes, or add your verified certificates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 border-b border-slate-800 flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Biographical & Contact Data
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'certs'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Certificates ({certsData.length})
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Changes saved successfully to your browser storage!</span>
            </div>
          )}

          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Degree & University</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Primary Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-slate-400 font-medium">Hero Summary Statement</label>
                <textarea
                  rows={3}
                  value={formData.bioIntro}
                  onChange={(e) => setFormData({ ...formData, bioIntro: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Add New Certificate Form */}
              <form onSubmit={handleAddCert} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-semibold text-white block">Add a Verified Credential</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Certificate Title (e.g. AWS Certified Data Analytics)"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    required
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization (e.g. Google, Microsoft, Kepler)"
                    value={newCertIssuer}
                    onChange={(e) => setNewCertIssuer(e.target.value)}
                    required
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Issue Date (e.g. Oct 2025)"
                    value={newCertDate}
                    onChange={(e) => setNewCertDate(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Credential ID / Code (e.g. MS-900-2819)"
                    value={newCertId}
                    onChange={(e) => setNewCertId(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    placeholder="Verification URL (optional, e.g. https://coursera.org/verify/...)"
                    value={newCertUrl}
                    onChange={(e) => setNewCertUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Current List */}
              <div className="space-y-2">
                <span className="font-semibold text-slate-400 block uppercase tracking-wider text-[11px]">
                  Configured Certificates ({certsData.length})
                </span>
                {certsData.map((c) => (
                  <div key={c.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {c.issuer} · {c.issuedDate} · ID: {c.credentialId}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCert(c.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original Baseline</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
