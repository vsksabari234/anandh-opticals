import React from 'react';

export default function GlassesIllustration({
  shape = 'Rectangle',
  color = '#1e293b',
  lensColor = 'rgba(224, 242, 254, 0.4)',
  scale = 1,
  className = '',
  showReflection = true,
  interactive = false
}) {
  // SVG viewbox 300x120
  const renderFrameGeometry = () => {
    switch (shape) {
      case 'Aviator':
        return (
          <g>
            {/* Top Bar */}
            <path d="M 65 34 Q 150 26 235 34" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Bridge */}
            <path d="M 130 52 Q 150 48 170 52" stroke={color} strokeWidth="3.5" fill="none" />
            {/* Left Lens Teardrop */}
            <path
              d="M 60 40 C 95 38, 128 42, 130 55 C 132 82, 115 106, 85 106 C 58 106, 44 82, 48 58 C 50 46, 54 41, 60 40 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="4.5"
            />
            {/* Right Lens Teardrop */}
            <path
              d="M 240 40 C 205 38, 172 42, 170 55 C 168 82, 185 106, 215 106 C 242 106, 256 82, 252 58 C 250 46, 246 41, 240 40 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="4.5"
            />
            {/* Temples */}
            <path d="M 45 46 L 15 40" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 255 46 L 285 40" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case 'Cat-Eye':
        return (
          <g>
            {/* Bridge */}
            <path d="M 132 54 Q 150 48 168 54" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Left Eye with Wing */}
            <path
              d="M 36 34 C 70 34, 115 42, 132 54 C 130 84, 108 104, 78 104 C 48 104, 38 82, 42 62 C 40 48, 32 38, 36 34 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Right Eye with Wing */}
            <path
              d="M 264 34 C 230 34, 185 42, 168 54 C 170 84, 192 104, 222 104 C 252 104, 262 82, 258 62 C 260 48, 268 38, 264 34 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Wing Accents */}
            <circle cx="38" cy="38" r="2.5" fill="#f8fafc" />
            <circle cx="262" cy="38" r="2.5" fill="#f8fafc" />
            {/* Temples */}
            <path d="M 38 42 L 15 45" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 262 42 L 285 45" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
          </g>
        );

      case 'Round':
        return (
          <g>
            {/* Arched Bridge */}
            <path d="M 125 58 Q 150 44 175 58" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Left Round */}
            <circle cx="85" cy="64" r="42" fill={lensColor} stroke={color} strokeWidth="4.5" />
            {/* Right Round */}
            <circle cx="215" cy="64" r="42" fill={lensColor} stroke={color} strokeWidth="4.5" />
            {/* Temples */}
            <path d="M 43 64 L 15 60" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 257 64 L 285 60" stroke={color} strokeWidth="3" strokeLinecap="round" />
            {/* Nose pads */}
            <ellipse cx="132" cy="68" rx="2" ry="5" fill="#94a3b8" />
            <ellipse cx="168" cy="68" rx="2" ry="5" fill="#94a3b8" />
          </g>
        );

      case 'Geometric':
        return (
          <g>
            {/* Bridge */}
            <path d="M 130 56 Q 150 50 170 56" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Left Octagon */}
            <polygon
              points="60,38 110,38 132,60 126,92 98,105 65,103 44,82 46,55"
              fill={lensColor}
              stroke={color}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Right Octagon */}
            <polygon
              points="240,38 190,38 168,60 174,92 202,105 235,103 256,82 254,55"
              fill={lensColor}
              stroke={color}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Temples */}
            <path d="M 45 55 L 15 50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 255 55 L 285 50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case 'Wayfarer':
        return (
          <g>
            {/* Thick Bridge */}
            <path d="M 128 50 Q 150 44 172 50" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* Left Trapezoid */}
            <path
              d="M 46 36 L 130 42 C 129 70, 122 96, 96 98 C 66 100, 50 82, 48 54 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="8"
              strokeLinejoin="round"
            />
            {/* Right Trapezoid */}
            <path
              d="M 254 36 L 170 42 C 171 70, 178 96, 204 98 C 234 100, 250 82, 252 54 Z"
              fill={lensColor}
              stroke={color}
              strokeWidth="8"
              strokeLinejoin="round"
            />
            {/* Metal rivets */}
            <circle cx="50" cy="40" r="2.5" fill="#f8fafc" />
            <circle cx="250" cy="40" r="2.5" fill="#f8fafc" />
            {/* Temples */}
            <path d="M 45 42 L 15 44" stroke={color} strokeWidth="6" strokeLinecap="round" />
            <path d="M 255 42 L 285 44" stroke={color} strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'Rimless':
        return (
          <g>
            {/* Minimalist Bridge */}
            <path d="M 130 58 Q 150 48 170 58" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Left Floating Lens */}
            <rect
              x="50"
              y="40"
              width="80"
              height="55"
              rx="18"
              fill={lensColor}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.5"
            />
            {/* Right Floating Lens */}
            <rect
              x="170"
              y="40"
              width="80"
              height="55"
              rx="18"
              fill={lensColor}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.5"
            />
            {/* Direct Mount Pins */}
            <circle cx="128" cy="58" r="2.5" fill={color} />
            <circle cx="172" cy="58" r="2.5" fill={color} />
            <circle cx="52" cy="55" r="2.5" fill={color} />
            <circle cx="248" cy="55" r="2.5" fill={color} />
            {/* Sleek Temples */}
            <path d="M 52 55 L 15 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 248 55 L 285 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'Rectangle':
      default:
        return (
          <g>
            {/* Bridge */}
            <path d="M 128 54 Q 150 48 172 54" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Left Rectangle */}
            <rect
              x="45"
              y="38"
              width="82"
              height="58"
              rx="12"
              fill={lensColor}
              stroke={color}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Right Rectangle */}
            <rect
              x="173"
              y="38"
              width="82"
              height="58"
              rx="12"
              fill={lensColor}
              stroke={color}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Temples */}
            <path d="M 45 46 L 15 44" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 255 46 L 285 44" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${interactive ? 'hover:scale-105' : ''} ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        viewBox="0 0 300 120"
        className="w-full h-auto drop-shadow-md select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle optical blue reflection sheen */}
          <linearGradient id="lensReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {renderFrameGeometry()}

        {showReflection && (
          <g pointerEvents="none">
            {/* Diagonal optical flash reflection left */}
            <polygon points="65,42 90,42 75,90 50,90" fill="url(#lensReflect)" opacity="0.6" />
            {/* Diagonal optical flash reflection right */}
            <polygon points="190,42 215,42 200,90 175,90" fill="url(#lensReflect)" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
}
