/*
  EnvelopeAnimation — animated dark envelope app icon.
  Artwork: Figma master (envelope-static), animation layered on top.
  Timeline: 12s loop — flap opens quickly (~1s), holds, closes (~0.9s),
  envelope (only) dips down/up on close. 30s light sweep: full on the
  squircle bg, subtle pass over the envelope itself.

*/
import React from 'react';

export const EnvelopeAnimation = ({ width = 120, height = 120 }) => (
  <div style={{ display: 'inline-block', perspective: '900px', perspectiveOrigin: '50% 40%' }}>
    <style>{`
      @keyframes env-flapOpen {
        0%, 3% {
          transform: rotateX(0deg);
          animation-timing-function: cubic-bezier(0.5, 0, 0.2, 1);
        }
        12%, 21% {
          transform: rotateX(-172deg);
          animation-timing-function: cubic-bezier(0.6, 0, 0.25, 1);
        }
        30%, 100% { transform: rotateX(0deg); }
      }
      @keyframes env-drop {
        0%, 29%  { transform: translateY(0px); animation-timing-function: cubic-bezier(0.3, 0, 0.5, 1); }
        31%      { transform: translateY(9px);    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); }
        34.5%    { transform: translateY(-2.5px); animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); }
        39%, 100% { transform: translateY(0px); }
      }
      @keyframes env-glowPulse {
        0%, 5%    { opacity: 0; }
        13%, 20%  { opacity: 1; }
        29%, 100% { opacity: 0; }
      }
      @keyframes env-rimPulse {
        0%, 4%    { opacity: 0.55; }
        13%, 21%  { opacity: 1; }
        31%, 100% { opacity: 0.55; }
      }
      .env-envelope {
        animation: env-drop 12s linear infinite;
        will-change: transform;
      }
      .env-flap-group {
        transform-origin: 50% 0%;
        transform-box: fill-box;
        animation: env-flapOpen 12s linear infinite;
        will-change: transform;
      }
      .env-glow { animation: env-glowPulse 12s linear infinite; }
      .env-rim-pulse { animation: env-rimPulse 12s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .env-envelope, .env-flap-group, .env-glow, .env-rim-pulse { animation: none !important; }
        .env-sweep { display: none; }
      }
    `}</style>

    <svg viewBox="0 0 500 500" width={width} height={height} fill="none"
         xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', overflow: 'visible' }}>
      {/* ---- static squircle background ---- */}
      <g filter="url(#filter0_n_2071_3)">
<path d="M368 42H132C82.2944 42 42 82.2944 42 132V368C42 417.706 82.2944 458 132 458H368C417.706 458 458 417.706 458 368V132C458 82.2944 417.706 42 368 42Z" fill="#2E2E2E" fillOpacity="0.2"></path>
</g>
<path d="M368 42H132C82.2944 42 42 82.2944 42 132V368C42 417.706 82.2944 458 132 458H368C417.706 458 458 417.706 458 368V132C458 82.2944 417.706 42 368 42Z" fill="url(#paint0_radial_2071_3)"></path>

      {/* Light sweep — full strength, bg only (envelope draws over it) */}
      <g className="env-sweep" clipPath="url(#env-sqClip)" style={{ mixBlendMode: 'screen' }}>
        <rect x="-200" y="-200" width="900" height="900" fill="url(#env-sweepGrad)" transform="rotate(-50 250 250)">
          <animateTransform attributeName="transform" type="translate" values="-600 200; 180 -80; -600 200" keyTimes="0; 0.5; 1" calcMode="spline" keySplines="0.85 0 0.65 1; 0.45 0 0.55 1" dur="38s" repeatCount="indefinite" additive="sum"/>
        </rect>
      </g>

      {/* ---- envelope (dips down/up on close) ---- */}
      <g className="env-envelope" clipPath="url(#env-sqClip)">
      <path d="M108 153V296.337C108 322.304 130 341 158.5 341H336.5C367 341 389 322.823 389 296.337L392 153L250 259.983L108 153Z" fill="#1F1F1F" fillOpacity="0.74"></path>
<path d="M108 153V296.337C108 322.304 130 341 158.5 341H336.5C367 341 389 322.823 389 296.337L392 153L250 259.983L108 153Z" fill="url(#paint1_linear_2071_3)" fillOpacity="0.74"></path>
<mask id="mask0_2071_3" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="108" y="160" width="284" height="181">
<path d="M108 160V328C108 336.667 112 341 120 341H380C388 341 392 336.667 392 328V160L250 263L108 160Z" fill="white"></path>
</mask>
<g mask="url(#mask0_2071_3)">
<g opacity="0.9" filter="url(#filter1_f_2071_3)">
<path d="M258 263.8L434.1 281.1" stroke="url(#paint2_linear_2071_3)" strokeWidth="0.83" strokeLinecap="round"></path>
<path d="M257.7 265.2L428.2 312.8" stroke="url(#paint3_linear_2071_3)" strokeWidth="0.88" strokeLinecap="round"></path>
<path d="M257.2 266.5L416.8 343" stroke="url(#paint4_linear_2071_3)" strokeWidth="0.93" strokeLinecap="round"></path>
<path d="M256.5 267.7L400.4 370.7" stroke="url(#paint5_linear_2071_3)" strokeWidth="0.97" strokeLinecap="round"></path>
<path d="M255.6 268.7L379.4 395.2" stroke="url(#paint6_linear_2071_3)" strokeWidth="1.01" strokeLinecap="round"></path>
<path d="M254.5 269.6L354.5 415.7" stroke="url(#paint7_linear_2071_3)" strokeWidth="1.05" strokeLinecap="round"></path>
<path d="M253.3 270.3L326.4 431.5" stroke="url(#paint8_linear_2071_3)" strokeWidth="1.07" strokeLinecap="round"></path>
<path d="M252 270.7L296 442.2" stroke="url(#paint9_linear_2071_3)" strokeWidth="1.09" strokeLinecap="round"></path>
<path d="M250.6 271L264.1 447.5" stroke="url(#paint10_linear_2071_3)" strokeWidth="1.1" strokeLinecap="round"></path>
<path d="M249.2 271L231.9 447.1" stroke="url(#paint11_linear_2071_3)" strokeWidth="1.1" strokeLinecap="round"></path>
<path d="M247.8 270.7L200.2 441.2" stroke="url(#paint12_linear_2071_3)" strokeWidth="1.09" strokeLinecap="round"></path>
<path d="M246.5 270.2L170 429.8" stroke="url(#paint13_linear_2071_3)" strokeWidth="1.07" strokeLinecap="round"></path>
<path d="M245.3 269.5L142.3 413.4" stroke="url(#paint14_linear_2071_3)" strokeWidth="1.04" strokeLinecap="round"></path>
<path d="M244.3 268.6L117.8 392.4" stroke="url(#paint15_linear_2071_3)" strokeWidth="1.01" strokeLinecap="round"></path>
<path d="M243.4 267.5L97.3 367.5" stroke="url(#paint16_linear_2071_3)" strokeWidth="0.97" strokeLinecap="round"></path>
<path d="M242.7 266.3L81.5 339.4" stroke="url(#paint17_linear_2071_3)" strokeWidth="0.92" strokeLinecap="round"></path>
<path d="M242.3 265L70.8 309" stroke="url(#paint18_linear_2071_3)" strokeWidth="0.87" strokeLinecap="round"></path>
<path d="M242 263.6L65.5 277.1" stroke="url(#paint19_linear_2071_3)" strokeWidth="0.82" strokeLinecap="round"></path>
<path d="M242 262.2L65.9 244.9" stroke="url(#paint20_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M242.3 260.8L71.8 213.2" stroke="url(#paint21_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M242.8 259.5L83.2 183" stroke="url(#paint22_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M256.6 258.5L402.7 158.5" stroke="url(#paint23_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M257.3 259.7L418.5 186.6" stroke="url(#paint24_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M257.7 261L429.2 217" stroke="url(#paint25_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
<path d="M258 262.4L434.5 248.9" stroke="url(#paint26_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
</g>
</g>
<path d="M108 153V296.337C108 322.304 130 341 158.5 341H336.5C367 341 389 322.823 389 296.337L392 153L250 259.983L108 153Z" stroke="#07070A" strokeWidth="17" strokeLinejoin="round"></path>
<g filter="url(#filter2_f_2071_3)">
<path d="M100 155V297" stroke="#EBFFF8" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter3_f_2071_3)">
<path d="M100 157V299" stroke="#EBFFF8" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter4_f_2071_3)">
<path d="M400 154L398 298" stroke="#EBFFF8" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter5_f_2071_3)">
<path d="M100.089 297.913C98.8474 309.66 108.349 344.669 154.5 349" stroke="#048E5E" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter6_f_2071_3)">
<path d="M100.089 297.913C100.089 310 107.5 328 121 337" stroke="#D3D7D6" strokeOpacity="0.54" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter7_f_2071_3)">
<path d="M121 337.5C132.545 346 149.5 349 158 349" stroke="#18BD83" strokeOpacity="0.36" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter8_f_2071_3)">
<path d="M397.892 298.713C399.086 310.51 389.379 345.728 343 350.292" stroke="#048E5E" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter9_f_2071_3)">
<path d="M400 156L398 302" stroke="#00D28C" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter10_f_2071_3)">
<path d="M155 349L343 350" stroke="#00DD93" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"></path>
</g>
<g filter="url(#filter11_f_2071_3)">
<path d="M155 349L343 350" stroke="#062B1F" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round"></path>
</g>
      {/* interior revealed when the flap opens */}
      <path d="M108 151H392L250 263L108 151Z" fill="#0B100E"></path>
      <path d="M108 151H392L250 263L108 151Z" stroke="#0A0A0A" strokeWidth="17" strokeLinejoin="round"></path>
      <ellipse className="env-glow" cx="250" cy="198" rx="115" ry="52" opacity="0" fill="url(#env-glowGrad)" filter="url(#env-glowBlur)"></ellipse>
      <g filter="url(#filter12_f_2071_3)">
