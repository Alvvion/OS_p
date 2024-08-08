const config = {
  animate: "active",
  initial: "initial",
  exit: "initial",
  transition: {
    duration: 0.4,
    ease: [-0.15, 1, 0, 1],
  },
  variants: {
    active: { height: "var(--height, 390px)", y: 0 },
    initial: { height: 0, y: 50 },
  },
};

export default config;
