import { ButtonHTMLAttributes, FC, useCallback } from 'react';
import Icon from '../Icon/Icon';
import { className } from '../../../utils/funcs/dom';
import ButtonBase from './ButtonBase';
import { useNavigate } from 'react-router-dom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string;
    href?: string;
    icon?: string;
    iconPlacement?: 'start' | 'end';
    theme?: 'button' | 'simple';
};

const Button: FC<Props> = ({ children, theme = 'button', icon, iconPlacement = 'end', className: cls, to, onClick, href, ...otherProps }) => {
    const navigate = useNavigate();
    
    const iconClasses = [
        iconPlacement === 'end' ? 'flex-row' : 'flex-row-reverse'
    ];
    
    const themes = {
        'button': 'w-fit text-xs text-red-500 font-semibold uppercase tracking-widest pl-2 pr-3 py-2 bg-red-100',
        'simple': 'w-fit text-xs text-red-500 font-semibold uppercase tracking-widest',
    }
    
    const handleClick = useCallback((event: any) => {
        if (to) navigate(to);
        else if (href) window.open(href, '_blank');
        else if (onClick) onClick(event);
    }, [ to, href, onClick ])
    
    return (
        <ButtonBase
            onClick={ handleClick }
            { ...className(
                'gap-1.5',
                cls,
                iconClasses,
                themes[theme]
            )} 
            { ...otherProps }
        >
            <span>{ children }</span>
            { icon && <Icon name={ icon } size="1rem" />}
        </ButtonBase>
    )
}

export default Button;