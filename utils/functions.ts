import { extname } from "path";

import {
  DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS,
  ONE_TIME_PASSIVE_EVENT,
} from "./constants";

export const cleanUpBufferUrl = (url: string): void => URL.revokeObjectURL(url);

export const loadScripts = (src: string): Promise<Event> =>
  new Promise<Event>((resolve, reject) => {
    const loadedScripts = [...document.scripts];

    if (loadedScripts.some((script) => script.src.endsWith(src))) {
      resolve(new Event("Already loaded."));
    } else {
      const script = document.createElement("script");

      script.async = false;
      script.src = src;
      script.addEventListener(
        "error",
        (event) => reject(event),
        ONE_TIME_PASSIVE_EVENT
      );
      script.addEventListener(
        "load",
        (event) => resolve(event),
        ONE_TIME_PASSIVE_EVENT
      );

      document.head.appendChild(script);
    }
  });

export const loadStyles = (href: string): Promise<Event> =>
  new Promise<Event>((resolve, reject) => {
    const loadedLinks = [...document.querySelectorAll("link")];

    if (loadedLinks.some((link) => link.href.endsWith(href))) {
      resolve(new Event("Already loaded."));
    } else {
      const link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = href;
      link.addEventListener(
        "error",
        (event) => reject(event),
        ONE_TIME_PASSIVE_EVENT
      );
      link.addEventListener(
        "load",
        (event) => resolve(event),
        ONE_TIME_PASSIVE_EVENT
      );

      document.head.appendChild(link);
    }
  });

export const loadFiles = (files: string[]): Promise<Event[]> =>
  Promise.all(
    files.reduce((filesToLoad: Promise<Event>[], file) => {
      const ext = extname(file).toLowerCase();

      if (ext === ".css") filesToLoad.push(loadStyles(file));
      else if (ext === ".js") filesToLoad.push(loadScripts(file));

      return filesToLoad;
    }, [])
  );

export const bufferToBlob = (buffer: Buffer): Blob =>
  new Blob([new Uint8Array(buffer)]);

export const bufferToUrl = (buffer: Buffer): string =>
  URL.createObjectURL(bufferToBlob(buffer));

export const pxToNumber = (px: string): number =>
  Number.parseInt(px.slice(0, -2), 10);

export const doubleClick = (
  handler: React.MouseEventHandler,
  singleClick = false,
  timeout = DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS
): React.MouseEventHandler => {
  let timer: NodeJS.Timeout | undefined;

  return (event) => {
    const runHandler = () => {
      event.stopPropagation();
      handler(event);
    };
    const clearTimer = () => {
      timer = undefined;
    };

    if (singleClick) {
      runHandler();
    } else if (timer === undefined) {
      timer = setTimeout(clearTimer, timeout);
    } else {
      clearTimeout(timer);
      runHandler();
      clearTimer();
    }
  };
};
