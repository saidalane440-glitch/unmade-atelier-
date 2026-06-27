type CoverKey = "ceramics" | "fold" | "atrium" | "mira" | "field" | "halen";

type Props = {
  variant: CoverKey;
  className?: string;
};

// Stylised SVG cover art per project. Pure CSS/SVG, no external assets.
export default function ProjectArt({ variant, className = "" }: Props) {
  switch (variant) {
    case "ceramics":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#efe7d4" />
              <stop offset="100%" stopColor="#c9b89a" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#g1)" />
          <ellipse cx="220" cy="320" rx="170" ry="22" fill="#9d8a6b" opacity="0.35" />
          <path d="M120 320 Q120 140 220 140 Q320 140 320 320 Z" fill="#8a6f4f" />
          <path d="M150 320 Q150 170 220 170 Q290 170 290 320 Z" fill="#b89673" />
          <ellipse cx="220" cy="170" rx="70" ry="14" fill="#5a4730" />
          <circle cx="430" cy="200" r="80" fill="#d6c4a6" />
          <circle cx="430" cy="200" r="62" fill="#a08560" />
          <text x="60" y="60" fontFamily="Fraunces, serif" fontWeight="900" fontSize="22" fill="#3a2f20">
            NORSE
          </text>
          <text x="60" y="84" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="3" fill="#3a2f20">
            CERAMICS · MMXXV
          </text>
        </svg>
      );
    case "fold":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="400" fill="#0a0a0a" />
          <g stroke="#fafaf7" strokeWidth="1" opacity="0.18">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="400" />
            ))}
          </g>
          <rect x="180" y="90" width="240" height="220" fill="#fafaf7" />
          <rect x="180" y="90" width="240" height="40" fill="#ff5b1f" />
          <text x="200" y="118" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#fafaf7" letterSpacing="4">
            FOLD / 01
          </text>
          <text x="200" y="200" fontFamily="Fraunces, serif" fontWeight="900" fontSize="42" fill="#0a0a0a">
            Modular
          </text>
          <text x="200" y="246" fontFamily="Fraunces, serif" fontWeight="900" fontSize="42" fill="#0a0a0a">
            Carry System
          </text>
          <line x1="200" y1="278" x2="400" y2="278" stroke="#0a0a0a" strokeWidth="1" />
          <text x="200" y="296" fontFamily="Inter, sans-serif" fontSize="11" fill="#0a0a0a" letterSpacing="2">
            SHIPS FLAT · BUILDS IN 30S
          </text>
        </svg>
      );
    case "atrium":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f3a5f" />
              <stop offset="100%" stopColor="#0a1828" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#g3)" />
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={40 + col * 38}
                y={60 + row * 36}
                width="30"
                height="26"
                fill={(row + col) % 5 === 0 ? "#ff5b1f" : "#fafaf7"}
                opacity={(row + col) % 3 === 0 ? 0.95 : 0.18}
              />
            ))
          )}
          <rect x="40" y="60" width="520" height="288" fill="none" stroke="#fafaf7" strokeWidth="0.6" opacity="0.4" />
          <text x="40" y="40" fontFamily="Fraunces, serif" fontWeight="600" fontStyle="italic" fontSize="16" fill="#fafaf7">
            Atrium
          </text>
          <text x="540" y="40" fontFamily="Inter, sans-serif" fontSize="10" fill="#fafaf7" letterSpacing="3">
            EST 2014
          </text>
        </svg>
      );
    case "mira":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="400" fill="#f3f1ea" />
          <ellipse cx="300" cy="220" rx="120" ry="170" fill="#dfe2d4" />
          <ellipse cx="300" cy="220" rx="120" ry="170" fill="none" stroke="#7c8a6b" strokeWidth="1" />
          <rect x="240" y="110" width="120" height="40" fill="#fafaf7" />
          <text x="260" y="138" fontFamily="Fraunces, serif" fontWeight="600" fontSize="22" fill="#3b4a32">
            mira
          </text>
          <text x="260" y="155" fontFamily="Inter, sans-serif" fontSize="8" fill="#3b4a32" letterSpacing="3">
            BOTANICAL · NO. 03
          </text>
          <line x1="240" y1="270" x2="360" y2="270" stroke="#7c8a6b" strokeWidth="0.8" />
          <text x="260" y="290" fontFamily="Inter, sans-serif" fontSize="9" fill="#3b4a32" letterSpacing="2">
            30ML / 1 FL OZ
          </text>
          <circle cx="120" cy="80" r="3" fill="#7c8a6b" />
          <circle cx="500" cy="340" r="4" fill="#7c8a6b" />
        </svg>
      );
    case "field":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="400" fill="#fafaf7" />
          {/* broadsheet columns */}
          <g stroke="#3b2a1f" strokeWidth="0.4">
            <line x1="40" y1="40" x2="40" y2="360" />
            <line x1="200" y1="40" x2="200" y2="360" />
            <line x1="360" y1="40" x2="360" y2="360" />
            <line x1="520" y1="40" x2="520" y2="360" />
          </g>
          <text x="40" y="80" fontFamily="Fraunces, serif" fontWeight="900" fontSize="46" fill="#3b2a1f">
            Field
          </text>
          <text x="40" y="120" fontFamily="Fraunces, serif" fontWeight="900" fontSize="46" fill="#3b2a1f" fontStyle="italic">
            Notes
          </text>
          <line x1="40" y1="140" x2="160" y2="140" stroke="#3b2a1f" />
          <text x="40" y="158" fontFamily="Inter, sans-serif" fontSize="9" fill="#3b2a1f" letterSpacing="3">
            DISPATCH — VOL. 12
          </text>
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="220" y1={70 + i * 18} x2="340" y2={70 + i * 18} stroke="#3b2a1f" strokeWidth="0.4" opacity="0.6" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="380" y1={70 + i * 18} x2="500" y2={70 + i * 18} stroke="#3b2a1f" strokeWidth="0.4" opacity="0.6" />
          ))}
          <rect x="380" y="60" width="120" height="40" fill="#3b2a1f" />
          <text x="395" y="86" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#fafaf7" letterSpacing="3">
            YIRGACHEFFE
          </text>
        </svg>
      );
    case "halen":
      return (
        <svg viewBox="0 0 600 400" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="400" fill="#fafaf7" />
          <g>
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={50 + i * 90} y={120} width="60" height="160" fill="#0a0a0a" opacity={0.1 + i * 0.12} />
            ))}
          </g>
          <line x1="50" y1="280" x2="530" y2="280" stroke="#ff5b1f" strokeWidth="2" />
          <text x="50" y="80" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="14" fill="#0a0a0a" letterSpacing="6">
            HALEN / ANALYTICS
          </text>
          <text x="50" y="320" fontFamily="Fraunces, serif" fontWeight="600" fontStyle="italic" fontSize="20" fill="#0a0a0a">
            clarity, on tap.
          </text>
          <circle cx="500" cy="80" r="6" fill="#ff5b1f" />
        </svg>
      );
  }
}