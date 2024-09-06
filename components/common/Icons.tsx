import type { IconProps, NavigationIcons } from "./types";

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

export const Back: React.FC<NavigationIcons> = ({ fill = "#ffffff" }) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 1024.00 1024.00"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    stroke="#ffffff"
    transform="rotate(0)"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCCCCC"
      strokeWidth={4.096}
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fill={fill}
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      />
      <path
        fill={fill}
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      />
    </g>
  </svg>
);

export const Forward: React.FC<NavigationIcons> = ({ fill = "#ffffff" }) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 1024.00 1024.00"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    stroke="#ffffff"
    transform="rotate(180)"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCCCCC"
      strokeWidth={4.096}
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fill={fill}
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      />
      <path
        fill={fill}
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      />
    </g>
  </svg>
);

export const Refresh: React.FC<NavigationIcons> = ({ fill = "#ffffff" }) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
    </g>
  </svg>
);

export const Down: React.FC<IconProps> = ({ extraStyles }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={extraStyles}
  >
    <path d="m28.109 5.453 3.781 3.766L15.999 25.11.108 9.219l3.781-3.766 12.109 12.109L28.107 5.453z" />
  </svg>
);

export const Up: React.FC<NavigationIcons> = ({ fill = "#ffffff" }) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 1024.00 1024.00"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    stroke="#ffffff"
    transform="rotate(90)"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="{0}" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCCCCC"
      strokeWidth="{4.096}"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fill={fill}
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      />
      <path
        fill={fill}
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      />
    </g>
  </svg>
);

export const PC: React.FC<NavigationIcons & IconProps> = ({
  fill = "#ffffff",
  extraStyles,
}) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    className={extraStyles}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="{0}" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g fill="none" fillRule="evenodd">
        {" "}
        <path d="m0 0h32v32h-32z" />{" "}
        <path
          d="m27 3c2.7614237 0 5 2.23857625 5 5v12c0 2.7614237-2.2385763 5-5 5h-7v3h3c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h3v-3h-7c-2.6887547 0-4.88181811-2.1223067-4.99538049-4.7831104l-.00461951-.2168896v-12c0-2.76142375 2.23857625-5 5-5zm-9 25v-3h-4v3zm9-23h-22c-1.65685425 0-3 1.34314575-3 3v12c0 1.6568542 1.34314575 3 3 3h22c1.6568542 0 3-1.3431458 3-3v-12c0-1.65685425-1.3431458-3-3-3z"
          fill={fill}
          fillRule="nonzero"
        />{" "}
      </g>{" "}
    </g>
  </svg>
);

export const RightArrow: React.FC<NavigationIcons & IconProps> = ({
  fill = "#ffffff",
  extraStyles,
}) => (
  <svg
    width="14px"
    height="14px"
    viewBox="0 0 1024 1024"
    fill="#000000"
    className={extraStyles}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(180)"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
        fill={fill}
      />
    </g>
  </svg>
);

export const Search: React.FC = () => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />{" "}
    </g>
  </svg>
);

export const Circle: React.FC<IconProps> = ({ extraStyles }): JSX.Element => (
  <svg
    className={extraStyles}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 10q1.234 0 2.328.469t1.914 1.289 1.289 1.914T22 16q0 1.25-.469 2.336t-1.289 1.906-1.914 1.289T16 22q-1.25 0-2.336-.469t-1.906-1.289-1.289-1.906T10 16q0-1.234.469-2.328t1.289-1.914 1.906-1.289T16 10z" />
  </svg>
);
