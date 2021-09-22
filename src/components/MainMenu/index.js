import React, { useRef, useState, memo } from 'react';
import useHover from '@react-hook/hover'
import Fade from 'react-reveal/Fade';
import { useMediaQuery } from 'react-responsive'

import Icon from '../Icon';
import Logo from '../Logo';
import { mainNav } from '../../data/nav';
import { className, cookieHook } from '../../utils';
import styles from './MainMenu.module.scss';
import Button from '../Button';
import Modal from '../Modal';
import Form, { Input } from '../Form';
import { useEffect } from 'react';
import { useVisitor } from '../../contexts/visitorContext';
import { useNetwork } from '../../contexts/networkContext';
import SignInMessage from '../SignInMessage';

const MenuItem = memo(({ slug, label, icon, open, disabled, ...otherProps }) => <Button 
    to={ slug } 
    theme="clear"
    { ...className(
        'py-5 pl-5 flex border-b-2 border-gray-200',
        disabled && 'opacity-50 cursor-default'
    )}
    disabled= { disabled }
    { ...otherProps }
>
    <Icon name={ icon } size="1.5rem" color={ '#4b5563' } className="mr-5" />
    <div { ...className(
        'overflow-hidden text-gray-600 flex items-center justify-between w-full',
        open && 'max-w-screen opacity-100',
        !open && 'max-w-0 opacity-0'
    )}>
        <span className="mr-28 font-medium whitespace-nowrap">{ label }</span>
        <Icon name="arrow-right" size="1.2rem" className="block ml-auto mr-5" />
    </div>
</Button>)

const RoleSelector = memo(({ menuOpen }) => {
    const [ open, setOpen ] = useState(false)
    const { role, profile } = useVisitor()
    
    useEffect(() => {
        setOpen(false)
    }, [ menuOpen ])
    
    return (
        <div className="flex pr-4 cursor-pointer">
            <div className="mr-2">
                <div className="text-right transform -translate-y-0.5">
                    <span className="font-serif opacity-70 -mb-1 block whitespace-nowrap">ik ben </span>
                    <div className="text-xs uppercase tracking-wider font-medium whitespace-nowrap">
                        { role.label }
                    </div>
                </div>
            </div>
            <Icon size="1.2rem" name="settings-4" className="mt-2.5" />
        </div>
    )
});

const MainMenu = () => {
    const [ open, setOpen ] = useState(false)
    const container = useRef()
    const [ toggleModal, setToggleModal ] = useState()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const { siteGroups, setRole, role, skipSignIn, skippedSignIn } = useVisitor()
    const isHovered = useHover(container)
    const { status } = useNetwork()
        
    useEffect(() => {
        if (isHovered) setOpen(true)
        else setOpen(false)
    }, [isHovered])
    
    const handleSigninSkip = () => {
        skipSignIn(true)
    }
    
    const handleSignInForced = () => {
        skipSignIn(false)
    }
    
    return (
        <>
            <Modal disableOverlayClick open={ toggleModal } title={ skippedSignIn ? 'Kies een tak' : 'Meld je aan bij de Groepsadministratie' }>
                {({ toggle }) => (<>
                    { !skippedSignIn && <SignInMessage />}
                    { skippedSignIn && (<>
                        <div className="pb-6">
                            { siteGroups.filter(({ isGroup, value }) => isGroup ).map(({ label, value }, index) => (
                                <Button
                                    key={ index }
                                    onClick={() => {
                                        setRole(value)
                                        // setToggleModal(false)
                                    }}
                                    {...className(
                                        'py-4 border-b-2 w-full font-serif text-lg capitalize bg-opacity-20 px-4 last:border-b-0',
                                        role.value === value ? 'bg-red-500 text-red-500' : 'bg-white border-gray-200'
                                    )}
                                >
                                    <Icon name="check" {...className(
                                        'mr-4',
                                        role.value === value ? 'opacity-100' : 'opacity-0'
                                    )} size="1.4rem" color={ null } />
                                    <span className="font-semibold">{ label }</span>
                                </Button>
                            ))}
                            <Form className="mt-8">
                                <h4 className="mb-2">Ik ben ook ...</h4>
                                <div className="flex -mb-6">
                                    <Input type="radio" name="subrole" label="ouder" className="mr-4" />
                                    <Input type="radio" name="subrole" label="leiding" />
                                </div>
                            </Form>
                        </div>
                        <div className="sticky bottom-0 bg-white">
                            <hr className="mb-4" />
                            <h4 className="mb-4 text-lg">Krijg toegang tot alle handige functies</h4>
                            <Button 
                                className="border-2 border-red-500 p-3 text-red-500 flex-1 w-full justify-center"
                                onClick={ handleSignInForced }
                            >Aanmelden bij Groepsadministratie</Button>
                        </div>
                    </>)}
                </>)}
            </Modal>
            <Button 
                className="fixed top-4 right-4 z-40 w-12 h-12 bg-red-500 p-3 rounded-full shadow flex items-center justify-center lg:hidden"
                onClick={() => setOpen(p => !p)}
            >
                <Icon name="menu" size="1.2rem" color="white" />
            </Button>
            <div 
                { ...className(
                    'bg-white h-screen fixed top-0 z-30 transform lg:translate-x-0',
                    open && 'shadow-xl translate-x-0',
                    !open && '-translate-x-screen-x'
                )}
                ref={ container }
                onMouseMove={() => setOpen(true)}
            >
                <div className="flex justify-between">
                    <Button theme="clear" to="/" className="block p-3 bg-red-500 h-fit" onClick={() => setOpen(false)}>
                        <Logo width="44.5px" />
                    </Button>
                    <div { ...className(
                        'overflow-hidden flex justify-end py-3',
                        open && 'max-w-screen',
                        !open && 'max-w-0'
                    )}>
                        <Fade when={ open } duration={ 500 }> 
                            {/* <Button onClick={() => setToggleModal(p => !p)}>
                                <RoleSelector menuOpen={ open } />
                            </Button> */}
                            <Button to="/profiel" theme="clean">
                                <RoleSelector menuOpen={ open } />
                            </Button>
                        </Fade>
                    </div>
                </div>
                <div className="border-r-2 border-gray-200 h-full">
                    <div className="">
                        { mainNav.map(({ icon, slug, label, offlineSupport }, index) => (
                            <MenuItem
                                icon={ icon }
                                slug={ slug }
                                label={ label }
                                open={ open || isTabletOrMobile }
                                key={ index }
                                disabled={ status === 'offline' && !offlineSupport }
                                onClick={() => setOpen(false)}
                            />
                        ))}
                    </div>
                    <MenuItem
                        icon="search-2"
                        slug="/zoeken"
                        label="Zoeken"
                        open={ open || isTabletOrMobile  }
                        disabled={ status === 'offline' }
                        onClick={() => setOpen(false)}
                    />
                </div>
            </div>
            { open && <div
                onClick={ e => setOpen(false) }
                { ...className(styles.backdrop, 'w-screen h-screen fixed top-0 bottom-0 left-0 right-0 z-20 bg-black')} 
            />}
        </>
    )
}

// 74px

export default MainMenu