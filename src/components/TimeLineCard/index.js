import React from 'react';

import { Icon } from '..';
import { className } from '../../utils';

const TimeLineCard = ({ children, className: cls, draggable }) => {
    return (
        <div className="pb-8 pl-8 relative">
            { draggable ? 
                draggable : 
                <div className="absolute -left-1.5 top-2 w-3 h-3 bg-red-500 border-2 border-red-500 rounded-full" />
            }
            <div 
                { ...className(cls) }
            >{ children }</div>
        </div>
    )
}

export default TimeLineCard