import { FC } from 'react';
import { AdminPlatformSignInCard, Button, DateFrom, Icon } from '../../../../components/basics';
import ContactCard from './ContactCard';
import AddressCard from './AddressCard';
import classNames from 'classnames';
import uitPasIllustration from '../../../../assets/images/uitpas-illustration.png';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';
import logoGroepsadministratie from '../../../../assets/images/logo_groepsadministratie.png';
import Grid from '../../../../components/basics/Grid/Grid';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import PointsCardForm from './PointsCardForm';
import MemberCard from '../MemberCardPage/MemberCard';

interface Props {};

const AccountOverviewPage: FC<Props> = () => {
    const keycloak = useKeycloakStore(store => store.instance);
    const authenticated = useKeycloakStore(store => store.authenticated);
    const loading = useKeycloakStore(store => store.authenticating);
    const cachedUser = useKeycloakStore(store => store.user);
    const avatar = useKeycloakStore(store => store.getCustomFieldValue('c6a4fcc2-b1ff-4504-a58b-df291b223f7d'));
    const pointsCardNumber = useKeycloakStore(store => store.getCustomFieldValue('28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1'));
        
    const data = cachedUser;
    const error = !data && authenticated;
    const flyoverActive = !authenticated || loading;
    
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

    // const currentFunctions = data.functies.filter((funct: any) => !funct.einde);
    
    const digitalMemberCardLink = `/ga/digitale-lidkaart?memberId=${data?.verbondsgegevens.lidnummer}&name=${ data?.vgagegevens.voornaam } ${ data?.vgagegevens.achternaam }`;
        
    const gridColumSpan = {
        left: { default: 12, lg: 4 },
        right: { default: 12, lg: 8 }
    }
    
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
                <div className="page page--wide">
                    <div className="page__header flex flex-col xl:flex-row items-center justify-between">
                        <h1 className="page__title !mb-0">Jouw gegevens</h1>
                        <Button icon="refresh">
                            Opnieuw aanmelden
                        </Button>
                    </div>
                    <div className="page__content">
                        <Grid gap={12}>
                            <Grid span={{ default: 12, lg: 4 }}>
                                <div className="sticky top-6">
                                    <div className="bg-gray-100 p-6 rounded-lg flex gap-6">
                                        <div className="">
                                            { !!avatar ?
                                                <div className="w-14 h-w-14 rounded-full overflow-hidden">
                                                    <img src={ avatar } />
                                                </div>:
                                                <Icon name="account-circle" size="2.3rem" />
                                            }
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-gray-600">{ data?.vgagegevens.voornaam } { data?.vgagegevens.achternaam }</h3>
                                            <p className="label tracking-widest">{ data?.email }</p>
                                        </div>
                                    </div>
                                    <Button to={ digitalMemberCardLink } icon="bank-card" className="mt-4 mx-auto">Digitale lidkaart</Button>
                                </div>
                            </Grid>
                            <Grid span={{ default: 12, lg: 8 }}>
                                <div>
                                    <h3 className="section-title">Individuele steekkaart</h3>
                                    <p className="section-subtitle">Medische gegevens en andere persoonlijke informatie</p>
                                    <div className="flex items-baseline gap-3">
                                        <Button 
                                            icon="arrow-right-up" 
                                            className="mt-4"
                                            href={`https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/#/lid/individuelesteekkaart/${cachedUser.id}`}
                                            target="_blank"
                                        >Nakijken & bewerken</Button>
                                        <p className="label text-gray-400"><DateFrom ignoreSuffix>{ medicalDataUpdated }</DateFrom> geleden bijgewerkt</p>
                                    </div>
                                </div>
                                <hr className="my-10" />
                                <div className="flex">
                                    <div className="flex-1">
                                        <h3 className="section-title">UitPas</h3>
                                        <p className="section-subtitle">Spaar punten en ontvang leuke voordelen en gadgets</p>
                                        <Button theme="simple" icon="arrow-right" className="mt-2" href="https://stad.gent/nl/uit-in-gent/uitpas" target="_blank">Meer weten?</Button>
                                        <div className="mt-6">
                                            { pointsCardNumber ? 
                                                (<div className="content content--inline">
                                                    <p className="font-medium bg-gray-100 px-4 py-3 rounded-lg w-fit">Jouw UitPas-nummer is <span className="underline underline-offset-4">{ pointsCardNumber }</span></p>
                                                </div>) : 
                                                <PointsCardForm />
                                            }
                                        </div>
                                    </div>
                                    <img className="max-h-40 hidden lg:block" src={ uitPasIllustration } />
                                </div>
                                <hr className="my-10"/>
                                <div>
                                    <h3 className="section-title">Adressen</h3>
                                    <p className="section-subtitle">Hier sturen we post naar toe</p>
                                    <Button href="https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/#/lid/profiel" target="_blank" icon="arrow-right-up" className="mt-4">Addressen bewerken</Button>
                                    <div className="grid grid-cols-12 gap-6 mt-6 content content--inline">
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
                                <hr className="my-10" />
                                <div>
                                    <h3 className="section-title">Contacten</h3>
                                    <p className="section-subtitle">Ook deze contacten ontvangen onze communicatie</p>
                                    <Button 
                                        href="https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/#/lid/profiel" 
                                        target="_blank" 
                                        icon="arrow-right-up" 
                                        className="mt-4"
                                    >Contacten bewerken</Button>
                                    <div className="grid grid-cols-12 gap-6 mt-6 content content--inline">
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
                            </Grid>
                        </Grid>
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