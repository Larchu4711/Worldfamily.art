import React, { useState } from 'react';

interface DiscoBallEmblemProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const DISCO_LOGO_SRC = '/assets/aistudio/LOGO_WFB_DISCOSTYLE_no_background_b5600ece.png';

/**
 * Renders the user-provided World Family Bar rainbow mosaic disco ball image
 * (/assets/aistudio/LOGO_WFB_DISCOSTYLE_no_background_b5600ece.png) with animated
 * rainbow light halo, gentle disco float/shimmer, twinkling mirror starbursts,
 * single 360-degree rotation on mouse hover, and the metallic silver/gold "— BAR —" stage plaque.
 */
export const DiscoBallEmblem: React.FC<DiscoBallEmblemProps> = ({
  size = 'lg',
  className = '',
}) => {
  const isSmall = size === 'sm';
  const [isSpinning, setIsSpinning] = useState(false);

  const handleMouseEnter = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`relative select-none flex flex-col items-center justify-center cursor-pointer ${
        isSmall
          ? 'w-11 h-11'
          : 'w-[270px] h-[290px] sm:w-[320px] sm:h-[340px] lg:w-[360px] lg:h-[380px]'
      } ${className}`}
    >
      {/* Animated rotating rainbow mosaic light halo behind the sphere */}
      <div
        className="absolute inset-3 rounded-full pointer-events-none animate-disco-halo"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(230,36,41,0.55), rgba(243,112,33,0.55), rgba(250,204,21,0.6), rgba(22,163,74,0.5), rgba(29,112,219,0.55), rgba(139,44,245,0.55), rgba(230,36,41,0.55))',
          filter: isSmall ? 'blur(5px)' : 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Main animated Disco Ball Image */}
      <div className="relative z-10 w-full flex flex-col items-center animate-disco-ball">
        <img
          src={DISCO_LOGO_SRC}
          alt="The World Family Bar Rainbow Mosaic Logo"
          onAnimationEnd={() => setIsSpinning(false)}
          className={`w-full h-auto object-contain select-none origin-center ${
            isSpinning ? 'animate-logo-spin-once' : ''
          } ${
            isSmall ? 'max-h-11' : 'max-h-[250px] sm:max-h-[296px] lg:max-h-[330px]'
          }`}
        />
      </div>

      {/* Animated 8-point disco mirror light reflections around the sphere */}
      {!isSmall && (
        <svg
          viewBox="0 0 420 420"
          className="w-full h-full absolute inset-0 z-20 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <g className="animate-sparkle">
            <g transform="translate(68, 58)">
              <path
                d="M0 -24 L4 -4 L24 0 L4 4 L0 24 L-4 4 L-24 0 L-4 -4 Z"
                fill="#ffffff"
              />
              <circle r="6" fill="#fff2b2" />
            </g>
            <g transform="translate(348, 78) scale(1.15)">
              <path
                d="M0 -24 L4 -4 L24 0 L4 4 L0 24 L-4 4 L-24 0 L-4 -4 Z"
                fill="#ffffff"
              />
              <circle r="6" fill="#facc15" />
            </g>
          </g>
          <g className="animate-sparkle-delayed">
            <g transform="translate(38, 224) scale(0.95)">
              <path
                d="M0 -22 L3.5 -3.5 L22 0 L3.5 3.5 L0 22 L-3.5 3.5 L-22 0 L-3.5 -3.5 Z"
                fill="#ffffff"
              />
              <circle r="5" fill="#f37021" />
            </g>
            <g transform="translate(364, 258) scale(1.05)">
              <path
                d="M0 -22 L3.5 -3.5 L22 0 L3.5 3.5 L0 22 L-3.5 3.5 L-22 0 L-3.5 -3.5 Z"
                fill="#ffffff"
              />
              <circle r="5" fill="#fff2b2" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

/**
 * Blue hand-drawn double wave squiggle flanking "Ein Ort für die World Family ♥"
 */
export const HandDrawnWaves: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false,
}) => (
  <svg
    viewBox="0 0 120 36"
    className={`w-20 sm:w-28 h-8 text-[#1d75b8] shrink-0 ${flip ? 'scale-x-[-1]' : ''} ${className}`}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 14 C 22 4, 38 24, 58 13 C 78 2, 96 22, 116 11"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M12 25 C 30 16, 46 33, 66 23 C 84 14, 98 30, 114 22"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
  </svg>
);

/**
 * Hand-drawn black outline heart icon next to "Ein Ort für die World Family"
 */
export const HandDrawnHeart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 40"
    className={`w-7 h-7 sm:w-8 sm:h-8 inline-block text-[#231f20] ${className}`}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M20 34 C 20 34, 6 24, 6 13.5 C 6 8.5, 10 5, 14.5 5 C 17.5 5, 19.5 7, 20 9.5 C 20.5 7, 22.5 5, 25.5 5 C 30 5, 34 8.5, 34 13.5 C 34 24, 20 34, 20 34 Z"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Custom Street Food Van line-art illustration with heart on the side door and motion rays
 */
