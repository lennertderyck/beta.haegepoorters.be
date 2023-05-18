import { FC } from 'react';
import { AdminPlatformSignInCard, Button, DateFrom, Icon } from '../../../../components/basics';
import ContactCard from './ContactCard';
import AddressCard from './AddressCard';
import classNames from 'classnames';
import uitPasIllustration from '../../../../assets/images/uitpas-illustration.png';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';
import dayjs from 'dayjs';

interface Props {};

const AccountOverviewPage: FC<Props> = () => {
    const keycloak = useKeycloakStore(store => store.instance);
    const authenticated = useKeycloakStore(store => store.authenticated);
    const loading = useKeycloakStore(store => store.authenticating);
    const cachedUser = useKeycloakStore(store => store.user);
    
    const data = cachedUser;
    const error = !data && authenticated;
    const flyoverActive = !authenticated || loading;
    // const flyoverActive = false;
    
    const medicalDataUpdated = cachedUser?.vgagegevens?.individueleSteekkaartdatumaangepast;
    
    if (error) return (
        <div className="page page--wide h-full flex items-center">
            <div className="page__content">
                <Icon name="cloud-off" className="block mx-auto mb-4" size="1.8rem" />
                <h2 className="font-serif text-2xl text-center">We konden je gegevens niet ophalen</h2>
                <p className="text-center">Kijk je internetverbinding na en probeer opnieuw</p>
                <Button icon="restart" className="mt-4 mx-auto">Probeer opnieuw</Button>
            </div>
        </div>
    );
    
    const scheme = data?.groepseigenVelden?.['O1306G'].schema;
    const values = data?.groepseigenVelden?.['O1306G'].waarden;
    const field = scheme?.find((veld: any) => veld.label === 'UiTPas-nummer');
    const pointsCardNumber = field && values ? (values as any)[field.id] : null;
    // const currentFunctions = data.functies.filter((funct: any) => !funct.einde);
        
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
                    <div className="page__header flex flex-col xl:flex-row items-baseline justify-between">
                        <h1 className="page__title">Jouw gegevens</h1>
                        <Button icon="refresh">
                            <span>Gegevens venieuwen</span>
                        </Button>
                    </div>
                    <div className="page__content">
                        <div className="bg-gray-100 p-6 rounded-lg flex flex-col xl:flex-row items-center justify-between">
                            <div className="flex flex-col xl:flex-row items-center gap-4 xl:gap-8">
                                <div className="bg-gray-200 rounded-full">
                                    <div className="p-4">
                                        <Icon name="account-circle" size="2.3rem" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-gray-600">{ data?.vgagegevens.voornaam } { data?.vgagegevens.achternaam }</h3>
                                    <p className="label tracking-widest">{ data?.email }</p>
                                </div>
                            </div>
                            <div className="mt-4 xl:mt-0">
                                <Button to={`/ga/digitale-lidkaart?memberId=${data?.verbondsgegevens.lidnummer}&name=${ data?.vgagegevens.voornaam } ${ data?.vgagegevens.achternaam }`} icon="bank-card" iconPlacement="start">Digitale lidkaart</Button>
                            </div>
                        </div>
                        { !!medicalDataUpdated && <div className="mt-12">
                            <div className="content content--inline">
                                <h4>Individuele steekkaart</h4>
                                <p>Medische gegevens en andere persoonlijke informatie</p>
                                <div className="px-4 py-3 rounded-lg bg-gray-100 mt-4 flex flex-col lg:flex-row justify-between gap-4">
                                    <p>Laatst bijgewerkt, <DateFrom ignoreSuffix>{ medicalDataUpdated }</DateFrom> geleden</p>
                                    <Button 
                                        icon="arrow-right" 
                                        theme="simple"
                                        href={`https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/#/lid/individuelesteekkaart/${cachedUser.id}`}
                                        target="_blank"
                                    >Nakijken & bewerken</Button>
                                </div>
                            </div>
                        </div> }
                        <hr className="my-10"/>
                        <div className="grid grid-cols-12 mt-10 gap-y-10">
                            <div className="col-span-12 content content--inline">
                                <div className="flex flex-col-reverse xl:flex-row items-center justify-between">
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
                                    { data?.adressen.length === 0 && (<>
                                        <p className="text-gray-400">Je hebt nog geen adressen toegevoegd.</p>
                                    </>)}
                                    { data?.adressen.map((address: any, index: number) => (
                                        <div 
                                            key={ index }
                                            className="col-span-12 xl:col-span-6"
                                        >
                                            <div className={classNames(!address.postadres && 'opacity-60')}>
                                                <AddressCard address={ address } />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mt-12 gap-y-10">
                            <div className="col-span-12 content content--inline">
                                <h4>Contacten</h4>
                                <p>Ook deze contacten ontvangen onze communicatie</p>
                                <div className="grid grid-cols-12 gap-6 mt-4">
                                    { data?.contacten.length === 0 && (<>
                                        <p className="text-gray-400">Je hebt nog geen ouders/voogd toegevoegd. <span className="font-medium">Je ontvangt mogelijks ook geen e-mails.</span></p>
                                    </>)}
                                    { data?.contacten.map((contact: any, index: number) => (
                                        <div 
                                            key={ index }
                                            className="col-span-12 xl:col-span-6"
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
                {
                    !loading ? (
                        <button onClick={() => keycloak.login({ })}>
                            <AdminPlatformSignInCard />
                        </button>
                    ) : (
                        <>
                            <AdminPlatformSignInCard loading />
                        </>
                    )
                }
                {/* <UnAuthNotify error={ keycloak.error } onLogin={ keycloak.login } /> */}
            </div>
        </div>
    )
}

export default AccountOverviewPage;