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

export const ChevronRight: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={extraStyles}
  >
    <path d="M8.047 30.547L22.578 16 8.047 1.453 9.453.047 25.422 16 9.453 31.953l-1.406-1.406z" />
  </svg>
);

export const Fullscreen: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={extraStyles}
  >
    <path d="M30 2v10h-2v-6.578l-22.578 22.578h6.578v2h-10v-10h2v6.578l22.578-22.578h-6.578v-2h10z" />
  </svg>
);

export const ExitFullscreen: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={extraStyles}
  >
    <path d="M4 18h10v10h-2v-6.578L1.453 31.953.047 30.547 10.578 20H4v-2zm17.422-6H28v2H18V4h2v6.578L30.547.047l1.406 1.406z" />
  </svg>
);

export const ZoomIn: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={extraStyles}
  >
    <path d="M31.703 30.297Q32 30.594 32 31t-.297.703T31 32t-.703-.297l-12.266-12.25q-1.5 1.234-3.289 1.891T11 22q-1.516 0-2.922-.391T5.453 20.5t-2.227-1.727-1.727-2.227T.39 13.921t-.391-2.922.391-2.922 1.109-2.625 1.727-2.227 2.227-1.727T8.078.389 11-.002t2.922.391 2.625 1.109 2.227 1.727 1.727 2.227 1.109 2.625.391 2.922q0 1.953-.656 3.742t-1.891 3.289zM11 20q1.859 0 3.5-.711t2.859-1.93 1.93-2.859T20 11t-.711-3.5-1.93-2.859-2.859-1.93T11 2t-3.5.711-2.859 1.93T2.711 7.5 2 11t.711 3.5 1.93 2.859 2.859 1.93T11 20zm1-10h4v2h-4v4h-2v-4H6v-2h4V6h2v4z" />
  </svg>
);

export const ZoomOut: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={extraStyles}
  >
    <path d="M32 30.906q0 .438-.266.766T31 32q-.406 0-.703-.297l-12.266-12.25q-1.5 1.234-3.289 1.891T11 22q-1.516 0-2.922-.391T5.453 20.5t-2.227-1.727-1.727-2.227T.39 13.921t-.391-2.922.391-2.922 1.109-2.625 1.727-2.227 2.227-1.727T8.078.389 11-.002t2.922.391 2.625 1.109 2.227 1.727 1.727 2.227 1.109 2.625.391 2.922q0 1.953-.656 3.742t-1.891 3.289q.234.234.898.891t1.594 1.563 2.031 1.992 2.219 2.203 2.164 2.18 1.859 1.922 1.297 1.43.484.695zM11 20q1.859 0 3.5-.711t2.859-1.93 1.93-2.859T20 11t-.711-3.5-1.93-2.859-2.859-1.93T11 2t-3.5.711-2.859 1.93T2.711 7.5 2 11t.711 3.5 1.93 2.859 2.859 1.93T11 20zM6 10h10v2H6v-2z" />
  </svg>
);