export const StreetFoodVanIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 220 130"
    className={`w-44 sm:w-52 h-auto text-[#231f20] ${className}`}
    fill="none"
    role="img"
    aria-label="Street Food Van Illustration"
  >
    {/* Motion rays on left & right */}
    <line x1="12" y1="52" x2="26" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6" y1="68" x2="22" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="84" x2="26" y2="84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    <line x1="194" y1="46" x2="206" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="198" y1="62" x2="212" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="194" y1="78" x2="206" y2="84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Top roof awning */}
    <path
      d="M58 28 L142 20"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line x1="66" y1="28" x2="66" y2="36" stroke="currentColor" strokeWidth="2.5" />
    <line x1="134" y1="22" x2="134" y2="36" stroke="currentColor" strokeWidth="2.5" />

    {/* Main camper van body */}
    <path
      d="M36 94 L36 48 C36 41, 41 36, 48 36 L148 36 C156 36, 162 40, 167 48 L182 68 C185 72, 186 76, 186 82 L186 94 Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      fill="rgba(255,255,255,0.45)"
    />

    {/* Serving hatch window */}
    <rect
      x="50"
      y="46"
      width="58"
      height="26"
      rx="3"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="rgba(242,196,56,0.18)"
    />

    {/* Front cab windshield */}
    <path
      d="M144 46 L162 46 L174 64 L144 64 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Red heart on the side panel */}
    <path
      d="M114 82 C114 82, 105 75, 105 69 C105 66, 107.5 64, 110 64 C112 64, 113.5 65.5, 114 67 C114.5 65.5, 116 64, 118 64 C120.5 64, 123 66, 123 69 C123 75, 114 82, 114 82 Z"
      fill="#d93829"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    {/* Wheels */}
    <circle cx="68" cy="96" r="14" fill="#f5ecd9" stroke="currentColor" strokeWidth="3" />
    <circle cx="68" cy="96" r="5" fill="currentColor" />
    <circle cx="154" cy="96" r="14" fill="#f5ecd9" stroke="currentColor" strokeWidth="3" />
    <circle cx="154" cy="96" r="5" fill="currentColor" />

    {/* Road baseline */}
    <line x1="24" y1="110" x2="196" y2="110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * Custom Garden botanical sprout & soil line-art icon matching the Garden subpage card
 */
export const GardenSproutIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 120 110"
    className={`w-24 sm:w-28 h-auto text-[#231f20] ${className}`}
    fill="none"
    role="img"
    aria-label="Garden Sprout Illustration"
  >
    {/* Stem */}
    <path
      d="M60 88 L60 36"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Left Leaf */}
    <path
      d="M60 62 C60 38, 24 30, 24 52 C24 72, 60 66, 60 62 Z"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinejoin="round"
      fill="rgba(22, 163, 74, 0.14)"
    />
    <path d="M58 60 L36 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Right Leaf */}
    <path
      d="M60 50 C60 26, 96 18, 96 40 C96 60, 60 54, 60 50 Z"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinejoin="round"
      fill="rgba(22, 163, 74, 0.14)"
    />
    <path d="M62 48 L84 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Soil mound */}
    <path
      d="M32 90 Q60 80 88 90"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M22 96 L98 96"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Custom Applications welcoming handshake / heart-hands line-art icon matching the Applications card
 */
export const ApplicationsHandshakeIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 130 100"
    className={`w-24 sm:w-28 h-auto text-[#231f20] ${className}`}
    fill="none"
    role="img"
    aria-label="Community Collaboration Handshake Illustration"
  >
    {/* Left cuff */}
    <path
      d="M14 42 L32 26 L44 40 L26 58 Z"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinejoin="round"
      fill="rgba(242, 196, 56, 0.2)"
    />
    {/* Right cuff */}
    <path
      d="M116 42 L98 26 L86 40 L104 58 Z"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinejoin="round"
      fill="rgba(29, 112, 219, 0.15)"
    />
    {/* Clasped hands */}
    <path
      d="M44 40 C52 33, 62 33, 68 38 L86 40 L76 66 C68 74, 54 74, 44 64 L26 58"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 46 L68 58 M46 54 L62 66 M58 40 L74 52"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Painted Sun & Moon Mosaic SVG Badge for the Applications 5th card thumbnail & Mural accents
 */
export const SunMoonMosaicArt: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 320 220"
    className={`w-full h-full object-cover ${className}`}
    role="img"
    aria-label="Bohemian Sun and Moon Mosaic Mural"
  >
    <rect width="320" height="220" fill="#1b3b6f" />
    {/* Mosaic background tiles */}
    <circle cx="160" cy="110" r="102" fill="#1d70db" stroke="#facc15" strokeWidth="4" strokeDasharray="12 4" />
    <circle cx="160" cy="110" r="84" fill="#f37021" stroke="#fff2b2" strokeWidth="3" strokeDasharray="10 3" />
    {/* Radiant Sun rays */}
    <g stroke="#facc15" strokeWidth="6" strokeLinecap="round">
      <line x1="160" y1="8" x2="160" y2="28" />
      <line x1="160" y1="192" x2="160" y2="212" />
      <line x1="48" y1="110" x2="68" y2="110" />
      <line x1="252" y1="110" x2="272" y2="110" />
      <line x1="82" y1="36" x2="98" y2="52" />
      <line x1="222" y1="168" x2="238" y2="184" />
      <line x1="238" y1="36" x2="222" y2="52" />
      <line x1="98" y1="168" x2="82" y2="184" />
    </g>
    {/* Golden Sun Face */}
    <circle cx="150" cy="110" r="56" fill="#facc15" stroke="#231f20" strokeWidth="3" />
    {/* Blue Crescent Moon */}
    <path
      d="M170 56 A 54 54 0 1 1 170 164 A 42 42 0 1 0 170 56 Z"
      fill="#38bdf8"
      stroke="#231f20"
      strokeWidth="2.5"
    />
    {/* Eyes & smile */}
    <circle cx="132" cy="98" r="4.5" fill="#231f20" />
    <circle cx="162" cy="98" r="4.5" fill="#231f20" />
    <path d="M132 124 Q148 136 164 124" fill="none" stroke="#231f20" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
