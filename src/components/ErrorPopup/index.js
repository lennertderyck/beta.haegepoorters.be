import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

const ErrorPopup = () => {
    const [ isOpen, setOpen ] = useState(false)
    
    const errorHandeler = e => {
        const { filename, message } = e;
        console.log(
            'An error was detected. More details below \n',
            '\t' + filename + '\n',
            '\t' + message
        );
        e.preventDefault();
        setOpen(true);
        
        return false;
    }
    
    useEffect(() => {
        window.addEventListener('error', errorHandeler);
        
        return () => window.removeEventListener('error', errorHandeler);
    }, [])
    
    return (
        <Modal title="Oeps, dat ging fout" open={ isOpen } onClose={() => setOpen(false)} disableClose disableOverlayClick>
            {({ toggle }) => <>
                {/* <h4 className="font-medium text-lg">We detecteerden een foutje</h4> */}
                <p className="mb-2">
                    Onze webmasters werden op de hoogte gebracht en brengen dit spoedig in orde!
                    Herlaad de pagina om verder te gaan.
                </p>
                <div className="flex mt-4">
                    {/* <Button theme="button" className="mr-4" onClick={() => toggle(false)}>Bericht sluiten</Button> */}
                    <Button theme="button" onClick={() => window.location.reload()}>Herlaad pagina</Button>
                </div>
            </>}
        </Modal>
    )
}

export default ErrorPopup