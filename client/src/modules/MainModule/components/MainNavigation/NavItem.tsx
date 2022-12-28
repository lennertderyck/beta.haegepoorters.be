import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../../../components/basics';

interface Props {
    active: boolean;
    item: any;
};

const NavItem: FC<Props> = ({ active, item }) => {
    return (
        <NavLink 
            to={ item.to }
            className={({ isActive }) => classNames(
                'flex items-center p-5 border-b-2 border-gray-200',
                active ? 'border-opacity-100' : 'xl:border-opacity-0',
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
                        active ? 'opacity-100 max-w-[100vw] pl-5' : 'xl:opacity-0 xl:max-w-[0vw] pl-5 xl:pl-0',
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