<path d="M110 152L250 263" stroke="#E1FFF5" strokeOpacity="0.45" strokeWidth="1.1" strokeLinecap="round"></path>
</g>
<g filter="url(#filter13_f_2071_3)">
<path d="M390 152L250 263" stroke="white" strokeOpacity="0.2" strokeWidth="0.9" strokeLinecap="round"></path>
</g>
      {/* animated flap */}
      <g className="env-flap-group">
      <path d="M108 151H392L250 263L108 151Z" fill="#262626" fillOpacity="0.5"></path>
<g opacity="0.9" filter="url(#filter14_f_2071_3)">
<path d="M244.4 257.3L154.5 155M245.5 256.4L177.5 156M246.7 255.7L199.5 155.5M248 255.3L221.5 156.5M249.4 255L240.5 154M250.8 255L260 160M252.2 255.3L280.5 156M253.5 255.8L304.5 153.5M254.7 256.5L329 153.5M255.7 257.4L356 153.5" stroke="url(#paint27_linear_2071_3)" strokeWidth="0.8" strokeLinecap="round"></path>
</g>
<g filter="url(#filter15_f_2071_3)">
<path d="M100 156L250 273" stroke="#F0FFFA" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round"></path>
</g>
<g filter="url(#filter16_f_2071_3)">
<path d="M135 160L250 250" stroke="#F0FFFA" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round"></path>
</g>
<g filter="url(#filter17_f_2071_3)">
<path d="M138 160L364 161" stroke="#F0FFFA" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round"></path>
</g>
<g filter="url(#filter18_f_2071_3)">
<path d="M367 160L252 250" stroke="#F0FFFA" strokeOpacity="0.33" strokeWidth="3" strokeLinecap="round"></path>
</g>
<g filter="url(#filter19_f_2071_3)">
<path d="M400 156L250 273" stroke="white" strokeOpacity="0.37" strokeWidth="0.9" strokeLinecap="round"></path>
</g>
<g filter="url(#filter20_f_2071_3)">
<path d="M130 160L315 161" stroke="url(#paint28_linear_2071_3)" strokeOpacity="0.36" strokeWidth="2" strokeLinecap="round"></path>
</g>
<path d="M108 151H392L250 263L108 151Z" stroke="#0A0A0A" strokeWidth="17" strokeLinejoin="round"></path>
      </g>
      <g filter="url(#filter21_f_2071_3)">
