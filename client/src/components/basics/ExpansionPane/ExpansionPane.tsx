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
                active ? 'opacity-100 max-h-screen py-2' : 'opacity-0 max-h-[0vh] py-0',
                cls
            )} 
            { ...otherProps }
        >
            
        </div>
    )
}

export default ExpansionPane;