// eslint-disable-next-line import/prefer-default-export
export const mockOnLoadEventListener = (
  type: string,
  listener: EventListenerOrEventListenerObject,
): void => {
  if (type === "load" && typeof listener === "function") listener({} as Event);
};
