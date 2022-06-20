import React, { useEffect, useState } from 'react';
import { PageLayout } from '../../layouts';
import styled from 'styled-components';
import { Container, Icon, MemberCard, PageWrapper } from '../../components';
import { Base64 } from 'js-base64';
import barcode from 'jsbarcode';

const Card = styled.div`
    display: block;
    position: relative;
    aspect-ratio: 9/5.5;
    max-height: 279px;
    box-shadow: 0px 0px 44px 24px #9f000036, 0px 10px 22px -1px #5b000094;
    /* box-shadow: 0px 0px 124px 22px #00000012, 0px 10px 18px -9px #00000033; */
`;

const Barcode = styled.img`
    height: 55px;
    width: 100%;
    pointer-events: none;
    user-select: none;
    background: white;
`;

const DigitalMemberCardPage = () => {
    const [ focusMode, setFocusMode ] = useState(false);
    
    const localStoredMemberCard = JSON.parse(localStorage.getItem('memberCard'));
    const url = new URL(window.location.href);
    const memberId = url.searchParams.get('memberId') || localStoredMemberCard?.memberId;
    const name = url.searchParams.get('name') || localStoredMemberCard?.name;
        
    const shortCode = Base64.encode(`memberId=${memberId}&name=${name}`, true)
    const shortUrl = new URL(window.location.href)
    shortUrl.search = `?${shortCode}`;
    
    const shouldStore = name && memberId;
    
    const handleCardClick = () => {
        console.log('handleCardClick');
        setFocusMode(p => !p);
    }
    
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'Digitale lidkaart';
        
        
        if (memberId) {
            barcode("#barcodebl", memberId, { format: "code39", displayValue: false, background: 'transparent', lineColor: '#000', marginTop: 30, marginBottom: 30 });
        }
        
        if (shouldStore) {
            window.localStorage.setItem('memberCard', JSON.stringify({
                name,
                memberId,
            }));
        }
        
        return () => {
            document.title = originalTitle;
        }
    }, [])
    
    return (
        <Container className="h-full">
            <div className="flex flex-col min-h-full">
                { !focusMode && (
                    <div className="mb-10">
                        <h2 className="text-5xl font-serif text-center">Jouw digitale lidkaart</h2>
                        <h3 className="text-base text-center">Gebruik je lidnummer om aan te melden bij de Groepsadministratie</h3>
                    </div>
                )}
                
                <MemberCard onClick={() => handleCardClick() } />
                
                { !focusMode && (
                    <div className="divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-200 mt-16 flex flex-col lg:flex-row">
                        <div className="flex-1 pb-4 lg:pb-0">
                            <div className="mx-auto w-fit mb-2"><Icon name="star" size="1.3rem" /></div>
                            <p className="text-center font-serif leading-5">Sla deze pagina op en<br />vind je lidnummer altijd makkerlijkt terug</p>
                        </div>
                        <div className="flex-1 pt-4 lg:pt-0">
                            <div className="mx-auto w-fit mb-2"><Icon name="store-3" size="1.3rem" /></div>
                            <p className="text-center font-serif leading-5">Toon de barcode in de Hopper en<br />krijg een mooie korting op je aankopen!</p>
                        </div>
                    </div>
                )}
            </div>
            {/* <a className="block text-center text-sm mt-6" href={'#' + shortUrl}>{ shortUrl.href }</a> */}
        </Container>
    )
}

export default DigitalMemberCardPage