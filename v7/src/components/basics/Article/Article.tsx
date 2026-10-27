import { cn } from "@/lib/utils/composers";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

interface Props {
  variant: "grid" | "list";
}

const articleVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

/**
 * @example
 * <Article>
 *   <ArticleHeader>
 *     <ArticleHeaderContainer>
 *       <ArticleTitle>Title</ArticleTitle>
 *     </ArticleHeaderContainer>
 *     <ArticleHeaderFigure><img /></ArticleHeaderFigure>
 *   </ArticleHeader>
 *   <ArticleContent>
 *    <ArticleBody>For applying basic text styling</ArticleBody>
 *   </ArticleContent>
 * </Article>
 */
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
        className,
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

const articleContentVariants = cva("mx-auto", {
  variants: {
    stretch: {
      true: "max-w-390 px-6",
      false: "container",
    },
  },
  defaultVariants: {
    stretch: false,
  },
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
        "w-full max-w-5xl",
        "max-h-96 h-[55vh]",
        "mx-auto has-[+*]:mb-8",
        "bg-gray-100",
        "*:w-full *:h-full",
        "*:[img]:object-cover",
        className,
      )}
      {...otherProps}
    />
  );
};

const ArticleBody: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      data-slot="body"
      className={cn(
        "*:mt-3 leading-7 text-[.9rem] *:text-[.9rem] text-neutral-700 [&_a]:text-primary-500! [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold",
        className,
      )}
      {...otherProps}
    />
  );
};

export default Article;
export {
  ArticleBody,
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleHeaderFigure,
  ArticleSubtitle,
  ArticleTitle,
};
