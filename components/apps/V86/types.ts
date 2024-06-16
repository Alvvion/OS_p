import type { config as v86Config } from "./config";

export type ModeCallback = (isGfxMode: boolean) => void;
export type SizeCallback = (dimensions: number[]) => void;

type EventListener = (
  event: string,
  callback: SizeCallback | ModeCallback
) => void;

export type V86ImageType = "cdrom" | "hda" | "fda";

export type V86Image = {
  async?: boolean;
  size?: number;
  url: string;
  use_parts?: boolean;
};

export type V86Starter = {
  add_listener: EventListener;
  destroy: () => void;
  lock_mouse: () => void;
  remove_listener: EventListener;
};

export type V86ImageConfig = Partial<Record<V86ImageType, V86Image>>;

type V86Config = typeof v86Config &
  V86ImageConfig & {
    memory_size: number;
    vga_memory_size: number;
    boot_order: number;
    screen_container: HTMLDivElement | null;
  };

export interface V86Constructor {
  new (config: V86Config): V86Starter;
}

export type V86 = {
  emulator?: V86Starter;
  lockMouse?: () => void;
};

declare global {
  interface Window {
    V86Starter: V86Constructor;
  }
  interface Navigator {
    deviceMemory: number;
  }
}
