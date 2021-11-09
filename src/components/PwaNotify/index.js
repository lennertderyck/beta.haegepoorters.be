import React from 'react';
import { Modal, Button, Icon } from '..';
import { useVisitor } from '../../contexts/visitorContext';
import { cookieHook } from '../../utils';

const PwaNotify = () => {
    const { pwaInstaller } = useVisitor()
    const isIgnored = cookieHook.get('pwaNotify') === 'ignore';
    
    const handleIgnore = () => {
        cookieHook.set('pwaNotify', 'ignore')
    }
    
    const handleInstall = () => {
        pwaInstaller()
    }
    
    if (isIgnored || !pwaInstaller) return null
    
    return <Modal open={ true } bottom disableClose>
        {({ handleManualClose }) => (
            <div className="flex flex-col items-center">
                <div className="flex-grow w-24 mb-8">
                    <img src="/logo512.png" alt="" className="w-24 h-24 shadow-lg rounded-lg" />
                </div>
                <h3 className="mb-5">Installeer onze app!</h3>
                <div className="flex-shrink mb-4 text-center">
                    <div className="mb-6">
                        <Icon name="map-pin-range" size="1.5rem" className="mb-1" color="#661A20" />
                        <p>Vind onze website makkelijk terug</p>
                    </div>
                        
                    <div className="mb-6">
                        <Icon name="thumb-up" size="1.5rem" className="mb-1" color="#661A20" />
                        <p>Niks te downloaden</p>
                        <p className="font-serif">Je browser maakt een snelkoppeling op je startscherm zoals bij een gewone app</p>
                    </div>
                        
                    <div className="mb-6">
                        <Icon name="arrow-right-up" size="1.5rem" className="mb-1" color="#661A20" />
                        <p>Blijf drukken op ons logo op je startscherm</p>
                        <p className="font-serif">En gebruik handige snelkoppelingen</p>
                    </div>
                        
                    <Button 
                        className="border-2 border-red-500 p-3 text-red-500 flex-1 w-full justify-center"
                        onClick={() => {
                            handleInstall()
                            handleManualClose()
                        }}
                    >Installeren</Button>
                </div>
                <Button theme="simple" className="text-gray-300" onClick={() => {
                    handleIgnore()
                    handleManualClose()
                }}>Nee bedankt</Button>
            </div>
        )}
    </Modal>
}

export default PwaNotify