import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

interface Props {
  variant: "page" | "list";
}

const Article: FC<ComponentProps<"article">> = ({
  className,
  ...otherProps
}) => {
  return (
    <article
      data-slot="article"
      className={cn("", className)}
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
      className={cn("mb-12", className)}
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
      className={cn("text-xl font-semibold text-gray-600", className)}
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
      className={cn("text-stone-600 mt-6", className)}
      {...otherProps}
    />
  );
};

const ArticleContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      data-slot="content"
      className={cn("container mx-auto", className)}
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
