import React, { useRef, useState, memo } from 'react';
import useHover from '@react-hook/hover'
import Fade from 'react-reveal/Fade';
import { useMediaQuery } from 'react-responsive'
import { useRouteMatch } from 'react-router';

import Icon from '../Icon';
import Logo from '../Logo';
import { mainNav } from '../../data/nav';
import { className } from '../../utils';
import styles from './MainMenu.module.scss';
import Button from '../Button';
import Modal from '../Modal';
import Form, { Input } from '../Form';
import { useEffect } from 'react';
import { useVisitor } from '../../contexts/visitorContext';
import { useNetwork } from '../../contexts/networkContext';
import SignInMessage from '../SignInMessage';
import Collapse from '../Collapse';

const MenuItem = memo(({ slug, label, icon, open, disabled, ignoreActiveClass, ...otherProps }) => {
    const match = useRouteMatch(slug)

    const isCurrent = match && (match.path !== '/' || match.path === '/' && match.isExact);

    return <Button 
        to={ slug } 
        theme="clear"
        { ...className(
            'py-5 pl-5 flex border-b-2 border-gray-200',
            open ? 'border-opacity-100' : 'border-opacity-0',
            disabled && 'opacity-50 cursor-default',
            // open ? 'border-opacity-100' : 'border-opacity-0'
        )}
        disabled= { disabled }
        activeClassName={ isCurrent && 'bg-red-100' }
        { ...otherProps }
    >
        <Icon name={ icon } size="1.5rem" color={ isCurrent ? '#5E1A1C' : '#4b5563' } className="mr-5" />
        <div { ...className(
            'overflow-hidden text-gray-600 flex items-center justify-between w-full',
            open && 'max-w-screen opacity-100',
            !open && 'max-w-0 opacity-0'
        )}>
            <span
                { ...className(
                    'mr-28 font-medium whitespace-nowrap',
                    isCurrent && 'text-red-500'
                )}
            >{ label }</span>
            <Icon name="arrow-right" size="1.2rem" color={ isCurrent && '#5E1A1C' } { ...className('block ml-auto mr-5' )} />
        </div>
    </Button>
})

const RoleSelector = memo(({ menuOpen }) => {
    const [ ,setOpen ] = useState(false)
    const { profile, _keycl } = useVisitor()
    
    useEffect(() => {
        setOpen(false)
    }, [ menuOpen ]) // eslint-disable-line
    
    return (
        <div className="flex pr-4 cursor-pointer">
            <div className="mr-2">
                <div className="text-right transform -translate-y-0.5">
                    { _keycl.token || process.env.NODE_ENV === 'development' ? 
                        <>
                            <span className="font-serif opacity-70 -mb-1 block whitespace-nowrap">Je account</span>
                            <div className="text-xs uppercase tracking-wider font-medium whitespace-nowrap">
                                { profile?.vgagegevens.voornaam }
                            </div>
                        </> : <>
                            <span className="font-serif opacity-70 -mb-1 block whitespace-nowrap">Je account</span>
                            <div className="text-xs uppercase tracking-wider font-medium whitespace-nowrap">
                                Aanmelden
                            </div>
                        </>
                    }
                </div>
            </div>
            <Icon size="1.2rem" name="account-circle" className="mt-2.5" />
        </div>
    )
});

const MainMenu = () => {
    const [ open, setOpen ] = useState(false)
    const container = useRef()
    const [ toggleModal ] = useState()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const { siteGroups, setRole, role, skipSignIn, skippedSignIn } = useVisitor()
    const isHovered = useHover(container)
    const { status } = useNetwork()
    const localStoredMemberCard = JSON.parse(localStorage.getItem('memberCard'));
        
    useEffect(() => {
        if (isHovered) setOpen(true)
        else setOpen(false)
    }, [isHovered])
    
    // const handleSigninSkip = () => {
    //     skipSignIn(true)
    // }
    
    return (
        <>       
            <Button 
                className="fixed top-4 right-4 z-40 w-12 h-12 bg-red-500 p-3 rounded-full shadow flex items-center justify-center lg:hidden print:hidden"
                onClick={() => setOpen(p => !p)}
            >
                <Icon name="menu" size="1.2rem" color="white" />
            </Button>
            <div 
                { ...className(
                    'bg-white h-screen fixed top-0 z-30 transform lg:translate-x-0 overflow-y-scroll scrollbar-none border-r-2 border-gray-200 flex flex-col',
                    open && 'shadow-xl translate-x-0',
                    !open && '-translate-x-screen-x'
                )}
                ref={ container }
                onMouseMove={() => setOpen(true)}
            >
                <div className="flex justify-between bg-white sticky top-0">
                    <Button theme="clear" to="/" className="block p-3 bg-red-500 h-fit" onClick={() => setOpen(false)}>
                        <Logo width="44.5px" />
                    </Button>
                    <div { ...className(
                        'overflow-hidden flex justify-end py-3',
                        open && 'max-w-screen',
                        !open && 'max-w-0'
                    )}>
                        <Fade when={ open } duration={ 500 }> 
                            <Button to="/account" theme="clean" onClick={() => setOpen(false)}>
                                <RoleSelector menuOpen={ open } />
                            </Button>
                        </Fade>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col lg:h-full">
                        <Fade right duration={ 700 } cascade mirror className="lg:flex-1">
                            <div className="lg:flex-1">
                                { mainNav.map(({ icon, slug, label, offlineSupport, ignoreActiveClass }, index) => (
                                    <MenuItem
                                        icon={ icon }
                                        slug={ slug }
                                        label={ label }
                                        open={ open || isTabletOrMobile }
                                        key={ index }
                                        disabled={ status === 'offline' && !offlineSupport }
                                        onClick={() => setOpen(false)}
                                        ignoreActiveClass={ ignoreActiveClass }
                                    />
                                ))}
                            </div>
                            <div>
                                { localStoredMemberCard && (
                                    <div className="mt-auto">
                                        <MenuItem
                                            icon="bank-card"
                                            slug="/ga/digitale-lidkaart"
                                            label="Jouw lidkaart"
                                            open={ open || isTabletOrMobile  }
                                            disabled={ status === 'offline' }
                                            onClick={() => setOpen(false)}
                                        />
                                    </div>
                                )}
                                <MenuItem
                                    icon="search-2"
                                    slug="/zoeken"
                                    label="Zoeken"
                                    open={ open || isTabletOrMobile  }
                                    disabled={ status === 'offline' }
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                        </Fade>
                    </div>
                    
                    {/* STICKY WHITE OVERFLOW GRADIENT */}
                    { isTabletOrMobile && <div className="h-14 w-full sticky bottom-0 bg-gradient-to-t from-white to-transparent" />}
                </div>
            </div>
            
            {/* BACKDROP */}
            { open && <div
                onClick={ e => setOpen(false) }
                { ...className(styles.backdrop, 'w-screen h-screen fixed top-0 bottom-0 left-0 right-0 z-20 bg-black')} 
            />}
        </>
    )
}

// 74px

export default MainMenu