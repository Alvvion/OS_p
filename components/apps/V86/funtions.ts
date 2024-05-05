import { SUPPORTED_FLOPPY_TYPES } from "@/utils/constants";

import type { V86ImageType } from "./types";

const isFloppyImage = (size: number): boolean =>
  // eslint-disable-next-line no-bitwise
  SUPPORTED_FLOPPY_TYPES.includes(size >> 10) && (size & 0x3ff) === 0;

const getImageType = (isISO: boolean, size: number): V86ImageType => {
  if (isISO) return "cdrom";

  return isFloppyImage(size) ? "fda" : "hda";
};

export default getImageType;
