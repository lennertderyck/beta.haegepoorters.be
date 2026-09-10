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
      data-slot="header-content"
      className={cn("mb-8 container mx-auto", className)}
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
        "font-serif text-4xl lg:text-5xl font-bold mb-6 text-gray-600",
        className
      )}
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
      className={cn("text-gray-600", className)}
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

export default Article;
export {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle
};
