import { FC, useMemo } from 'react';
import { Icon, Logo } from '../../../../components/basics';
import { useCollapseState } from '../../../../utils/hooks';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItem';
import { useDevice } from 'use-ua-parser-js';
import { useMediaQuery } from 'react-responsive'
import Toggle from './Toggle';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';

interface Props {};

const MainNavigation: FC<Props> = () => {
    const platformIdentity = useKeycloakStore(store => store.instance.userInfo);
    const [ active, { open, close, toggle }] = useCollapseState();
    const device = useDevice();
    const isTouch = useMemo(() => {
        return device.type === 'mobile' || device.type === 'tablet';
    }, [device.type])
    const isLargeScreen = useMediaQuery({
        query: '(min-width: 1024px)'
    });
    
    console.log('platformIdentity', platformIdentity)
    
    const menuItems = [
        { label: 'Startpagina', to: '/', icon: 'home-5' },
        { label: 'Haegeprekerke', to: '/haegeprekerke', icon: 'book-3' },
        { label: 'Nieuws & blog', to: '/blog', icon: 'newspaper' },
        { label: 'Leiding', to: '/leiding', icon: 'team' },
        { label: 'HP Renové', to: '/vzw', icon: 'hammer' },
        { label: 'Contact', to: '/contact', icon: 'chat-4' },
    ]
    
    const menuBottomItems = [
        { label: 'Digitale lidkaart', to: '/ga/digitale-lidkaart', icon: 'bank-card' },
        // { label: 'Zoeken', to: '/zoeken', icon: 'search' },
    ]
    
    return (
        <>
            <Toggle onClick={ toggle } />
            {/* <button  className="flex items-center whitespace-nowrap fixed top-4 right-4 z-50 w-12 h-12 bg-red-500 p-3 rounded-full shadow justify-center lg:hidden cursor-pointer">
                <Icon name="menu" className="text-white" />
            </button> */}
            <div className="lg:w-[68.5px]" />
            <aside 
                className={classNames(
                    'fixed left-0 top-0 bottom-0 border-r-2 bg-white z-50',
                    'flex flex-col',
                    active ? '-translate-x-0' : '-translate-x-full lg:-translate-x-0'
                )} 
                onMouseOver={() => open()} 
            >
                <div className="flex items-center justify-between">
                    <button className="block p-3 bg-red-500 h-fit">
                        <Logo width="44.5px" />
                    </button>
                    <NavLink to="/ga" className={({ isActive }) => classNames(
                        'overflow-hidden w-full h-full flex-1 flex justify-end bg-red-100',
                        active ? 'opacity-100 max-w-[100vw]' : 'lg:opacity-0 lg:max-w-[0vw]',
                        isActive ? 'bg-opacity-100' : 'bg-opacity-0'
                    )}>
                        {({ isActive }) => (
                            <div className={classNames(
                                'flex-1 flex items-center justify-end gap-2 px-5',
                                isActive ? 'text-red-500' : 'text-gray-500'
                            )}>
                                <button onClick={ close }>
                                    <div className="text-right font-serif opacity-70 -mb-1 block whitespace-nowrap">Groepsadministratie</div>
                                    <div className="text-right text-xs uppercase tracking-wider font-medium whitespace-nowrap">Aanmelden</div>
                                </button>
                                <Icon name="account-circle" />
                            </div>
                        )}
                    </NavLink>
                </div>
                <nav className="flex-1 flex flex-col">
                    <div className="flex-1">
                        { menuItems.map((item, index) => (
                            <NavItem onClick={() => (isTouch || !isLargeScreen) && close()} key={ index } item={ item } active={ active } />
                        ))}
                    </div>
                    <div>
                        { menuBottomItems.map((item, index) => (
                            <NavItem onClick={() => (isTouch || !isLargeScreen) && close()} key={ index } item={ item } active={ active } />
                        ))}
                    </div>
                </nav>
            </aside>
            <div 
                onMouseOver={() => active && isLargeScreen && close()}
                onClick={() => close()}
                className={classNames(
                    'fixed inset-0 bg-black z-40',
                    active ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
                )} 
            />
        </>
    )
}

export default MainNavigation;