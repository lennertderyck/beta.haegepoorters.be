import classNames from 'classnames';
import { FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';

interface ResponsiveValues<T = number> {
    default: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

interface GridWrapperProps extends PropsWithChildren {
    span?: undefined;
    gap: number | ResponsiveValues;
};
interface GridColumnProps extends PropsWithChildren {
    span: number | ResponsiveValues;
    gap?: undefined;
}

type ConditionalGridLayoutProps = GridWrapperProps | GridColumnProps;

type Props = PropsWithChildren & ConditionalGridLayoutProps & HTMLAttributes<HTMLDivElement>;

const Grid: FC<Props> = ({ children, gap, span, className, ...otherProps }) => {
    const isContainer = !span;
    
    const mapResponsiveValues = (span: ResponsiveValues, prefix: string) => {
        return Object.entries(span)
            .reduce<string>((acc, [breakpoint, value]) => {
                const composedBreakpointPrefix = breakpoint === 'default' ? '' : breakpoint + ':';
                const composedColSpan = composedBreakpointPrefix + `${ prefix }-${value}`;
                const accumulator = !!acc ? acc + ' ' : acc;
                return accumulator + composedColSpan;
            }, '')
    }
    
    const gapClassName = useMemo(() => {
        if (!gap) return null;
        
        const isResponsive = typeof gap === 'object';
        if (isResponsive) return mapResponsiveValues(gap, 'gap');
        else return 'gap-' + gap;
    }, [gap])
    
    const baseClassNames = useMemo<string>(() => {
        const isResponsive = typeof span === 'object';
        if (isContainer) return 'grid grid-cols-12';
        else if (isResponsive) return mapResponsiveValues(span, 'col-span');
        else return 'col-span-' + span;
    }, [isContainer, span]);
    
    return (
        <div 
            className={classNames(
                gapClassName,
                baseClassNames,
                className
            )}
            { ...otherProps }
        >
            { children }
        </div>
    )
}

export default Grid;