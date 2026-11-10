import React from 'react';

interface TornPaperEdgeProps {
  position: 'top' | 'bottom';
  fill?: string;
  className?: string;
}

/**
 * Renders an organic hand-torn paper edge SVG mask that transitions smoothly
 * between coastal photography banners and the warm parchment (#f5ecd9) body.
 */
export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position,
  fill = '#f5ecd9',
  className = '',
}) => {
  if (position === 'top') {
    // Sits at the bottom of a photo banner so the parchment rises organically into the photo
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
          className="w-full h-7 sm:h-10 lg:h-12 block"
        >
          {/* Subtle warm shadow right above the paper tear */}
          <path
            d="M0,26 L48,20 L105,29 L168,18 L235,25 L310,14 L388,24 L462,15 L538,27 L612,17 L695,25 L770,13 L848,24 L922,16 L1004,27 L1085,18 L1160,26 L1242,15 L1318,24 L1388,17 L1440,23 L1440,54 L0,54 Z"
            fill="rgba(25, 18, 10, 0.28)"
          />
          {/* Main parchment tear */}
          <path
            d="M0,32 L48,25 L105,34 L168,23 L235,30 L310,19 L388,29 L462,20 L538,32 L612,22 L695,30 L770,18 L848,29 L922,21 L1004,32 L1085,23 L1160,31 L1242,20 L1318,29 L1388,22 L1440,28 L1440,54 L0,54 Z"
            fill={fill}
          />
        </svg>
      </div>
    );
  }

  // Sits at the top of a photo banner so the parchment hangs down organically over the photo top
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 54"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-10 lg:h-12 block"
      >
        <path
          d="M0,0 L1440,0 L1440,28 L1382,35 L1310,24 L1235,34 L1152,22 L1075,33 L996,21 L915,31 L838,19 L760,32 L682,21 L604,33 L525,20 L448,31 L370,19 L292,32 L215,22 L138,33 L64,23 L0,30 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};
