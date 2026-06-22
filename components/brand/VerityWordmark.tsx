import { SVGProps } from "react";

export default function VerityWordmark({ width = 320, ...props }: SVGProps<SVGSVGElement> & { width?: number }) {
  const height = (width / 320) * 56;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 56"
      width={width}
      height={height}
      {...props}
    >
      <text
        x="0"
        y="42"
        fontFamily="var(--font-display), 'Tenor Sans', 'Optima', 'Segoe UI', sans-serif"
        fontSize="40"
        letterSpacing="2.4"
      >
        <tspan fill="#1E2260">VERI</tspan>
        <tspan fill="#C9A961">T</tspan>
        <tspan fill="#1E2260">Y</tspan>
      </text>
    </svg>
  );
}
