import { FC, useMemo } from 'react';
import styled from 'styled-components';

const CardBase = styled.div`
    aspect-ratio: 9 / 5.5;
    max-height: 279px;
    box-shadow: 
        rgb(159 0 0 / 21%) 0px 0px 44px 24px, 
        rgb(91 0 0 / 58%) 0px 10px 22px -1px
    ;
`;

const Barcode = styled.img`
    height: 100%;
    width: 100%;
    pointer-events: none;
    user-select: none;
    background: white;
`;

interface Props {
    memberId: string;
    memberName?: string | null;
};

const MemberCard: FC<Props> = ({ memberId, memberName }) => {
    const barcodeUrl = useMemo(() => {
        return `https://barcode.tec-it.com/barcode.ashx?code=Code39&data=${ memberId }&dpi=300&imagetype=Svg&hidehrt=True&eclevel=M`;
    }, [ memberId ]);
    
    return (
        <CardBase className="rounded-2xl text-white bg-gradient-to-r from-red-500 to-red-800 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col p-6 sm:p-8">
                    <div className="mb-2">
                        <p className="text-lg sm:text-2xl">Haegepoorters Destelbergen</p>
                        <p className="font-serif text sm:text-xl text-opacity-60 text-white">O1302G</p>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className="flex-1 grid grid-cols-2">
                            { memberName && (
                                <div className="col-span-1">
                                    <p className="uppercase text-xs tracking-widest -mb-1">Naam</p>
                                    <p className="font-serif text-base sm:text-xl">{ memberName }</p>
                                </div>
                            )}
                            <div className="col-span-1">
                                <p className="uppercase text-xs tracking-widest -mb-1">Lidnummer</p>
                                <p className="font-serif text-base sm:text-xl">{ memberId }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-white h-14 overflow-hidden">
                    <Barcode src={ barcodeUrl } className="w-full object-cover" />
                </div>
            </div>
        </CardBase>
    )
}

export default MemberCard;