<path d="M111 143L389.999 142.864" stroke="#F0FFFA" strokeOpacity="0.23" strokeWidth="2" strokeLinecap="round"></path>
</g>
<g filter="url(#filter22_f_2071_3)">
<path d="M109.5 143C100.5 143 96.5 150 101.5 157.5" stroke="#D5D5D5" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
<g filter="url(#filter23_f_2071_3)">
<path d="M391.031 142.881C399.365 143.032 403.504 150.644 399 157.5" stroke="#D5D5D5" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round"></path>
</g>
      {/* subtle sweep pass over the envelope */}
      <g className="env-sweep" mask="url(#env-envMask)" style={{ mixBlendMode: 'screen' }}>
        <rect x="-200" y="-200" width="900" height="900" fill="url(#env-sweepGradSubtle)" transform="rotate(-50 250 250)">
          <animateTransform attributeName="transform" type="translate" values="-600 200; 180 -80; -600 200" keyTimes="0; 0.5; 1" calcMode="spline" keySplines="0.85 0 0.65 1; 0.45 0 0.55 1" dur="38s" repeatCount="indefinite" additive="sum"/>
        </rect>
      </g>
      </g>

      {/* ---- static rim / floor glow ---- */}
      <mask id="mask1_2071_3" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="42" y="42" width="416" height="416">
