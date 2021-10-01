import React, { useState, useEffect } from 'react'
  
import { useShare } from '../../hooks'
import Button from '../Button'

const ShareService = () => {
    const [ attempts, setAttempt ] = useState(0)
    const [ showMsg, setShowMsg ] = useState(false)
    const { share, error, status, method } = useShare()
    
    const handleShare = () => {
        if (attempts !== 2) {
            share({ title: 'Haegepoorters Destelbergen', text: 'Over onze nieuwe website' })
        } else share({ method: 'copy' })
    }
    
    const handleRetry = () => {
        if (attempts !== 2) {
            handleShare()
            setAttempt(p => p + 1)
        } else share({ method: 'copy' })
    }
    
    useEffect(() => {
        if (attempts === 0) setShowMsg(true)
    }, [error])
    
    return <div className="mt-8">
        {( !error && (status === 'idle' || (status === 'loading' && attempts === 0))) && <Button 
                theme="simple" 
                icon="share-box"
                onClick={ handleShare }
            >
                Deel deze pagina
            </Button> 
        }
        { status === 'success' && (
            <div className="p-4 bordere-gray-200 border-2 mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between" onClick={ handleShare }>
                <p className="text-sm lg:max-w-1/2 mb-4 lg:mb-0">
                    { method === 'clipboard' && 'We hebben de link naar deze pagina gekopieerd naar je klembord, plak waar nodig.'}
                    { method === 'api' && 'Pagina gedeeld'}
                </p>
                <Button theme="simple" iconAfter="refresh">
                    { method === 'clipboard' && 'Opnieuw kopieren'}
                    { method === 'api' && 'Nog eens delen'}
                </Button>
            </div>
        )}
        {(( error || attempts !== 0) && attempts !== 2 ) && <div className="p-4 bordere-gray-200 border-2 mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between" onClick={ handleRetry }>
            <p className="text-sm lg:max-w-1/2 mb-4 lg:mb-0">Lukte het delen van deze pagina niet?</p>
            <Button theme="simple" iconAfter="refresh">Probeer het opnieuw</Button>
        </div> }
        {( attempts === 2 && status === 'error' ) && <div className="p-4 bordere-gray-200 border-2 mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between" onClick={ handleRetry }>
            <p className="text-sm lg:max-w-1/2 mb-4 lg:mb-0">Delen via je deelmenu lukte niet, je kan de link van deze pagina wel kopieren</p>
            <Button theme="simple" icon="clipboard" onClick={ handleRetry }>Link kopieren</Button>
        </div>}
    </div>
}

export default ShareService