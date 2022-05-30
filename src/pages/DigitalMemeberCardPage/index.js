import React from 'react';
import { PageLayout } from '../../layouts';
import styled from 'styled-components';
import { siteGroups } from '../../data/site';
import { Icon } from '../../components';
import { useEffect } from 'react';
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
    const localStoredMemberCard = JSON.parse(localStorage.getItem('memberCard'));
    const url = new URL(window.location.href);
    const memberId = url.searchParams.get('memberId') || localStoredMemberCard?.memberId;
    const name = url.searchParams.get('name') || localStoredMemberCard?.name;
        
    const shortCode = Base64.encode(`memberId=${memberId}&name=${name}`, true)
    const shortUrl = new URL(window.location.href)
    shortUrl.search = `?${shortCode}`;
    
    const shouldStore = name && memberId;
    
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
        <PageLayout>
            <div className="mb-10">
                <h2 className="text-5xl font-serif text-center">Jouw digitale lidkaart</h2>
                <h3 className="text-base text-center">Gebruik je lidnummer om aan te melden bij de Groepsadministratie</h3>
            </div>
            
            <Card
                title="test"
                draggable="true"
                href=""
                className="rounded-2xl p-8 mx-auto bg-gradient-to-r from-red-500 to-red-800 text-white select-none"
            >
                <div>
                    <h4 className="text-2xl">Haegepoorters Destelbergen</h4>
                    <p className="font-serif text-lg">O1302G</p>
                </div>
                
                {( memberId || name ) && <hr className="my-6 border" />}
                
                <div className="grid grid-cols-12 gap-8 mt-4">
                    { name && (
                        <div className="col-span-6">
                            <h4 className="tracking-widest uppercase text-xs">Naam</h4>
                            <p className="font-serif text-xl">{ name }</p>
                        </div>
                    )}
                    
                    {( memberId ) && (
                        <div className="col-span-6">
                            <h4 className="tracking-widest uppercase text-xs">Lidnummer</h4>
                            <p className="font-serif text-2xl">{ memberId }</p>
                        </div>
                    )}
                </div>
                <Barcode id="barcodebl" className="mt-4 rounded-lg" />
            </Card>
            <div className="mt-8">
                <div className="mx-auto w-fit mb-2"><Icon name="star" size="1.3rem" /></div>
                <p className="text-center font-serif leading-5">Sla deze pagina op<br />en vind je lidnummer altijd makkerlijkt terug</p>
            </div>
            {/* <a className="block text-center text-sm mt-6" href={'#' + shortUrl}>{ shortUrl.href }</a> */}
        </PageLayout>
    )
}

export default DigitalMemberCardPage