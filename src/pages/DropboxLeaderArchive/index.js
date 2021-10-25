import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isMobile } from "react-device-detect";
// import { Dropbox } from 'dropbox';

import { Button, CenterMessage, Icon, SignInMessage } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { siteGroups } from '../../data/site';
import { PageLayout } from '../../layouts';

const ActivityEditor = () => {
    const { group } = useParams()
    const [ dropViewer, setDropViewer] = useState()

    const dropEmbed = useRef()
    const { _keycl, profile } = useVisitor()

    // useEffect(() => {
    //     console.log(dropViewer)
    //     if (!dropViewer) {
    //         const d = Dropbox.embed({ // eslint-disable-line
    //             link: "https://www.dropbox.com/sh/6cqa2eif1xs3rki/AACTJ-AZjSBXj6iC_Xhs5oL7a?dl=0"
    //         }, dropEmbed.current)
    //         setDropViewer(d)
    //     }
    // }, [dropEmbed, dropViewer])
    
    if (!_keycl.token && process.env.NODE_ENV !== 'development') return <PageLayout>
        <div className="h-full ">
            <SignInMessage />
        </div>
    </PageLayout>
    
    if (!profile?.isLeader) return <div className="h-full flex items-center justify-center">
        <CenterMessage intro="Jij bent geen leiding ;)" icon="shield-user">
            Enkel actieve leiding kan deze pagina bekijken
        </CenterMessage>
    </div>

    if (isMobile) return <div className="h-full flex items-center justify-center">
        <CenterMessage intro="Gebruik een desktop" icon="macbook">
            Deze pagina is niet geoptimaliseerd voor smartphones
        </CenterMessage>
    </div>

    return (
        <>

            <div className="flex flex-col h-full" ref={ dropEmbed } />
        </>
    )

}

export default ActivityEditor