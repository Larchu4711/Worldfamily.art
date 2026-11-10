import React, { useState, useRef } from 'react';
import { Music, Palette, Users, Heart, ArrowRight, ImagePlus, ExternalLink } from 'lucide-react';
import {
  type Locale,
  type SubpageSectionContent,
  IMAGES,
} from '../data/worldFamilyContent';
import {
  StreetFoodVanIllustration,
  GardenSproutIllustration,
  ApplicationsHandshakeIllustration,
} from './BrandGraphics';
import { TornPaperEdge } from './TornPaperEdge';
import { BarMenuSection } from './BarMenuSection';

interface SubpageShowcaseCardProps {
  section: SubpageSectionContent;
  siteLocale: Locale;
  isHighlighted?: boolean;
  onOpenInquiry: (defaultTopic?: string) => void;
}

interface WfbPhoto {
  id: string;
  src: string;
  title: string;
}

const DEFAULT_WFB_PHOTOS: WfbPhoto[] = [
  {
    id: 'sol-y-sombra',
    src: '/assets/aistudio/familysolysombra_305f73fa.jpg',
    title: 'World Family · Sol y Sombra (Mar de Fóra)',
  },
  {
    id: 'bar-terrace-mural',
    src: IMAGES.barTerraceMural,
    title: 'World Family Bar · Mosaik & Terrasse Fisterra',
  },
  {
    id: 'bar-interior-communal',
    src: IMAGES.barInteriorCommunal,
    title: 'World Family Bar · Live-Musik & Wandkunst',
  },
  {
    id: 'cabo-fisterra-km0',
    src: IMAGES.heroLighthouse,
    title: 'Cabo Fisterra · Kilometer 0.0',
  },
];

