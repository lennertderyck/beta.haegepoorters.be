import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Base64 } from 'js-base64';
import barcode from 'jsbarcode';

const Card = styled.div`
    display: block;
    position: relative;
    aspect-ratio: 9/5.5;
    max-height: 279px;
    box-shadow: 0px 0px 44px 24px #9f000036, 0px 10px 22px -1px #5b000094;
    /* box-shadow: 0px 0px 124px 22px #00000012, 0px 10px 18px -9px #00000033; */
    
    @media print {
        box-shadow: none;
    }
`;

const Barcode = styled.img`
    height: 55px;
    width: 100%;
    pointer-events: none;
    user-select: none;
    background: white;
`;

const MemberCard = ({ disableStoring = false, onClick, ...otherProps }) => {
    const localStoredMemberCard = JSON.parse(localStorage.getItem('memberCard'));
    const url = new URL(window.location.href);
    const memberId = url.searchParams.get('memberId') || localStoredMemberCard?.memberId;
    const name = url.searchParams.get('name') || localStoredMemberCard?.name;
        
    const shortCode = Base64.encode(`memberId=${memberId}&name=${name}`, true)
    const shortUrl = new URL(window.location.href)
    shortUrl.search = `?${shortCode}`;
    
    const shouldStore = (name && memberId) && !disableStoring;
    
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
        <Card
            title="test"
            className="rounded-2xl p-6 lg:p-8 mx-auto bg-gradient-to-r from-red-500 to-red-800 text-white print:shadow-none print:border-2 print:text-black"
            onClick={ onClick }
            { ...otherProps }
        >
            <div>
                <h4 className="text-2xl">Haegepoorters Destelbergen</h4>
                <p className="font-serif text-lg">O1302G</p>
            </div>
                    
            {( memberId || name ) && <hr className="my-6 border" />}
                    
            <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-4">
                { name && (
                    <div className="col-span-12 lg:col-span-6">
                        <h4 className="tracking-widest uppercase text-xs">Naam</h4>
                        <p className="font-serif text-xl">{ name }</p>
                    </div>
                )}
                        
                {( memberId ) && (
                    <div className="col-span-12 lg:col-span-6">
                        <h4 className="tracking-widest uppercase text-xs">Lidnummer</h4>
                        <p className="font-serif text-xl">{ memberId }</p>
                    </div>
                )}
            </div>
            <Barcode id="barcodebl" className="mt-4 rounded-lg" />
        </Card>
    )
}

export default MemberCard