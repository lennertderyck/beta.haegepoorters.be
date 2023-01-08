import { FC } from 'react';

interface Props {};

const TrooperBanner: FC<Props> = () => {
    return (
        <div className="rounded-xl border-2 border-[#67BDBE] w-full h-full p-7 flex flex-col">
            <div className="flex-1">
                <img src="https://www.trooper.be/assets/images/trooper_logo.png" alt="logo Trooper" />
            </div>
            <div className="content content--inline mb-3">
                <h3 className="!text-[#276869] mb-1">Gratis geld?!</h3>
                <p className="!text-[#276869] !leading-5 !text-base">Dat kan, via Trooper</p>
            </div>
            <div className="">
                <p className="!text-[#276869] text-sm">Steun onze kas <strong>zonder dat het je iets kost</strong>. Ontdek hier hoe het werkt.</p>
            </div>
        </div>
    )
}

export default TrooperBanner;