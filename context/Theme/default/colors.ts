const colors = {
  primary: "#008000",
  window: "#808080",
  desktopBgColor: "#000",
  taskbar: {
    bgColor: "#1d1c1d",
    text: "#fff",
    langHover: "#c1c0c0",
    buttonHover: "bg-taskbar-button-hover",
    searchBgColor: "#3C3C3C",
  },
  titlebar: {
    bgColor: "#202020",
    text: "#E2E2E2",
    backgroundHover: "bg-titlebar-backgroundHover",
    closeHover: "bg-titlebar-closeHover",
    disabled: "fill-titlebar-button-disabled",
    backgroundActive: "bg-titlebar-backgroundActive",
    closeActive: "bg-titlebar-closeActive",
    buttonInactive: "fill-titlebar-buttonInactive",
    disabledInactive: "fill-titlebar-button-disabledInactive",
  },
  fileEntry: {
    text: "#fff",
    border: "border-file-border",
    background: "bg-file-background",
    borderFocused: "border-file-borderFocused",
    backgroundFocused: "bg-file-backgroundFocused",
    borderFocusedHover: "border-file-borderFocusedHover",
    backgroundFocusedHover: "bg-file-backgroundFocusedHover",
    textShadow: `
      0 0 1px rgba(0, 0, 0, 75%),
      0 0 2px rgba(0, 0, 0, 50%),
      0 0 3px rgba(0, 0, 0, 25%),

      0 1px 1px rgba(0, 0, 0, 75%),
      0 1px 2px rgba(0, 0, 0, 50%),
      0 1px 3px rgba(0, 0, 0, 25%),

      0 2px 1px rgba(0, 0, 0, 75%),
      0 2px 2px rgba(0, 0, 0, 50%),
      0 2px 3px rgba(0, 0, 0, 25%)`,
  },
  contextMenu: {
    boxShadow: `1px 1px 1px hsla(0, 0%, 20%, 70%),
    2px 2px 2px hsla(0, 0%, 10%, 70%)`,
  },
};

export default colors;
