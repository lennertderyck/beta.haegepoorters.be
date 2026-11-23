"use client";

import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC, useCallback, useEffect, useRef } from "react";

interface Props extends ComponentProps<"div"> {
  enabled: boolean;
  offset?: number;
  asChild?: boolean;
}

const ScrollIntoView: FC<Props> = ({
  asChild,
  enabled,
  offset = 20,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "div";
  const ref = useRef<HTMLDivElement>(null);

  const scrollIntoView = useCallback(() => {
    if (ref.current) {
      window.scrollTo({
        top: window.scrollY + ref.current.getBoundingClientRect().top - offset,
        behavior: "smooth"
      });
    }
  }, [offset]);

  useEffect(() => {
    if (enabled) {
      scrollIntoView();
    }
  }, [enabled]);

  return <Comp ref={enabled ? ref : null} {...otherProps} />;
};

export default ScrollIntoView;
