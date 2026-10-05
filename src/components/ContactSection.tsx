import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Linkedin, Phone, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Opportunity & Hiring');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

  const buildWhatsAppMessage = () => {
    const text = `Hi Jimmy, my name is ${name || 'a visitor'} (${email || 'not provided'}).
Regarding: ${inquiryType}

${message || 'I reviewed your Business Analytics portfolio and would like to connect with you.'}`;
    return encodeURIComponent(text);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name and message to start WhatsApp chat.');
      return;
    }
    setErrorMessage('');
    const url = `https://wa.me/${cleanPhone}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email, and message to send an email.');
      return;
    }
    setErrorMessage('');
    const subject = encodeURIComponent(`${inquiryType} - ${name}`);
    const body = encodeURIComponent(`Hi Jimmy,\n\n${message}\n\nSender: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Jimmy, I reviewed your Business Analytics portfolio and would like to connect.')}`;

  return (
    <section id="contact" className="py-12 md:py-16 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>Contact Me</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">WhatsApp & Email Connected</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let&apos;s Connect Directly
          </h2>
          <p className="text-base text-slate-300">
            Reach out directly via WhatsApp to <strong className="text-emerald-400 font-mono">{profile.phone}</strong> or send an email to <strong className="text-emerald-400 font-mono">{profile.email}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Priority Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Instant Chat Available
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Chat on WhatsApp
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with Jimmy Munyangabe directly on his personal WhatsApp. Fast response guaranteed.
              </p>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    {profile.phone}
                  </span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp ({profile.phone})</span>
              </a>
            </div>

            {/* Email & Location Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Direct Contact Details
              </h3>

              <div className="space-y-3 text-xs">
                {/* Email item */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">
                      Email Address
                    </span>
                    <span className="text-sm font-mono font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* Location item */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">
                      Academic Location
                    </span>
                    <span className="text-sm font-medium text-white">
                      {profile.location} · Kepler College
                    </span>
                  </div>
                </div>

                {/* LinkedIn */}
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">
                      Professional Network
                    </span>
                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      linkedin.com/in/jimmymunyangabe
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp & Email Message Composer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Compose & Send Message
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your details below and choose whether to send via WhatsApp directly to Jimmy&apos;s phone or via Email.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marie Claire"
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@organization.com"
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Inquiry Topic
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      'Opportunity & Hiring',
                      'MEAL / Field Project',
                      'General Question',
                    ].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setInquiryType(topic)}
                        className={`px-3 py-2 rounded-lg border text-center transition-colors cursor-pointer text-xs ${
                          inquiryType === topic
                            ? 'bg-emerald-500/10 border-emerald-500 text-white font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write what you would like to discuss..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Dual Action Buttons: Send via WhatsApp or Send via Email */}
                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+250 791 837 351)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Send via Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
