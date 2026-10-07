"use client";

import { ComponentProps, FC, useEffect, useRef } from "react";

interface Props extends ComponentProps<"div"> {
  enabled: boolean;
  offset?: number;
}

const ScrollInview: FC<Props> = ({ enabled, offset = 20, ...otherProps }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    if (ref.current) {
      window.scrollTo({
        top: window.scrollY + ref.current.getBoundingClientRect().top - offset,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (enabled) {
      scrollIntoView();
    }
  }, [enabled, offset]);

  return <div ref={enabled ? ref : null} {...otherProps}></div>;
};

export default ScrollInview;