<path d="M368 42H132C82.2944 42 42 82.2944 42 132V368C42 417.706 82.2944 458 132 458H368C417.706 458 458 417.706 458 368V132C458 82.2944 417.706 42 368 42Z" fill="white"></path>
</mask>
<g mask="url(#mask1_2071_3)">
<path opacity="0.85" d="M250 484C352.173 484 435 468.778 435 450C435 431.222 352.173 416 250 416C147.827 416 65 431.222 65 450C65 468.778 147.827 484 250 484Z" fill="url(#paint29_radial_2071_3)" fillOpacity="0.5"></path>
</g>
<g className="env-rim-pulse" opacity="0.85" filter="url(#filter24_f_2071_3)">
<path d="M368 42H132C82.2944 42 42 82.2944 42 132V368C42 417.706 82.2944 458 132 458H368C417.706 458 458 417.706 458 368V132C458 82.2944 417.706 42 368 42Z" stroke="url(#paint30_linear_2071_3)" strokeWidth="3"></path>
</g>
<path d="M132 44H368C416.601 44 456 83.3989 456 132V368C456 416.601 416.601 456 368 456H132C83.3989 456 44 416.601 44 368V132C44 83.3989 83.3989 44 132 44Z" stroke="url(#paint31_linear_2071_3)" strokeWidth="2"></path>
<path d="M368 44H132C83.3989 44 44 83.3989 44 132V368C44 416.601 83.3989 456 132 456H368C416.601 456 456 416.601 456 368V132C456 83.3989 416.601 44 368 44Z" stroke="url(#paint32_linear_2071_3)" strokeWidth="2"></path>
      <defs>
