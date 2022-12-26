import { ButtonHTMLAttributes, FC } from 'react';
import Icon from '../Icon/Icon';
import { className } from '../../../utils/funcs/dom';
import ButtonBase from './ButtonBase';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string;
    icon?: string;
    iconPlacement?: 'start' | 'end';
    theme?: 'button' | 'simple';
};

const Button: FC<Props> = ({ children, theme = 'button', icon, iconPlacement = 'end', className: cls, ...otherProps }) => {
    const iconClasses = [
        iconPlacement === 'end' ? 'flex-row' : 'flex-row-reverse'
    ];
    
    const themes = {
        'button': '',
        'simple': 'w-fit text-xs text-red-500 font-semibold uppercase tracking-widest ',
    }
    
    return (
        <ButtonBase 
            { ...className(
                cls,
                iconClasses,
                themes[theme]
            )} 
            { ...otherProps }
        >
            <span>{ children }</span>
            { icon && <Icon name={ icon } size="1rem" className="ml-1" />}
        </ButtonBase>
    )
}

export default Button;