export const SubpageShowcaseCard: React.FC<SubpageShowcaseCardProps> = ({
  section,
  siteLocale,
  isHighlighted = false,
  onOpenInquiry,
}) => {
  const [customPhotos, setCustomPhotos] = useState<WfbPhoto[]>(() => {
    try {
      const saved = window.localStorage.getItem('wfb_custom_photos');
      return saved ? (JSON.parse(saved) as WfbPhoto[]) : [];
    } catch {
      return [];
    }
  });
  const [activeBannerOverride, setActiveBannerOverride] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allBarPhotos = [...customPhotos, ...DEFAULT_WFB_PHOTOS];

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newPhoto: WfbPhoto = {
            id: `wfb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            src: reader.result,
            title: file.name.replace(/\.[^/.]+$/, ''),
          };
          setCustomPhotos((prev) => {
            const updated = [newPhoto, ...prev].slice(0, 16);
            try {
              window.localStorage.setItem('wfb_custom_photos', JSON.stringify(updated));
            } catch {
              // ignore storage quota errors for large high-res files
            }
            return updated;
          });
          setActiveBannerOverride(reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const renderFeatureIcon = (icon: 'music' | 'art' | 'people' | 'heart') => {
    switch (icon) {
      case 'music':
        return <Music className="w-5 h-5 text-[#231f20] shrink-0" strokeWidth={2.2} />;
      case 'art':
        return <Palette className="w-5 h-5 text-[#231f20] shrink-0" strokeWidth={2.2} />;
      case 'people':
        return <Users className="w-5 h-5 text-[#231f20] shrink-0" strokeWidth={2.2} />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#231f20] shrink-0" strokeWidth={2.2} />;
    }
  };

  const displayBannerImage = activeBannerOverride || section.bannerImage;

  return (
    <article
      id={`section-${section.id}`}
      className={`scroll-mt-24 rounded-2xl overflow-hidden transition-all duration-200 parchment-card ${
        isHighlighted
          ? 'ring-2 ring-[#e5b322] shadow-[0_18px_42px_rgba(58,43,22,0.18)]'
          : 'shadow-[0_12px_32px_rgba(40,30,15,0.11)]'
      }`}
    >
      {/* Top Coastal / Cultural Banner with Handwritten Title */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-[#1b2234]">
        <img
          src={displayBannerImage}
          alt={section.bannerTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
        />
        {/* Measured gradient scrim for legible handwritten script title */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30"
          aria-hidden="true"
        />

        {/* Handwritten Script Overlay Title */}
        <div className="absolute inset-x-0 top-0 p-6 sm:p-8 flex items-center justify-between">
          <h3 className="font-script text-4xl sm:text-5xl text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] tracking-wide">
            {section.bannerTitle}
          </h3>
        </div>

        {/* Organic Torn Paper Bottom Transition into Parchment Body */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <TornPaperEdge position="top" fill="#faf3e3" />
        </div>
      </div>

      {/* Warm Parchment Lower Body */}
      <div className="bg-[#faf3e3] px-6 sm:px-8 pt-3 pb-7 sm:pb-8 text-[#231f20]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-2.5">
            <h4 className="font-serif-editorial text-2xl sm:text-[26px] font-bold text-[#1e1a17] leading-snug">
              {section.heading}
            </h4>
            <p className="text-[15px] sm:text-base text-[#3a332c] leading-relaxed">
              {section.body}
            </p>
            {section.extraParagraph && (
              <p className="text-sm text-[#5c5146] leading-relaxed pt-1">
                {section.extraParagraph}
              </p>
            )}
          </div>

          {/* Right Bespoke Graphic / Feature Column per Section */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center">
            {section.id === 'world-family' && (
              <div className="w-full max-w-[240px] rounded-xl overflow-hidden border-2 border-[#e2d2b5] shadow-md bg-[#231f20] relative group">
                <img
                  src={IMAGES.heroLighthouse}
                  alt="Camino de Santiago Muschelstein in Fisterra"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover object-left-bottom"
                />
                <div className="bg-[#f3ead6] px-3 py-1.5 text-xs font-semibold text-[#3a332c] flex items-center justify-between">
                  <span>Camino · Km 0.0</span>
                  <span className="text-[#c78d12]">Fisterra</span>
                </div>
              </div>
            )}

            {section.id === 'bar' && section.features && (
              <ul className="w-full space-y-2.5 bg-[#f3ead6]/80 p-4 rounded-xl border border-[#e2d3b7]">
                {section.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm sm:text-[15px] font-medium text-[#231f20]"
                  >
                    {renderFeatureIcon(feat.icon)}
                    <span>{feat.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.id === 'street-food' && (
              <div className="flex flex-col items-center">
                <StreetFoodVanIllustration />
              </div>
            )}

            {section.id === 'garden' && (
              <div className="flex flex-col items-center pr-2">
                <GardenSproutIllustration />
              </div>
            )}

            {section.id === 'applications' && (
              <div className="flex flex-col items-center md:items-end gap-4 w-full">
                <ApplicationsHandshakeIllustration />
              </div>
            )}
          </div>
        </div>

        {/* Original Photos Strip & Local "FOTOS WFB" / Facebook Gallery inside World Family Bar */}
        {section.id === 'bar' && (
          <div className="mt-6 pt-5 border-t border-[#e2d2b4] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h5 className="font-serif-editorial text-base sm:text-lg font-bold text-[#1e1a17]">
                  Originalbilder · World Family Bar (FOTOS WFB &amp; Facebook)
                </h5>
                <p className="text-xs text-[#5c5146]">
                  Klicke auf ein Foto für die große Banner-Ansicht oder lade weitere Originalfotos direkt aus deinem Ordner <code className="font-mono bg-[#eadbc0] px-1.5 py-0.5 rounded">FOTOS WFB</code> hinzu.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-disco-mosaic-3d inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ImagePlus className="w-4 h-4" />
                  <span>Fotos aus „FOTOS WFB“ laden</span>
                </button>

                <a
                  href="https://www.facebook.com/the-world-family"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-disco-mosaic-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Facebook Fotos</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {allBarPhotos.slice(0, 8).map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActiveBannerOverride(photo.src)}
                  className={`group relative h-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    displayBannerImage === photo.src
                      ? 'border-[#facc15] ring-2 ring-[#e61919] scale-[1.02]'
                      : 'border-[#d8c7a6] opacity-90 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1 text-left">
                    <p className="text-[11px] font-semibold text-white truncate">
                      {photo.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Multilingual Speisekarte / La Carta inside the World Family Bar Section */}
        {section.id === 'bar' && <BarMenuSection siteLocale={siteLocale} />}

        {/* Centered 3D Disco-Mosaic CTA Button for Applications ("Jetzt anfragen ->") */}
        {section.id === 'applications' && section.ctaLabel && (
          <div className="mt-6 pt-4 border-t border-[#e5d8be] flex justify-center">
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="btn-disco-mosaic-3d inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-bold text-sm sm:text-base cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{section.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
