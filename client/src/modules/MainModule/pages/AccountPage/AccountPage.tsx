import { FC } from 'react';
import { Button, Icon } from '../../../../components/basics';
import logoGroepsadministratie from '../../../../assets/images/logo_groepsadministratie.png';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import groups from '../../../../utils/data/groups';

interface Props {};

const AccountPage: FC<Props> = () => {
    const confirmOption = (option: string) => {
        
    }
    
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title text-center xl:mb-2">Welkom terug, Lennert</h1>
                <p className="text-center">Je gegevens bij Scouts en Gidsen Vlaanderen</p>
            </div>
            <div className="page__content">
                <div className="w-fit mx-auto">
                    <div className="border-2 border-gray-100 shadow-lg rounded-xl w-fit mx-auto">
                        <button onClick={() => confirmOption('platform_external')} className="px-12 pt-12 pb-7 text-left w-full flex items-center justify-between gap-12">
                            <div className="flex items-center gap-6">
                                <img src={ logoGroepsadministratie } alt="" className="w-24" />
                                <div className="content">
                                    <h3>Aanmelden bij Groepsadministratie</h3>
                                    <p className="!mt-0">Beheer je persoonlijke gegevens via onze site</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                                    <Icon name="arrow-right-s"/>
                                </div>
                            </div>
                        </button>
                        <div className="flex items-center gap-4 px-12">
                            <hr className="flex-1 border-t-2 border-gray-200" />
                            <span className="px-3 py-1 flex items-center justify-center border-2 border-gray-200 rounded-full text-xs uppercase">of</span>
                            <hr className="flex-1 border-t-2 border-gray-200" />
                        </div>
                        <button onClick={() => confirmOption('site_config')} className="px-12 pt-7 pb-12 text-left w-full flex items-center justify-between gap-12">
                            <div className="content">
                                <h3 className="text-lg">Persoonlijke voorkeuren instellen</h3>
                                <p className="!mt-0">Geen zin om aan te melden? Stel hier enkele voorkeuren in.</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                                    <Icon name="arrow-right-s"/>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-6">
                        <div className="">
                            <label className="flex items-center justify-center gap-2">
                                <Input type="checkbox" name="always_platform" defaultChecked />
                                <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">Keuze onthouden</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-12">
                        <div className="p-6 bg-gray-100 rounded-xl xl:max-w-[75%] mx-auto">
                            <div className="content content--inline text-center">
                                <h4>Lidnummer nodig?</h4>
                                <p>Bekijk je digitale lidkaart, of vraag hem aan</p>
                            </div>
                            <Button theme="simple" to="/ga/digitale-lidkaart" icon="arrow-right" className="mx-auto mt-4">Digitale lidkaart bekijken</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;