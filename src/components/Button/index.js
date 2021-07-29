import React from 'react';
import { Link } from 'react-router-dom';
import { className } from '../../utils';

const Button = ({ children, href, to, className: cls, theme, ...otherProps}) => {
    const styles = {
        global: 'block w-fit',
        simple: 'text-xs font-semibold uppercase tracking-widest'
    }

    if (to) return (
        <Link 
            to={ to }
            { ...otherProps } 
            { ...className(
                'block',
                cls,
                theme && styles[theme]
            )}
        >{ children }</Link>
    )
    if (href) return (
        <a 
            href={ href } 
            { ...otherProps } 
            { ...className(
                styles.global, 
                styles.simple, 
                cls
            )}
        >{ children }</a>
    )
}

export default Button