import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20" />
      <path d="M5 12h14" />
      <path d="M12 2a5 5 0 1 0 5 5" />
      <path d="M12 22a5 5 0 1 1-5-5" />
    </svg>
  ),
};
