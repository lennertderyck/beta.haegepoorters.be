import React from 'react';
import { useVisitor } from '../../contexts/visitorContext';
import { className } from '../../utils';
import Button from '../Button';

const LogoutButton = ({ className: cls }) => {
    const { logout } = useVisitor()

    return <div {...className([
        'flex justify-center',
        cls
    ])}>
        <Button theme="simple" iconAfter="logout-circle-r" onClick={() => {
            logout({ redirectUri: window.location.origin +  '/ga' })
        }}>Afmelden</Button>
    </div> 
}

export default LogoutButton;