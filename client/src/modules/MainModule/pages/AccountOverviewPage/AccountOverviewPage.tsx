import { FC } from 'react';
import { AdminPlatformSignInCard, Button, Icon } from '../../../../components/basics';
import ContactCard from './ContactCard';
import profielFakeData from '../../../../mocks/fake/profiel';
import AddressCard from './AddressCard';
import classNames from 'classnames';
import { usePlatformAccount } from '../../../../utils/hooks';
import uitPasIllustration from '../../../../assets/images/uitpas-illustration.png';
import usePlatformRequest from '../../../../utils/hooks/usePlatformRequest/usePlatformRequest';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';

interface Props {};

const AccountOverviewPage: FC<Props> = () => {
    // const { keycloak } = usePlatformAccount();
    const keycloak = useKeycloakStore(store => store.instance);
    const authenticated = useKeycloakStore(store => store.authenticated);
    const { data } = usePlatformRequest<typeof profielFakeData>('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel')
    // const { data } = useFetch<typeof profielFakeData>('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel');
    
    const flyoverActive = !authenticated;
    
    console.log(keycloak, {authenticated})
    
    if (!data) return <>catch other state</>;
    
    const scheme = data.groepseigenVelden['O1306G'].schema;
    const values = data.groepseigenVelden['O1306G'].waarden;
    const field = scheme.find((veld) => veld.label === 'UiTPas-nummer');
    const pointsCardNumber = field && values ? (values as any)[field.id] : null;
    const currentFunctions = data.functies.filter((funct) => !funct.einde);
        
    return (
        <div 
            className={classNames(
                'flyover flyover--fit-screen',
                flyoverActive && 'flyover--active',
            )}
        >
            {/* <Modal defaultState={ true } variant="snack" blank>
                <MemberCard memberId="1999072002651" memberName="Lennert De Ryck" />
            </Modal> */}
            <div className="flyover__main">
                <div className="page">
                    <div className="page__header flex items-baseline justify-between">
                        <h1 className="page__title">Jouw gegevens</h1>
                        <Button icon="refresh">
                            <span>Gegevens venieuwen</span>
                        </Button>
                    </div>
                    <div className="page__content">
                        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="bg-gray-200 rounded-full">
                                    <div className="p-4">
                                        <Icon name="account-circle" size="2.3rem" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-gray-600">{ data.vgagegevens.voornaam } { data.vgagegevens.achternaam }</h3>
                                    <p className="label tracking-widest">{ data.email }</p>
                                </div>
                            </div>
                            <div>
                                <Button to={`/ga/digitale-lidkaart?memberId=${data.verbondsgegevens.lidnummer}&name=${ data.vgagegevens.voornaam } ${ data.vgagegevens.achternaam }`} icon="bank-card" iconPlacement="start">Digitale lidkaart</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mt-12 gap-y-10">
                            <div className="col-span-12 content content--inline">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4>UitPas</h4>
                                        <p>Spaar punten en ontvang leuke voordelen en gadgets</p>
                                        { pointsCardNumber ? 
                                            (<>
                                                <p className="font-medium">Jouw UitPas-nummer is <span className="underline underline-offset-4">{ pointsCardNumber }</span></p>
                                                <Button theme="simple" icon="arrow-right" className="mt-2" href="https://stad.gent/nl/uit-in-gent/uitpas" target="_blank">Meer weten?</Button>
                                            </>) :
                                            (<>
                                                <p className="text-gray-400">Je hebt nog geen UitPas toegevoegd.</p>
                                                <Button theme="simple" icon="arrow-right" className="mt-2">UitPas toevoegen</Button>
                                            </>)
                                        }
                                        
                                    </div>
                                    <img className="max-h-40" src={ uitPasIllustration } />
                                </div>
                            </div>
                            {/* <div className="col-span-12 lg:col-span-6">
                                <div className="content content--inline">
                                    <h4>Functies</h4>
                                </div>
                                <div className="content content--inline">
                                    <ul className="list-disc">
                                        { currentFunctions.map((func) => (
                                            <li className="!mb-2 text-stone-400">
                                                <h4 className="!text-stone-500 !-mb-1">{ func.omschrijving }</h4>
                                                <p>{ func.groep }</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button theme="simple" icon="arrow-right" className="mt-4">Bekijk geschiedenis</Button>
                            </div> */}
                            {/* <div className="col-span-12 lg:col-span-6 content content--inline">
                                <h4>Je huidige tak</h4>
                                <p>Leiding bij jonggivers</p>
                                <Button theme="simple" icon="arrow-right" className="mt-2">Bekijk geschiedenis</Button>
                            </div>
                            <div className="col-span-12 lg:col-span-6 content content--inline">
                                <h4>Andere functies</h4>
                                <ul>
                                    <li>Verantwoordelijke Groepsadministratie</li>
                                    <li>Webmaster</li>
                                </ul>
                                <Button theme="simple" icon="arrow-down-s" className="mt-2">nog 3 andere functies</Button>
                            </div> */}
                        </div>
                        <hr className="my-10"/>
                        <div className="grid grid-cols-12 mt-12 gap-y-10">
                            <div className="col-span-12 content content--inline">
                                <h4>Adressen</h4>
                                <p>Hier sturen we post naar toe</p>
                                <div className="grid grid-cols-12 gap-6 mt-4">
                                    { data.adressen.length === 0 && (<>
                                        <p className="text-gray-400">Je hebt nog geen adressen toegevoegd.</p>
                                    </>)}
                                    { data.adressen.map((contact, index) => (
                                        <div 
                                            key={ index }
                                            className="col-span-6"
                                        >
                                            <AddressCard address={ contact } />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mt-12 gap-y-10">
                            <div className="col-span-12 content content--inline">
                                <h4>Contacten</h4>
                                <p>Hoe we emails versturen of je ouders/voogd contacteren</p>
                                <div className="grid grid-cols-12 gap-6 mt-4">
                                    { data.contacten.length === 0 && (<>
                                        <p className="text-gray-400">Je hebt nog geen ouders/voogd toegevoegd. <span className="font-medium">Je ontvangt mogelijks ook geen e-mails.</span></p>
                                    </>)}
                                    { data.contacten.map((contact, index) => (
                                        <div 
                                            key={ index }
                                            className="col-span-6"
                                        >
                                            <ContactCard contact={ contact } />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flyover__bridge">
                <button onClick={() => keycloak.login({ })}>
                    <AdminPlatformSignInCard />
                </button>
                {/* <UnAuthNotify error={ keycloak.error } onLogin={ keycloak.login } /> */}
            </div>
        </div>
    )
}

export default AccountOverviewPage;