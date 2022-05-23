import React from 'react';
import { PageLayout } from '../../layouts';
import styled from 'styled-components';
import { siteGroups } from '../../data/site';
import { Icon } from '../../components';
import { useEffect } from 'react';

const Card = styled.a`
    display: block;
    position: relative;
    aspect-ratio: 9/5.5;
    max-height: 279px;
    box-shadow: 0px 0px 44px 24px #9f000036, 0px 10px 22px -1px #5b000094;
    /* box-shadow: 0px 0px 124px 22px #00000012, 0px 10px 18px -9px #00000033; */
`;

const DigitalMemberCardPage = () => {
    const url = new URL(window.location.href);
    const memberId = url.searchParams.get('memberId');
    const name = url.searchParams.get('name');
    const memberFunct = url.searchParams.get('function');
    const parsedMemberFunct = siteGroups.find(group => group.value === memberFunct);
    
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'Digitale lidkaart';
        
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
                
                <hr className="my-6 border" />
                
                <h4 className="tracking-widest uppercase text-xs">Lidnummer</h4>
                <p className="font-serif text-2xl">{ memberId }</p>
                
                <div className="grid grid-cols-12 gap-8 mt-4">
                    { name && (
                        <div className="col-span-6">
                            <h4 className="tracking-widest uppercase text-xs">Naam</h4>
                            <p className="font-serif text-xl">{ name }</p>
                        </div>
                    )}
                    
                    {( parsedMemberFunct && memberFunct ) && (
                        <div className="col-span-6">
                            <h4 className="tracking-widest uppercase text-xs">Functie</h4>
                            <p className="font-serif text-xl">{ parsedMemberFunct.label }</p>
                        </div>
                    )}
                </div>
            </Card>
            <div className="mt-8">
                <div className="hidden md:block mx-auto">
                    <div className="mx-auto w-fit mb-2"><Icon name="drag-drop" size="1.3rem" /></div>
                    <p className="text-center font-serif leading-5">Sleep bovenstaande kaart naar je snelkoppelingen<br />en vind je lidnummer altijd makkerlijk terug</p>
                </div>
                <div className="block md:hidden mx-auto">
                    <div className="mx-auto w-fit mb-2"><Icon name="star" size="1.3rem" /></div>
                    <p className="text-center font-serif leading-5">Sla deze pagina op<br />en vind je lidnummer altijd makkerlijkt terug</p>
                </div>
            </div>
        </PageLayout>
    )
}

export default DigitalMemberCardPage