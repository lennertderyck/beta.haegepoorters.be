import { FC, HTMLAttributes } from 'react';
import { className } from '../../../utils/funcs/dom';

interface Props extends HTMLAttributes<HTMLDivElement> {
    active: boolean;
};

const ExpansionPane: FC<Props> = ({ className: cls, active, ...otherProps }) => {
    return (
        <div 
            { ...className(
                'overflow-hidden',
                active ? 'opacity-100 max-h-screen translate-y-0' : 'opacity-0 max-h-[0vh] translate-y-2',
                cls
            )} 
            { ...otherProps }
        >
            
        </div>
    )
}

export default ExpansionPane;