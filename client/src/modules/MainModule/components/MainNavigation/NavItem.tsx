import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../../../components/basics';

interface Props {
    active: boolean;
    item: any;
    onClick?: () => void;
};

const NavItem: FC<Props> = ({ active, item, onClick }) => {    
    return (
        <NavLink 
            onClick={() => onClick?.()}
            to={ item.to }
            className={({ isActive }) => classNames(
                'flex items-center p-5 border-b-2 border-gray-200',
                active ? 'border-opacity-100' : 'lg:border-opacity-0',
                isActive && 'bg-red-100'
            )}
        >
            {({ isActive }) => (
                <>
                    <Icon name={ item.icon } size="1.5rem" className={classNames(
                        isActive ? 'text-red-500' : 'text-gray-600'
                    )} />
                    <div className={classNames(
                        'overflow-hidden flex-1 flex items-center justify-between gap-28',
                        active ? 'opacity-100 max-w-[100vw] pl-5' : 'lg:opacity-0 lg:max-w-[0vw] pl-5 lg:pl-0',
                        isActive ? 'text-red-500' : 'text-gray-600'
                    )}>
                        <span className="font-medium whitespace-nowrap">{ item.label }</span>
                        <Icon name="arrow-right" size="1.2rem" />
                    </div>
                </>
            )}
        </NavLink>
    )
}

export default NavItem;