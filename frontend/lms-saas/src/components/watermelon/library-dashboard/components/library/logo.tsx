import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="36" height="36" rx="12" fill="#21664D" />
      <path d="M11 13.5c3.2-1.2 6.2-.7 9 1.4v13c-2.8-2.1-5.8-2.6-9-1.4v-13Zm18 0c-3.2-1.2-6.2-.7-9 1.4v13c2.8-2.1 5.8-2.6 9-1.4v-13Z" stroke="#FFFDF7" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20 15v13" stroke="#C8D9C9" strokeWidth="1.6" />
    </svg>
  );
}
