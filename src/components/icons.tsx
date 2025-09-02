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
  google: (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M18 2h-3a4 4 0 0 0-4 4v2" />
      <path d="M11 16v-4a4 4 0 1 0-8 0v4" />
      <path d="M13 8H7a4 4 0 0 0-4 4v2" />
      <circle cx="17" cy="17" r="5" />
      <path d="M17 14v6" />
      <path d="M14 17h6" />
    </svg>
  ),
};
