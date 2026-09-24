import { COLOPHON } from "@/lib/constants/static";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const FooterColophon: FC<Props> = () => {
  return (
    <p className="mt-6 text-gray-400 font-medium flex flex-col lg:flex-row gap-4 items-baseline justify-between">
      {COLOPHON.map((colophonSection, colophonSectionIndex) => (
        <small key={colophonSectionIndex} className="inline-block leading-5">
          {colophonSection.map(
            (colophonSectionItem, colophonSectionItemIndex) => (
              <span key={colophonSectionItemIndex}>
                {colophonSectionItem.href ? (
                  <Link
                    href={colophonSectionItem.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {colophonSectionItem.text}
                  </Link>
                ) : (
                  colophonSectionItem.text
                )}
                {colophonSectionItemIndex < colophonSection.length - 1 && (
                  <>&nbsp; | &nbsp;</>
                )}
              </span>
            )
          )}
        </small>
      ))}
    </p>
  );
};

export default FooterColophon;
