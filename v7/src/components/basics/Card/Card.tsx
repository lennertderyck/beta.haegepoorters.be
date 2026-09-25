import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { Children, ComponentProps, FC } from "react";

const cardsGroupVariants = cva(
  [
    "@container/cards-group",
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full",
    "**:data-[slot=card]:h-full"
  ],
  {
    variants: {
      sizing: {
        compact: "gap-x-4",
        default: "gap-x-6"
      }
    },
    defaultVariants: {
      sizing: "default"
    }
  }
);

/** To group multiple cards. */
export const CardsGroup: FC<
  ComponentProps<"ul"> &
    VariantProps<typeof cardsGroupVariants> & { asChild?: boolean }
> = ({ className, sizing, asChild, children, ...otherProps }) => {
  const Comp = asChild ? Slot : "ul";

  return (
    <Comp
      data-slot="cards-group"
      data-sizing={sizing}
      className={cardsGroupVariants({ className, sizing })}
      {...otherProps}
    >
      {asChild
        ? children
        : Children.toArray(children).map((child, childIndex) => (
            <CardsGroupItem key={childIndex} data-slot="card-wrapper">
              {child}
            </CardsGroupItem>
          ))}
    </Comp>
  );
};

/** TODO: Complete this component. */
export const CardsGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

/**
 * Holds a single card. Automatically applied when using <CardsGroup>.
 */
export const CardsGroupItem: FC<ComponentProps<"li">> = ({
  className,
  ...otherProps
}) => {
  return (
    <li
      data-slot="cards-group-item"
      className={cn("col-span-1", className)}
      {...otherProps}
    />
  );
};

const cardVariants = cva("", {
  variants: {
    sizing: {
      default: "**:data-[slot=card-content]:py-6",
      compact: "**:data-[slot=card-content]:py-4"
    },
    variant: {
      inline: "py-0!",
      default: "border-b-2 border-neutral-100"
    }
  },
  defaultVariants: {
    sizing: "default",
    variant: "default"
  }
});

/**
 * @example
 * <Card>
 *   <CardContent>
 *     <CardHeader>
 *       <CardTitle>Title</CardTitle>
 *     </CardHeader>
 *     <CardDescription>Description</CardDescription>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 */
const Card: FC<
  ComponentProps<"article"> & VariantProps<typeof cardVariants>
> = ({ className, sizing, variant, ...otherProps }) => {
  return (
    <article
      data-sizing={sizing}
      data-slot="card"
      className={cardVariants({ className, sizing, variant })}
      {...otherProps}
    />
  );
};

export const CardContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      data-slot="card-content"
      className={cn("w-full", className)}
      {...otherProps}
    />
  );
};

export const CardHeader: FC<ComponentProps<"header">> = ({
  className,
  ...otherProps
}) => {
  return (
    <header
      data-slot="card-header"
      className={cn(className, "has-[+*]:mb-1")}
      {...otherProps}
    />
  );
};

export const CardTitle: FC<ComponentProps<"h4">> = ({
  className,
  ...otherProps
}) => {
  return (
    <h4
      data-slot="card-title"
      className={cn(
        "text-xl in-data-[sizing=compact]:text-lg",
        "font-semibold has-[+*]:mb-1",
        className
      )}
      {...otherProps}
    />
  );
};

export const CardSubtitle: FC<ComponentProps<"p"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      data-slot="card-title"
      className={cn("", "mb-1", className)}
      {...otherProps}
    />
  );
};

export const CardDescription: FC<
  ComponentProps<"p"> & { asChild?: boolean }
> = ({ asChild, className, ...otherProps }) => {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      data-slot="card-description"
      className={cn(className, "font-serif text-lg leading-6")}
      {...otherProps}
    />
  );
};

export const CardFooter: FC<ComponentProps<"footer">> = ({
  className,
  ...otherProps
}) => {
  return (
    <footer
      data-slot="card-footer"
      className={cn("mt-4", className)}
      {...otherProps}
    />
  );
};

export default Card;
