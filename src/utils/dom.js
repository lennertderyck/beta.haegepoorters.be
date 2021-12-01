import classNames from "classnames";

export const className = (...params) => ({ className: classNames(params) });

export const isOverflowing = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
}