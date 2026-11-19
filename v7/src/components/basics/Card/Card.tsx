import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { Children, ComponentProps, FC } from "react";

const cardsGroupVariants = cva(
  [
    "@container/cards-group",
    "grid grid-cols-12 w-full",
    "**:data-[slot=card]:h-full",
    ""
  ],
  {
    variants: {
      variant: {
        list: "",
        grid: ""
      },
      density: {
        compact: "gap-x-4 -my-4",
        default: "gap-x-6 -my-6"
      }
    },
    defaultVariants: {
      density: "default"
    }
  }
);

const cardFigureVariants = cva(
  "h-40 has-[+*]:mb-4 *:object-cover *:w-full *:h-full",
  {
    variants: {
      density: {
        hugge: "h-60",
        large: "h-50",
        compact: "h-40"
      }
    },
    defaultVariants: {
      density: "compact"
    }
  }
);

export const CardFigure: FC<
  ComponentProps<"figure"> & VariantProps<typeof cardFigureVariants>
> = ({ className, density, ...otherProps }) => {
  return (
    <figure
      data-slot="card-figure"
      className={cardFigureVariants({ className, density })}
      {...otherProps}
    />
  );
};

/** To group multiple cards. */
export const CardsGroup: FC<
  ComponentProps<"ul"> &
    VariantProps<typeof cardsGroupVariants> & { asChild?: boolean }
> = ({ className, density, asChild, children, ...otherProps }) => {
  const Comp = asChild ? Slot : "ul";

  return (
    <Comp
      data-slot="cards-group"
      data-density={density}
      className={cardsGroupVariants({ className, density })}
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
      className={cn(
        "col-span-12 @2xl/cards-group:col-span-6 @3xl/cards-group:col-span-4 in-data-[density=compact]:@3xl/cards-group:col-span-3",
        className
      )}
      {...otherProps}
    />
  );
};

const cardVariants = cva("", {
  variants: {
    density: {
      default: "",
      compact: ""
    },
    variant: {
      inline: "",
      default: "border-b-2 border-neutral-100"
    },
    intent: {}
  },
  defaultVariants: {
    density: "default",
    variant: "default"
  },
  compoundVariants: [
    {
      density: "default",
      variant: "default",
      className: "**:data-[slot=card-content]:py-6"
    },
    {
      density: "compact",
      variant: "default",
      className: "**:data-[slot=card-content]:py-4"
    }
  ]
});

/**
 * @example
 * <Card>
 *   <CardContent>
 *     <CardHeader>
 *       <CardTitle>Title</CardTitle>
 *     </CardHeader>
 *     <CardDescription>Description</CardDescription>
 *     <CardFooter>Footer</CardFooter>
 *  </CardContent>
 * </Card>
 */
const Card: FC<
  ComponentProps<"article"> & VariantProps<typeof cardVariants>
> = ({ className, density, variant, ...otherProps }) => {
  return (
    <article
      data-density={density}
      data-slot="card"
      className={cardVariants({ className, density: density, variant })}
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
      className={cn("flex h-full w-full flex-col", className)}
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
      className={cn(className, "has-[+*]:mb-2")}
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
        "text-xl in-data-[density=compact]:text-lg leading-6",
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
      className={cn("[&+*]:mt-1", className)}
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
      className={cn("mt-auto pt-4", className)}
      {...otherProps}
    />
  );
};

export default Card;
