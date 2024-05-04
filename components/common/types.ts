export interface ImageProps extends React.ComponentPropsWithoutRef<"img"> {
  size?: number | string;
  src?: string;
}
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  extraStyles: string;
}
