import { SVGProps } from "react";

export default function VerityMark({ size = 44, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  const height = (size / 44) * 50;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 50"
      width={size}
      height={height}
      {...props}
    >
      <path
        d="M 4 0 L 40 0 Q 44 0 44 4 L 44 34 Q 44 37 41.5 38.5 L 24.5 48.3 Q 22 49.7 19.5 48.3 L 2.5 38.5 Q 0 37 0 34 L 0 4 Q 0 0 4 0 Z"
        fill="#1E2260"
      />
      <path
        d="M 30 7 L 37 7 L 37 14"
        stroke="#C9A961"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
