import classNames from 'classnames';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    overlay?: boolean;
};

const Dialog: FC<Props> = ({ children, className, overlay, ...otherProps }) => {
    return (
        <div 
            className={classNames(
                'fixed inset-0 z-40 xl:p-12 flex items-end justify-end',
                overlay && 'bg-black bg-opacity-30 xl:bg-transparent',
                className
            )}
            { ...otherProps }
        >
            <div className="bg-white shadow-lg w-full xl:max-w-[500px] border-t-2 border-gray-200">
                { children }
            </div>
        </div>
    )
}

export default Dialog;