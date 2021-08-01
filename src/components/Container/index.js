import React from 'react';
import { className } from '../../utils';

const Container = ({ wide = false, className: cls, children }) => {
    return (
        <div { ...className(
            'container px-8 lg:px-0',
            cls,
            !wide && 'container-md'
        )}>
            { children }
        </div>
    )
}

export default Container