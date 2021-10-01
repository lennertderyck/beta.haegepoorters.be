import React from 'react'
import CenterMessage from '../CenterMessage'
import LogoutButton from '../LogoutButton'

const NotMemeberMsg = () => {
    return (<div className="flex items-center justify-center h-full">
        <CenterMessage
            intro="Je bent geen lid"
            icon="user-unfollow"
        >
            <p>Je bent geen lid van onze groep, maar wel aangemeld met de groepsadmin.</p>
            <p className="font-semibold">Meld je eerst af om verder te gaan</p>
            <LogoutButton className="mt-6" />
        </CenterMessage>
    </div>)
}

export default NotMemeberMsg