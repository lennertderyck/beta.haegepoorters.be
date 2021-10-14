import React from 'react';
import { Link } from 'react-router-dom';
import { className } from '../../utils';
import Icon from '../Icon';

const Button = ({ children, href, to, className: cls, theme, icon, iconAfter, disabled, ...otherProps}) => {
    const styles = {
        global: 'flex items-center w-fit',
        clear: '',
        simple: 'text-xs font-semibold uppercase tracking-widest text-red-500',
        button: 'w-fit px-3 py-2 uppercase tracking-widest font-semibold text-xs bg-red-100 text-red-500',
        list: 'w-full h-full p-4 justify-between uppercase tracking-widest font-semibold text-sm bg-red-100 text-red-500'
    }
    
    const iconColor = {
        button: '#6f101d'
    }
    
    const iconConfig = {
        size: ".95rem",
        color: iconColor[theme] || styles['button']
    }
    
    const catchDisabled = (target) => !disabled && target
    
    const inside = <>
        { icon && <Icon 
            name={ icon } 
            className="-ml-1 mr-1.5" 
            { ...iconConfig }
        />}
        { children }
        { iconAfter && <Icon
            name={ iconAfter } 
            className="-mr-1 ml-1.5" 
            { ...iconConfig }
        />}
    </>

    if (to) return (
        <Link
            to={ catchDisabled(to) }
            { ...otherProps } 
            { ...className(
                'flex items-center',
                cls,
                theme ? styles[theme] : styles['button'],
            )}
        >
            { inside }
        </Link>
    )
    if (href) return (
        <a 
            href={ catchDisabled(href) } 
            { ...otherProps } 
            { ...className(
                styles.global, 
                theme ? styles[theme] : styles['simple'],
                cls
            )}
        >{ inside }</a>
    )
    return <button
        { ...otherProps } 
        { ...className(
            'flex items-center',
            cls,
            styles[theme]
        )}
    >{ inside }</button>
}

export default Button