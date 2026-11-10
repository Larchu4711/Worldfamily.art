import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Music, Sparkles, Send } from 'lucide-react';
import {
  type TranslationContent,
  validateInquiryForm,
  IMAGES,
} from '../data/worldFamilyContent';

interface VideoImpressionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: TranslationContent;
}

export const VideoImpressionsModal: React.FC<VideoImpressionsModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!isOpen) return null;

  const galleryItems = [
    {
      image: '/assets/aistudio/familysolysombra_305f73fa.jpg',
      title: 'World Family · Sol y Sombra (Mar de Fóra)',
      caption: 'Originalaufnahme der World Family am Atlantikstrand in Fisterra',
    },
    {
      image: IMAGES.barTerraceMural,
      title: 'World Family Bar · Fisterra',
      caption: 'ART · MUSIC · PEOPLE · FOOD · NATURE — Avenida da Coruña 63',
    },
    {
      image: IMAGES.barInteriorCommunal,
      title: 'La Mesa Compartida & Live-Musik',
      caption: 'Gemeinsame Abende, Wandmalereien und Begegnung am Ende des Camino',
    },
    {
      image: IMAGES.heroLighthouse,
      title: 'Cabo Fisterra · Km 0.0',
      caption: 'Sonnenuntergang am Leuchtturm von Finisterre über dem Atlantik',
    },
  ];

  const current = galleryItems[activePhotoIndex] || galleryItems[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#faf3e3] text-[#231f20] border-2 border-[#e2c992] shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1c2333] text-white border-b border-[#3a4358]">
          <div>
            <h3 id="video-modal-title" className="font-script text-2xl sm:text-3xl text-[#f2c438]">
              {content.modal.videoTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {content.modal.videoSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={content.modal.closeLabel}
            className="btn-disco-mosaic-3d p-2 rounded-full text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Showcase Stage */}
        <div className="relative aspect-video w-full bg-[#0e131d] overflow-hidden">
          <img
            src={current.image}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#f2c438] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Fisterra · Costa da Morte
              </span>
              <h4 className="font-serif-editorial text-xl sm:text-2xl font-bold mt-0.5">
                {current.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200">{current.caption}</p>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 sm:p-5 bg-[#f5ecd9] flex flex-wrap items-center justify-between gap-3">
          <div className="grid grid-cols-4 gap-2.5 w-full sm:w-auto flex-1">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx
                    ? 'border-[#d99b16] ring-2 ring-[#f2c438] scale-[1.02]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <a
            href="https://www.facebook.com/the-world-family"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-disco-mosaic-3d px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            Facebook Galerie
          </a>

          <button
            type="button"
            onClick={onClose}
            className="btn-disco-mosaic-3d px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            {content.modal.closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: TranslationContent;
  initialTopic?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  content,
  initialTopic,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(initialTopic || content.modal.topics[0]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm({ name, email, topic, message });
    if (!validation.valid) {
      setErrorMessage(
        validation.error === 'email'
          ? content.modal.errorEmail
          : content.modal.errorRequired
      );
      return;
    }

    setErrorMessage(null);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-[#faf3e3] text-[#231f20] border-2 border-[#dec695] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1c2333] text-white">
          <div>
            <h3 id="inquiry-modal-title" className="font-script text-2xl sm:text-3xl text-[#f2c438]">
              {content.modal.inquiryTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label={content.modal.closeLabel}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-editorial text-2xl font-bold text-[#1e1a17]">
                {content.modal.successTitle}
              </h4>
              <p className="text-sm sm:text-base text-[#4a4138] max-w-md mx-auto">
                {content.modal.successMessage}
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-7 py-2.5 rounded-full bg-[#f2c438] hover:bg-[#e5b322] text-[#1e1a17] font-bold text-sm transition-colors cursor-pointer"
                >
                  {content.modal.closeLabel}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-sm text-[#4a4138] leading-relaxed">
                {content.modal.inquirySubtitle}
              </p>

              {errorMessage && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-900 text-xs sm:text-sm font-medium"
                >
                  {errorMessage}
                </div>
              )}

              <div>
                <label
                  htmlFor="wf-inquiry-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#4a4138] mb-1"
                >
                  {content.modal.nameLabel}
                </label>
                <input
                  id="wf-inquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maria / Lukas..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#d6c4a0] text-[#231f20] text-sm focus:outline-none focus:ring-2 focus:ring-[#e5b322]"
                />
              </div>

              <div>
                <label
                  htmlFor="wf-inquiry-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#4a4138] mb-1"
                >
                  {content.modal.emailLabel}
                </label>
                <input
                  id="wf-inquiry-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#d6c4a0] text-[#231f20] text-sm focus:outline-none focus:ring-2 focus:ring-[#e5b322]"
                />
              </div>

              <div>
                <label
                  htmlFor="wf-inquiry-topic"
                  className="block text-xs font-bold uppercase tracking-wider text-[#4a4138] mb-1"
                >
                  {content.modal.topicLabel}
                </label>
                <select
                  id="wf-inquiry-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#d6c4a0] text-[#231f20] text-sm focus:outline-none focus:ring-2 focus:ring-[#e5b322]"
                >
                  {content.modal.topics.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="wf-inquiry-message"
                  className="block text-xs font-bold uppercase tracking-wider text-[#4a4138] mb-1"
                >
                  {content.modal.messageLabel}
                </label>
                <textarea
                  id="wf-inquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Wir sind in Fisterra und möchten..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#d6c4a0] text-[#231f20] text-sm focus:outline-none focus:ring-2 focus:ring-[#e5b322]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#5c5146] hover:text-[#231f20] cursor-pointer"
                >
                  {content.modal.closeLabel}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f2c438] hover:bg-[#e5b322] text-[#1e1a17] font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>{content.modal.submitLabel}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
