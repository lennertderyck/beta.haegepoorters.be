"use client";

import Icon from "@/components/basics/Icon/Icon";
import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface Props extends ComponentProps<"nav"> {
  asChild?: boolean;
}

const RootNavigation: FC<Props> = ({
  asChild,
  className,
  children,
  ...otherProps
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const Comp = asChild ? Slot : "nav";
  const router = useRouter();
  const pathname = usePathname();
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group",
          "fixed top-0 left-0 bottom-0",
          "max-w-[90vw]",
          // "md:before:w-(--rootnavigation-size-min)", // padding is used
          "border-r-(length:--navigation-item-border-width) border-neutral-100",
          "bg-white",
          "overflow-hidden",
          "z-(--rootnavigation-z-index)",
          "transition-all duration-350 ease-in-out",
          "**:transition-all **:duration-350 **:ease-in-out",
          "peer",
          "before:block",
          "md:before:w-(--rootnavigation-size-min) h-full",
          !isOpen ? "not-md:-translate-x-full" : "not-md:translate-x-none"
        )}
      >
        <Comp
          className={cn("h-full text-neutral-600", className)}
          {...otherProps}
        >
          {children}
        </Comp>
      </div>
      <div
        inert={!isOpen}
        className={cn(
          "fixed inset-0 z-(--rootnavigation-overlay-z-index)",
          "bg-black/0 peer-data-[state=open]:bg-black/50",
          "transition-colors duration-350 ease-in-out"
        )}
      />
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "rounded-full fixed top-4 right-4 md:hidden bg-primary-500 size-12 grid place-items-center",
          "transition-[translate] duration-200",
          !isOpen ? "translate-x-none" : "translate-x-16"
        )}
      >
        <Icon name="menu-line" size="1.5rem" color="white" />
      </button>
    </>
  );
};

export default RootNavigation;
