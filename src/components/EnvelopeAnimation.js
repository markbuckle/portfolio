import React from 'react';

export const EnvelopeAnimation = ({ width = 120, height = 120 }) => (
  <div style={{ display: 'inline-block', perspective: '900px', perspectiveOrigin: '50% 40%' }}>
    <style>{`
      @keyframes env-nudge {
        0%, 45%   { transform: translateY(0px); }
        47%        { transform: translateY(8px);    animation-timing-function: cubic-bezier(0.15,0.85,0.35,1); }
        53%        { transform: translateY(-2.5px); animation-timing-function: cubic-bezier(0.4,0,0.6,1); }
        60%, 100%  { transform: translateY(0px); }
      }
      @keyframes env-flapOpen {
        0%, 3% {
          transform: rotateX(0deg);
          animation-timing-function: cubic-bezier(0.45, 0, 0.25, 1);
        }
        22%, 36% {
          transform: rotateX(-172deg);
          animation-timing-function: cubic-bezier(0.65, 0, 0.15, 1.1);
        }
        49%, 100% { transform: rotateX(0deg); }
      }
      @keyframes env-rimPulse {
        0%, 4%   { opacity: 0.55; }
        25%, 36% { opacity: 1.0;  }
        49%      { opacity: 0.55; }
        100%     { opacity: 0.55; }
      }
      .env-icon-wrapper {
        animation: env-nudge 12s linear infinite;
        will-change: transform;
      }
      .env-flap-group {
        transform-origin: 50% 0%;
        transform-box: fill-box;
        animation: env-flapOpen 12s linear infinite;
        will-change: transform;
      }
      .env-rim-glow {
        animation: env-rimPulse 12s ease-in-out infinite;
      }
    `}</style>

    <div className="env-icon-wrapper">
      <svg viewBox="0 0 500 500" width={width} height={height}
           xmlns="http://www.w3.org/2000/svg"
           style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="env-grain" x="-5%" y="-5%" width="110%" height="110%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" seed="5" result="noise"/>
            <feColorMatrix type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.20 0"
              in="noise" result="tinted"/>
            <feBlend in="SourceGraphic" in2="tinted" mode="multiply" result="grained"/>
            <feComposite in="grained" in2="SourceGraphic" operator="in"/>
          </filter>

          <filter id="env-whiteGlow" x="-80%" y="-80%" width="260%" height="260%"
                  colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"  result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"  result="b2"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b3"/>
            <feMerge>
              <feMergeNode in="b3"/>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="env-specGlow" x="-50%" y="-50%" width="200%" height="200%"
                  colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5"   result="b2"/>
            <feMerge>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="env-squircleBase" cx="50%" cy="28%" r="72%" fx="50%" fy="8%">
            <stop offset="0%"   stopColor="#272727"/>
            <stop offset="35%"  stopColor="#141414"/>
            <stop offset="100%" stopColor="#060606"/>
          </radialGradient>

          <linearGradient id="env-topSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.055)"/>
            <stop offset="25%"  stopColor="rgba(255,255,255,0.018)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </linearGradient>

          <linearGradient id="env-bottomRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="transparent"/>
            <stop offset="80%"  stopColor="transparent"/>
            <stop offset="90%"  stopColor="rgba(0,170,110,0.20)"/>
            <stop offset="96%"  stopColor="rgba(0,165,105,0.50)"/>
            <stop offset="100%" stopColor="rgba(0,160,100,0.72)"/>
          </linearGradient>

          <linearGradient id="env-sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="transparent"/>
            <stop offset="40%"  stopColor="rgba(255,255,255,0.045)"/>
            <stop offset="50%"  stopColor="rgba(255, 255, 255, 0.1)"/>
            <stop offset="60%"  stopColor="rgba(255,255,255,0.045)"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>

<clipPath id="env-squircleClip">
            <rect x="42" y="42" width="416" height="416" rx="90"/>
          </clipPath>

          <mask id="env-frameMask">
            <rect x="42" y="42" width="416" height="416" rx="90" fill="white"/>
            <rect x="104" y="152" width="294" height="197" rx="18" fill="black"/>
          </mask>

          <clipPath id="env-interiorClip">
            <rect x="108" y="160" width="284" height="181" rx="10"/>
          </clipPath>
        </defs>

        {/* Squircle background */}
        <rect x="42" y="42" width="416" height="416" rx="90"
              fill="url(#env-squircleBase)" filter="url(#env-grain)"/>
        <rect x="42" y="42" width="416" height="416" rx="90"
              fill="url(#env-topSheen)"/>
        <rect x="42" y="42" width="416" height="416" rx="90"
              fill="none" stroke="#000" strokeWidth="12" opacity="0.72"
              clipPath="url(#env-squircleClip)"/>
        <rect x="43" y="43" width="414" height="414" rx="89"
              fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.2"/>

        {/* Inset cavity */}
        <rect x="104" y="152" width="294" height="197" rx="18"
              fill="#0f0f0f" filter="url(#env-grain)"/>
        <rect x="104" y="152" width="294" height="197" rx="16"
              fill="none" stroke="#202020" strokeWidth="1" opacity="0.75"/>

        {/* Envelope interior */}
        <g clipPath="url(#env-interiorClip)">
          <rect x="108" y="160" width="284" height="181" fill="#070707"/>
          <rect x="108" y="160" width="284" height="181" rx="10"
                fill="none" stroke="#000" strokeWidth="7" opacity="0.80"/>
        </g>

        {/* Envelope lower body */}
        <g filter="url(#env-grain)">
          <path d="M 108,160 L 108,328 Q 108,341 120,341 L 380,341 Q 392,341 392,328 L 392,160 L 250,263 Z"
                fill="#0d0d0d" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
        </g>

        {/* Specular lines */}
        <line x1="390" y1="162" x2="390" y2="327"
              stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round"
              filter="url(#env-specGlow)"/>
        <line x1="110" y1="162" x2="250" y2="263"
              stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" strokeLinecap="round"
              filter="url(#env-specGlow)"/>
        <line x1="390" y1="162" x2="250" y2="263"
              stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" strokeLinecap="round"
              filter="url(#env-specGlow)"/>

        {/* Animated flap */}
        <g className="env-flap-group">
          <g filter="url(#env-grain)">
            <path d="M 108,160 L 392,160 L 250,263 Z"
                  fill="#111" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
          </g>
          <line x1="110" y1="161" x2="390" y2="161"
                stroke="rgba(180,180,180,0.45)" strokeWidth="1.2" strokeLinecap="round"
                filter="url(#env-whiteGlow)"/>
          <line x1="110" y1="161" x2="390" y2="161"
                stroke="rgba(180,180,180,0.55)" strokeWidth="0.5" strokeLinecap="round"/>
          <line x1="111" y1="162" x2="250" y2="262"
                stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" strokeLinecap="round"
                filter="url(#env-specGlow)"/>
          <line x1="389" y1="162" x2="250" y2="262"
                stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" strokeLinecap="round"
                filter="url(#env-specGlow)"/>
        </g>

        {/* Light sweep */}
        <g mask="url(#env-frameMask)" style={{ mixBlendMode: 'screen' }}>
          <rect x="-200" y="-200" width="900" height="900"
                fill="url(#env-sweepGrad)"
                transform="rotate(-35 250 250)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-600 200; 180 -80; -600 200"
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              dur="30s"
              repeatCount="indefinite"
              additive="sum"/>
          </rect>
        </g>

        {/* Squircle rim overlay */}
        <rect x="42" y="42" width="416" height="416" rx="90"
              fill="none" stroke="url(#env-bottomRim)" strokeWidth="2.5"
              filter="url(#env-whiteGlow)" className="env-rim-glow"/>
        <rect x="44" y="44" width="412" height="412" rx="88"
              fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
      </svg>
    </div>
  </div>
);
