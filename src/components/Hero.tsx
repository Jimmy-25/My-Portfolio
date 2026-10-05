import React, { useRef } from 'react';
import { ArrowRight, Download, Mail, Phone, MapPin, Linkedin, Trophy, HeartHandshake, Upload, Camera, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface HeroProps {
  profile: UserProfile;
  onNavigate: (pageId: string) => void;
  onUpdatePhoto: (photoDataUrl?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onUpdatePhoto }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdatePhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Jimmy, I reviewed your Business Analytics portfolio and would like to connect.')}`;

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      {/* Background ambient subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Personal Narrative & Key Facts */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <span>Kepler College</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>B.Sc. in Business Analytics</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400 font-bold">1st Place CFA Research Challenge</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {profile.fullName}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-medium leading-snug">
                Business Analyst & Quantitative Problem Solver
              </p>
            </div>

            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              {profile.bioIntro}
            </p>

            {/* Direct Contact Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.location}</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.phone}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.email}</span>
              </a>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('certifications')}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Certifications</span>
              </button>

              <button
                onClick={() => onNavigate('resume')}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Resume / CV</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Tabular Stats Grid */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {profile.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {stat.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo Slot with Easy Custom Photo Upload */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-5">
              {/* Photo Area */}
              <div className="relative aspect-square w-full rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col items-center justify-center overflow-hidden group">
                {profile.customPhotoUrl ? (
                  <>
                    <img
                      src={profile.customPhotoUrl}
                      alt="Jimmy Munyangabe"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>
                      <button
                        onClick={() => onUpdatePhoto(undefined)}
                        className="px-3 py-1 text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-500/20 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove Photo</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-slate-800 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl font-extrabold shadow-inner">
                      JM
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">Jimmy Munyangabe</h3>
                      <p className="text-xs text-slate-400">Profile Photo Slot</p>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
                      Click below to insert your own headshot photo directly from your device.
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload My Photo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Badges Under Photo */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Verified Honors</span>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <div className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>1st Place Winner</span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      CFA Research Challenge
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <div className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Community Uplifter</span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      GS Gasaka 50 Youth Giveback
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
