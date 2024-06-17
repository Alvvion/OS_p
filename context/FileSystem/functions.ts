import extensions from "./extensions";

export const getIconByFileExtension = (extention: string): string =>
  extensions[extention]?.icon || "/assets/ICON2_1.ico";

export const getProcessByFileExtension = (extention: string): string =>
  extensions[extention]?.process[0] || "";
