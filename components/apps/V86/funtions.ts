import { SUPPORTED_FLOPPY_TYPES } from "@/utils/constants";

import type { V86ImageType } from "./types";

const isFloppyImage = (size: number): boolean =>
  // eslint-disable-next-line no-bitwise
  SUPPORTED_FLOPPY_TYPES.has(size >> 10) && (size & 0x3ff) === 0;

// eslint-disable-next-line import/prefer-default-export
export const getImageType = (isISO: boolean, size: number): V86ImageType => {
  if (isISO) return "cdrom";

  return isFloppyImage(size) ? "fda" : "hda";
};
