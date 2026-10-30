"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cva, VariantProps } from "class-variance-authority";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

const collapsibleContentVariants = cva(
  "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down  [transition-timing-function:ease] ",
  {
    variants: {
      duration: {
        slower: "duration-250",
        faster: "duration-100"
      },
      origin: {
        top: "origin-top",
        bottom: "origin-bottom"
      }
    },
    defaultVariants: {
      duration: "slower",
      origin: "bottom"
    }
  }
);

function CollapsibleContent({
  className,
  duration,
  origin,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> &
  VariantProps<typeof collapsibleContentVariants>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={collapsibleContentVariants({
        className,
        duration,
        origin
      })}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
