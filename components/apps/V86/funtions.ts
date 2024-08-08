import { SUPPORTED_FLOPPY_TYPES } from "./config";

export const isFloppyImage = (size: number): boolean =>
  // eslint-disable-next-line no-bitwise
  SUPPORTED_FLOPPY_TYPES.has(size >> 10) && (size & 0x3ff) === 0;

export const getImageType = (size: number): string =>
  isFloppyImage(size) ? "fda" : "hda";
