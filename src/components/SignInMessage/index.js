import React from 'react';
import { useVisitor } from '../../contexts/visitorContext';
import Button from '../Button';

const SignInMessage = () => {
    const { skipSignIn, initKeycloak } = useVisitor()
    
    const handleSigninSkip = () => {
        skipSignIn(true)
    }
    
    return (
        <>
            <p>Zo krijg je toegang to een aantal handige functies</p>
            <ul className="list-disc font-serif list-inside mt-4">
                <li>Bekijk en bewerk persoonlijke gegevens</li>
                <li>We vullen automatisch je persoonlijke gegevens aan in formulieren</li>
                <li>We personaliseren onze website op basis van je profiel</li>
            </ul>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-6 font-lg">
                <Button 
                    className="border-2 border-red-500 p-3 text-red-500 flex-1 w-full justify-center"
                    onClick={ initKeycloak }
                >aanmelden</Button>
                <div className="my-3 mx-4">of</div>
                <Button 
                    className="border-2 border-red-500 p-3 text-red-500 flex-1 w-full justify-center opacity-40 hover:opacity-100"
                    onClick={ handleSigninSkip }
                >verder gaan zonder aanmelden</Button>
            </div>
                        
            <p className="text-sm font-serif mt-6">* We slaan je gegevens nergens anders dan de Groepsadministratie, het officiële ledenheerplatform van Scouts en Gidsen Vlaanderen</p>
        </>
    )
}

export default SignInMessage