import React, { useId } from 'react';

// The sidebar icon set, drawn on the original 200-unit grid (viewBox 18 18 164 164).
// Inlined rather than <img> so each part can be animated on hover — the gestures
// live in App.css under "Sidebar icon gestures".
//
// The silver gradient is one userSpaceOnUse ramp per icon. The old per-path
// (objectBoundingBox) ramp collapses to nothing on a perfectly vertical or
// horizontal stroke, which the animated parts would hit; a fixed ramp also
// stays put while a part moves through it.
function NavIconBase({ id, label, children }) {
  const grad = `nav-grad-${id}`;
  return (
    <svg
      className="nav-icon"
      viewBox="18 18 164 164"
      width={24}
      height={24}
      fill="none"
      stroke={`url(#${grad})`}
      strokeWidth={9}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="182">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="50%" stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#5a5a5a" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export const HomeIcon = () => (
  <NavIconBase id="home" label="Home">
    <path d="M40 100 L100 40 L160 100 L160 160 L40 160 Z" />
    {/* the door swings open on its left edge */}
    <path
      className="nav-icon-door"
      d="M80 160 L80 120 Q80 112 88 112 L112 112 Q120 112 120 120 L120 160"
    />
  </NavIconBase>
);

export const AboutIcon = () => (
  <NavIconBase id="about" label="About">
    <circle className="nav-icon-head" cx="100" cy="70" r="25" />
    <path className="nav-icon-body" d="M40 170 Q40 110 100 110 Q160 110 160 170" />
  </NavIconBase>
);

export const ProjectsIcon = () => (
  <NavIconBase id="projects" label="Projects">
    <path className="nav-icon-bracket-l" d="M64 55 L24 100 L64 145" />
    <path className="nav-icon-bracket-r" d="M136 55 L176 100 L136 145" />
    {/* the slash is symmetric about its centre, so a half turn lands on the drawing */}
    <path className="nav-icon-slash" d="M118 55 L82 145" />
  </NavIconBase>
);

export const SkillsIcon = () => (
  <NavIconBase id="skills" label="Skills">
    <g className="nav-icon-layer-bottom">
      <path strokeWidth={6} fill="rgba(20,20,20,0.55)" d="M100 170 L24 135 L100 100 L176 135 Z" />
    </g>
    <g className="nav-icon-layer-middle">
      <path strokeWidth={6} fill="rgba(25,25,25,0.65)" d="M100 135 L24 100 L100 65 L176 100 Z" />
    </g>
    <g className="nav-icon-layer-top">
      <path strokeWidth={6} fill="rgba(30,30,30,0.7)" d="M100 100 L24 65 L100 30 L176 65 Z" />
    </g>
  </NavIconBase>
);

export const ContactIcon = () => (
  <NavIconBase id="contact" label="Contact">
    <rect x="30" y="50" width="140" height="100" rx="10" />
    <path className="nav-icon-flap" d="M36 60 L100 120 L164 60" />
  </NavIconBase>
);

/* Mobile close control, shown in place of the desktop chevron. It is the
   hamburger's own three lines held in their "open" shape — the outer two
   crossed into an X, the middle one collapsed — and on hover or tap they relax
   back into the hamburger and cross again, with the whole icon turning a half
   turn on the way (an X lands on itself every 180 degrees). The lines are laid
   out as a hamburger and moved into the X by transform, so the keyframes in
   App.css only have to animate towards "no transform". */
export const BurgerIcon = () => {
  const gradientId = `burger-grad-${useId().replace(/:/g, '')}`;
  return (
    <svg
      className="toggle-burger"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={2}
      strokeLinecap="round"
      role="img"
      aria-label="Close navigation"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="3" y1="0" x2="21" y2="0">
          <stop offset="0%" stopColor="#777777" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <path className="burger-line burger-top" d="M5 7H19" />
      <path className="burger-line burger-mid" d="M5 12H19" />
      <path className="burger-line burger-bot" d="M5 17H19" />
    </svg>
  );
};
