import { useEffect } from "react";

const GlobalStyles: React.FC = () => {
  useEffect(() => {
    document.body.style.pointerEvents = "none";

    return () => {
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default GlobalStyles;
