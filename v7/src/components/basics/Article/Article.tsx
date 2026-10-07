import { cn } from "@/lib/utils/composers";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

interface Props {
  variant: "grid" | "list";
}

const articleVariants = cva("", {
  variants: {},
  defaultVariants: {}
});

const Article: FC<
  ComponentProps<"article"> & VariantProps<typeof articleVariants>
> = ({ className, ...otherProps }) => {
  return (
    <article
      data-slot="article"
      className={articleVariants({ className })}
      {...otherProps}
    />
  );
};

const ArticleHeader: FC<ComponentProps<"header">> = ({
  className,
  ...otherProps
}) => {
  return (
    <header
      data-slot="header"
      className={cn("mb-8", className)}
      {...otherProps}
    />
  );
};

const ArticleHeaderContainer: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      data-slot="header-container"
      className={cn("container mx-auto has-[+*]:mb-8", className)}
      {...otherProps}
    />
  );
};

const ArticleTitle: FC<ComponentProps<"h2">> = ({
  className,
  ...otherProps
}) => {
  return (
    <h2
      data-slot="title"
      className={cn(
        "font-serif text-4xl lg:text-5xl font-bold text-stone-600",
        className
      )}
      {...otherProps}
    />
  );
};

const ArticleSubtitle: FC<ComponentProps<"h3">> = ({
  className,
  ...otherProps
}) => {
  return (
    <h3
      data-slot="subtitle"
      className={cn("text-lg font-medium text-gray-600", className)}
      {...otherProps}
    />
  );
};

const ArticleDescription: FC<ComponentProps<"p">> = ({
  className,
  ...otherProps
}) => {
  return (
    <p
      data-slot="description"
      className={cn("text-stone-600 mt-4", className)}
      {...otherProps}
    />
  );
};

const articleContentVariants = cva("px-3 md:px-6 mx-auto", {
  variants: {
    stretch: {
      true: "max-w-390",
      false: "container"
    }
  },
  defaultVariants: {
    stretch: false
  }
});

const ArticleContent: FC<
  ComponentProps<"div"> & VariantProps<typeof articleContentVariants>
> = ({ className, stretch, ...otherProps }) => {
  return (
    <div
      data-slot="content"
      data-stretch={stretch || false}
      className={articleContentVariants({ stretch, className })}
      {...otherProps}
    />
  );
};

const ArticleHeaderFigure: FC<ComponentProps<"figure">> = ({
  className,
  ...otherProps
}) => {
  return (
    <figure
      data-slot="header-figure"
      className={cn(
        "w-full mx-auto max-h-96 h-[55vh] max-w-5xl *:object-cover *:w-full *:h-full has-[+*]:mb-8",
        className
      )}
      {...otherProps}
    />
  );
};

export default Article;
export {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleHeaderFigure,
    ArticleSubtitle,
    ArticleTitle
};
