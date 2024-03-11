import type { V86Config } from "@/utils/V86Config";

export type EventCallback = (data: number[]) => void;

type EventListener = (event: string, callback: EventCallback) => void;

export type V86Starter = {
  add_listener: EventListener;
  destroy: () => void;
  lock_mouse: () => void;
  remove_listener: EventListener;
};

type v86Config = typeof V86Config & {
  memory_size: number;
  vga_memory_size: number;
  boot_order: number;
  cdrom?: {
    url?: string;
  };
  fda?: {
    url?: string;
  };
  screen_container: HTMLDivElement | null;
};

interface V86Constructor {
  new (config: v86Config): V86Starter;
}

export type WindowWithV86Starter = Window &
  typeof globalThis & { V86Starter: V86Constructor };

export type NavigatorWithMemory = Navigator & { deviceMemory: number };

export type V86 = {
  emulator: V86Starter | null;
  lockMouse: () => void;
};
