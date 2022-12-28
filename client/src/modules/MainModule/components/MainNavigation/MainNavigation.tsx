import { FC } from 'react';
import { Icon, Logo } from '../../../../components/basics';
import { useCollapseState } from '../../../../utils/hooks';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

interface Props {};

const MainNavigation: FC<Props> = () => {
    const [ active, { open, close }] = useCollapseState();
    
    const menuItems = [
        { label: 'Startpagina', to: '/', icon: 'home-5' },
        { label: 'Haegeprekerke', to: '/haegeprekerke', icon: 'book-3' },
        { label: 'Nieuws & blog', to: '/blog', icon: 'newspaper' },
        { label: 'Leiding', to: '/leiding', icon: 'team' },
        { label: 'HP Renové', to: '/vzw', icon: 'hammer' },
        { label: 'Contact', to: '/contact', icon: 'chat-4' },
    ]
    
    return (
        <>
            <div className="w-[68.5px]" />
            <aside className="fixed left-0 top-0 bottom-0 border-r-2 bg-white z-50" onMouseOver={() => open()} >
                <div className="flex items-center justify-between">
                    <button className="block p-3 bg-red-500 h-fit">
                        <Logo width="44.5px" />
                    </button>
                    <div className={classNames(
                        'overflow-hidden',
                        active ? 'opacity-100 max-w-[100vw]' : 'opacity-0 max-w-[0vw]'
                    )}>
                        <Link to="/groepsadmin" className="flex items-center gap-2 px-5">
                            <div>
                                <div className="text-right font-serif text-gray-400 -mb-1 block whitespace-nowrap">Groepsadministratie</div>
                                <div className="text-right text-xs uppercase tracking-wider font-medium whitespace-nowrap">Aanmelden</div>
                            </div>
                            <Icon name="account-circle" />
                        </Link>
                    </div>
                </div>
                <nav>
                    { menuItems.map((item, index) => (
                        <NavLink 
                            key={ index }
                            to={ item.to }
                            className={({ isActive }) => classNames(
                                'flex items-center p-5 border-b-2 border-gray-200',
                                active ? 'border-opacity-100' : 'border-opacity-0',
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
                                        active ? 'opacity-100 max-w-[100vw] pl-5' : 'opacity-0 max-w-[0vw] pl-0',
                                        isActive ? 'text-red-500' : 'text-gray-600'
                                    )}>
                                        <span className="font-medium whitespace-nowrap">{ item.label }</span>
                                        <Icon name="arrow-right" size="1.2rem" />
                                    </div>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <div 
                onMouseOver={() => active && close()}
                className={classNames(
                    'fixed inset-0 bg-black z-40',
                    active ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
                )} 
            />
        </>
    )
}

export default MainNavigation;