<filter id="filter0_n_2071_3" x="42" y="42" width="416" height="416" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feTurbulence type="fractalNoise" baseFrequency="1.3333333730697632 1.3333333730697632" stitchTiles="stitch" numOctaves="3" result="noise" seed="9298"></feTurbulence>
<feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"></feColorMatrix>
<feComponentTransfer in="alphaNoise" result="coloredNoise1">
<feFuncA type="discrete" tableValues="0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "></feFuncA>
</feComponentTransfer>
<feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"></feComposite>
<feComponentTransfer in="alphaNoise" result="coloredNoise2">
<feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 "></feFuncA>
</feComponentTransfer>
<feComposite operator="in" in2="shape" in="coloredNoise2" result="noise2Clipped"></feComposite>
<feFlood floodColor="rgba(5, 53, 26, 0.55)" result="color1Flood"></feFlood>
<feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"></feComposite>
<feFlood floodColor="rgba(255, 255, 255, 0.25)" result="color2Flood"></feFlood>
<feComposite operator="in" in2="noise2Clipped" in="color2Flood" result="color2"></feComposite>
<feMerge result="effect1_noise_2071_3">
<feMergeNode in="shape"></feMergeNode>
<feMergeNode in="color1"></feMergeNode>
<feMergeNode in="color2"></feMergeNode>
</feMerge>
</filter>
<filter id="filter1_f_2071_3" x="63.59" y="156.6" width="372.81" height="292.95" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter2_f_2071_3" x="97.3" y="152.3" width="5.39999" height="147.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter3_f_2071_3" x="97.3" y="154.3" width="5.39999" height="147.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter4_f_2071_3" x="395.3" y="151.3" width="7.40001" height="149.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter5_f_2071_3" x="97.2863" y="295.213" width="59.9138" height="56.4875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter6_f_2071_3" x="96.3893" y="294.213" width="28.3107" height="46.4874" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter7_f_2071_3" x="117.3" y="333.8" width="44.4" height="18.9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter8_f_2071_3" x="340.3" y="296.013" width="60.3863" height="56.9795" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter9_f_2071_3" x="394.3" y="152.3" width="9.40001" height="153.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter10_f_2071_3" x="152" y="346" width="194" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter11_f_2071_3" x="152" y="346" width="194" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter12_f_2071_3" x="106.45" y="148.45" width="147.1" height="118.1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter13_f_2071_3" x="246.55" y="148.55" width="146.9" height="117.9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter14_f_2071_3" x="152.6" y="151.6" width="205.3" height="107.7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter15_f_2071_3" x="96" y="152" width="158" height="125" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter16_f_2071_3" x="131" y="156" width="123" height="98.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter17_f_2071_3" x="134" y="156" width="234" height="9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter18_f_2071_3" x="230.5" y="138.5" width="158" height="133" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter19_f_2071_3" x="246.55" y="152.55" width="156.9" height="123.9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter20_f_2071_3" x="126" y="156" width="193" height="9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter21_f_2071_3" x="108" y="139.864" width="284.999" height="6.13617" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter22_f_2071_3" x="96.6213" y="140.3" width="15.5787" height="19.9001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter23_f_2071_3" x="388.331" y="140.181" width="15.2179" height="20.0193" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<filter id="filter24_f_2071_3" x="34.5" y="34.5" width="431" height="431" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_2071_3"></feGaussianBlur>
</filter>
<radialGradient id="paint0_radial_2071_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 250) scale(299.52)">
<stop stopOpacity="0"></stop>
<stop offset="0.66" stopOpacity="0"></stop>
<stop offset="1" stopOpacity="0.55"></stop>
</radialGradient>
<linearGradient id="paint1_linear_2071_3" x1="250.239" y1="269.667" x2="183.5" y2="353" gradientUnits="userSpaceOnUse">
<stop offset="0.110577" stopColor="#152015" stopOpacity="0.15"></stop>
<stop offset="0.403846" stopColor="#DADADA" stopOpacity="0.1"></stop>
<stop offset="0.658654" stopColor="#BCBCBC" stopOpacity="0.1"></stop>
<stop offset="0.9375" stopColor="#162415" stopOpacity="0.15"></stop>
</linearGradient>
<linearGradient id="paint2_linear_2071_3" x1="258" y1="263.8" x2="434.1" y2="281.1" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.134"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.4"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.04"></stop>
</linearGradient>
<linearGradient id="paint3_linear_2071_3" x1="257.7" y1="265.2" x2="428.2" y2="312.8" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.158"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.047"></stop>
</linearGradient>
<linearGradient id="paint4_linear_2071_3" x1="257.2" y1="266.5" x2="416.8" y2="343" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.181"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.054"></stop>
</linearGradient>
<linearGradient id="paint5_linear_2071_3" x1="256.5" y1="267.7" x2="400.4" y2="370.7" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.202"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.06"></stop>
</linearGradient>
<linearGradient id="paint6_linear_2071_3" x1="255.6" y1="268.7" x2="379.4" y2="395.2" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.22"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.066"></stop>
</linearGradient>
<linearGradient id="paint7_linear_2071_3" x1="254.5" y1="269.6" x2="354.5" y2="415.7" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.236"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.071"></stop>
</linearGradient>
<linearGradient id="paint8_linear_2071_3" x1="253.3" y1="270.3" x2="326.4" y2="431.5" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.248"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.074"></stop>
</linearGradient>
<linearGradient id="paint9_linear_2071_3" x1="252" y1="270.7" x2="296" y2="442.2" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.256"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.077"></stop>
</linearGradient>
<linearGradient id="paint10_linear_2071_3" x1="250.6" y1="271" x2="264.1" y2="447.5" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.26"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.078"></stop>
</linearGradient>
<linearGradient id="paint11_linear_2071_3" x1="249.2" y1="271" x2="231.9" y2="447.1" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.259"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.078"></stop>
</linearGradient>
<linearGradient id="paint12_linear_2071_3" x1="247.8" y1="270.7" x2="200.2" y2="441.2" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.255"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.076"></stop>
</linearGradient>
<linearGradient id="paint13_linear_2071_3" x1="246.5" y1="270.2" x2="170" y2="429.8" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.246"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.074"></stop>
</linearGradient>
<linearGradient id="paint14_linear_2071_3" x1="245.3" y1="269.5" x2="142.3" y2="413.4" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.234"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.07"></stop>
</linearGradient>
<linearGradient id="paint15_linear_2071_3" x1="244.3" y1="268.6" x2="117.8" y2="392.4" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.218"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.065"></stop>
</linearGradient>
<linearGradient id="paint16_linear_2071_3" x1="243.4" y1="267.5" x2="97.3" y2="367.5" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.199"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.06"></stop>
</linearGradient>
<linearGradient id="paint17_linear_2071_3" x1="242.7" y1="266.3" x2="81.5" y2="339.4" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.178"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.053"></stop>
</linearGradient>
<linearGradient id="paint18_linear_2071_3" x1="242.3" y1="265" x2="70.8" y2="309" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.155"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.046"></stop>
</linearGradient>
<linearGradient id="paint19_linear_2071_3" x1="242" y1="263.6" x2="65.5" y2="277.1" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.131"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.039"></stop>
</linearGradient>
<linearGradient id="paint20_linear_2071_3" x1="242" y1="262.2" x2="65.9" y2="244.9" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.35"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint21_linear_2071_3" x1="242.3" y1="260.8" x2="71.8" y2="213.2" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.3"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint22_linear_2071_3" x1="242.8" y1="259.5" x2="83.2" y2="183" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.25"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint23_linear_2071_3" x1="256.6" y1="258.5" x2="402.7" y2="158.5" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.102"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint24_linear_2071_3" x1="257.3" y1="259.7" x2="418.5" y2="186.6" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.2"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint25_linear_2071_3" x1="257.7" y1="261" x2="429.2" y2="217" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.25"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint26_linear_2071_3" x1="258" y1="262.4" x2="434.5" y2="248.9" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.3"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint27_linear_2071_3" x1="255.7" y1="257.4" x2="382.2" y2="133.6" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478" stopOpacity="0.12"></stop>
<stop offset="0.55" stopColor="#00B478" stopOpacity="0.25"></stop>
<stop offset="1" stopColor="#00B478" stopOpacity="0.036"></stop>
</linearGradient>
<linearGradient id="paint28_linear_2071_3" x1="130" y1="160.5" x2="315" y2="160.5" gradientUnits="userSpaceOnUse">
<stop stopColor="#00B478"></stop>
<stop offset="1" stopColor="#004E34"></stop>
</linearGradient>
<radialGradient id="paint29_radial_2071_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 450) scale(185 34)">
<stop stopColor="#00BE7D" stopOpacity="0.24"></stop>
<stop offset="1" stopColor="#00BE7D" stopOpacity="0"></stop>
</radialGradient>
<linearGradient id="paint30_linear_2071_3" x1="42" y1="42" x2="42" y2="458" gradientUnits="userSpaceOnUse">
<stop stopOpacity="0"></stop>
<stop offset="0.76" stopOpacity="0"></stop>
<stop offset="0.88" stopColor="#00AF73" stopOpacity="0.3"></stop>
<stop offset="0.95" stopColor="#00AA6E" stopOpacity="0.62"></stop>
<stop offset="1" stopColor="#00A569" stopOpacity="0.92"></stop>
</linearGradient>
<linearGradient id="paint31_linear_2071_3" x1="433" y1="31" x2="44" y2="456" gradientUnits="userSpaceOnUse">
<stop stopColor="white" stopOpacity="0.75"></stop>
<stop offset="0.3" stopColor="white" stopOpacity="0"></stop>
<stop offset="0.649038" stopColor="white" stopOpacity="0"></stop>
<stop offset="1" stopColor="white" stopOpacity="0"></stop>
</linearGradient>
<linearGradient id="paint32_linear_2071_3" x1="44" y1="44" x2="456" y2="456" gradientUnits="userSpaceOnUse">
<stop stopColor="white" stopOpacity="0.1"></stop>
<stop offset="0.3" stopColor="white" stopOpacity="0.05"></stop>
<stop offset="0.55" stopColor="white" stopOpacity="0"></stop>
<stop offset="1" stopColor="white" stopOpacity="0"></stop>
</linearGradient>
<radialGradient id="env-glowGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 198) scale(115 52)">
<stop stopColor="#00BE7D" stopOpacity="0.38"></stop>
<stop offset="0.6" stopColor="#00BE7D" stopOpacity="0.14"></stop>
<stop offset="1" stopColor="#00BE7D" stopOpacity="0"></stop>
</radialGradient>
<filter id="env-glowBlur" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
<feGaussianBlur stdDeviation="10"></feGaussianBlur>
</filter>
<linearGradient id="env-sweepGrad" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stopColor="white" stopOpacity="0"></stop>
<stop offset="0.38" stopColor="white" stopOpacity="0.06"></stop>
<stop offset="0.5" stopColor="white" stopOpacity="0.14"></stop>
<stop offset="0.62" stopColor="white" stopOpacity="0.06"></stop>
<stop offset="1" stopColor="white" stopOpacity="0"></stop>
</linearGradient>
<linearGradient id="env-sweepGradSubtle" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stopColor="white" stopOpacity="0"></stop>
<stop offset="0.38" stopColor="white" stopOpacity="0.02"></stop>
<stop offset="0.5" stopColor="white" stopOpacity="0.05"></stop>
<stop offset="0.62" stopColor="white" stopOpacity="0.02"></stop>
<stop offset="1" stopColor="white" stopOpacity="0"></stop>
</linearGradient>
<clipPath id="env-sqClip">
<path d="M368 42H132C82.2944 42 42 82.2944 42 132V368C42 417.706 82.2944 458 132 458H368C417.706 458 458 417.706 458 368V132C458 82.2944 417.706 42 368 42Z"></path>
</clipPath>
<mask id="env-envMask" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
<rect x="0" y="0" width="500" height="500" fill="black"></rect>
<path d="M108 153V296.337C108 322.304 130 341 158.5 341H336.5C367 341 389 322.823 389 296.337L392 153L250 259.983L108 153Z" fill="white" stroke="white" strokeWidth="17" strokeLinejoin="round"></path>
<path d="M108 151H392L250 263L108 151Z" fill="white" stroke="white" strokeWidth="17" strokeLinejoin="round"></path>
</mask>
</defs>
    </svg>
  </div>
);
