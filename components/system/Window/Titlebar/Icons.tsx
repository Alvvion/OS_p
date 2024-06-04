import type { IconProps } from "./types";

export const MinimizeIcon: React.FC<IconProps> = ({ extraStyles }) => (
  <svg className={`w-[10px] mr-px mb-[1px] ${extraStyles}`} viewBox="0 0 10 1">
    <path d="M0 0h10v1H0z" />
  </svg>
);

export const MaximizeIcon: React.FC<IconProps> = ({ extraStyles }) => (
  <svg className={`w-[10px] mr-px mb-[2px] ${extraStyles}`} viewBox="0 0 10 10">
    <path d="M0 0v10h10V0H0zm1 1h8v8H1V1z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ extraStyles }) => (
  <svg className={`w-[10px] mr-px mb-[2px] ${extraStyles}`} viewBox="0 0 10 10">
    <path d="M10.2.7L9.5 0 5.1 4.4.7 0 0 .7l4.4 4.4L0 9.5l.7.7 4.4-4.4 4.4 4.4.7-.7-4.4-4.4z" />
  </svg>
);

export const MaximizedIcon: React.FC<IconProps> = ({ extraStyles }) => (
  <svg className={`w-[10px] mr-px mb-[2px] ${extraStyles}`} viewBox="0 0 10 10">
    <path d="M2.1 0v2H0v8.1h8.2v-2h2V0H2.1zm5.1 9.2H1.1V3h6.1v6.2zm2-2.1h-1V2H3.1V1h6.1v6.1z" />
  </svg>
);

export const Avatar: React.FC<IconProps> = ({ extraStyles }) => (
  <span
    className={`inline-block h-10 w-10 overflow-hidden rounded-full ${extraStyles}`}
  >
    <svg
      className="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </span>
);
