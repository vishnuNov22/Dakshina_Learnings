import type React from "react";
import type { SubjectVisual as Kind } from "@/data/books";

/**
 * Subject-specific line diagrams. Strokes "draw" with the CSS variable --draw (0..1),
 * which the scroll timeline updates — no React re-render per frame.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  pathLength: 1,
  style: { strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--draw, 1))" } as React.CSSProperties,
};

export function SubjectVisual({ kind, className }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden>
      {kind === "polity" && (
        <g>
          <circle cx="160" cy="40" r="22" {...stroke} />
          <circle cx="70" cy="150" r="22" {...stroke} />
          <circle cx="160" cy="165" r="22" {...stroke} />
          <circle cx="250" cy="150" r="22" {...stroke} />
          <path d="M145 58 L82 130 M160 62 L160 143 M175 58 L238 130 M92 155 L138 162 M228 155 L182 162" {...stroke} />
          <text x="160" y="44" textAnchor="middle" className="fill-current font-mono text-[8px]">CONST.</text>
          <text x="70" y="154" textAnchor="middle" className="fill-current font-mono text-[8px]">LEG.</text>
          <text x="160" y="169" textAnchor="middle" className="fill-current font-mono text-[8px]">EXEC.</text>
          <text x="250" y="154" textAnchor="middle" className="fill-current font-mono text-[8px]">JUD.</text>
        </g>
      )}
      {kind === "geography" && (
        <g>
          {[18, 34, 50, 66].map((r, i) => (
            <ellipse key={r} cx="120" cy="100" rx={r * 1.5} ry={r} {...stroke} strokeOpacity={1 - i * 0.18} />
          ))}
          {[14, 28].map((r) => (
            <ellipse key={r} cx="240" cy="70" rx={r * 1.3} ry={r} {...stroke} />
          ))}
          <path d="M10 160 C80 130 120 190 200 150 S290 120 315 170" {...stroke} strokeWidth={2.4} />
        </g>
      )}
      {kind === "history" && (
        <g>
          <path d="M20 100 H300" {...stroke} />
          {[40, 100, 160, 220, 280].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="100" r="6" {...stroke} />
              <path d={`M${x} ${i % 2 ? 106 : 94} V${i % 2 ? 150 : 50}`} {...stroke} />
              <rect x={x - 22} y={i % 2 ? 150 : 32} width="44" height="16" rx="3" {...stroke} />
            </g>
          ))}
        </g>
      )}
      {kind === "economy" && (
        <g>
          {[
            [160, 40],
            [60, 100],
            [260, 100],
            [100, 170],
            [220, 170],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="16" {...stroke} />
          ))}
          <path d="M146 50 L74 90 M174 50 L246 90 M66 116 L94 154 M254 116 L226 154 M116 170 H204 M76 100 H244" {...stroke} />
        </g>
      )}
      {kind === "environment" && (
        <g>
          <circle cx="160" cy="100" r="70" {...stroke} strokeDasharray="4 6" />
          {[0, 90, 180, 270].map((a) => {
            const x = 160 + Math.cos(((a - 90) * Math.PI) / 180) * 70;
            const y = 100 + Math.sin(((a - 90) * Math.PI) / 180) * 70;
            return <circle key={a} cx={x} cy={y} r="16" {...stroke} />;
          })}
          <path d="M160 70 C150 85 150 115 160 130 C170 115 170 85 160 70 Z" {...stroke} />
        </g>
      )}
      {kind === "news" && (
        <g>
          <rect x="30" y="20" width="260" height="160" rx="4" {...stroke} />
          <path d="M45 45 H275 M45 60 H180 M45 80 H150 M45 95 H150 M45 110 H150 M45 125 H150 M170 80 H275 M170 95 H275 M170 110 H250" {...stroke} />
          <ellipse cx="220" cy="150" rx="50" ry="16" {...stroke} />
          <path d="M150 150 C120 175 80 170 60 150" {...stroke} />
        </g>
      )}
    </svg>
  );
}
