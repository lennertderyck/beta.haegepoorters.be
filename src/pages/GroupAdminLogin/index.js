import React from 'react';

import { Button, Form, Icon, Input, SignInMessage } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { links } from '../../data/nav';
import PageLayout from '../../layouts/PageLayout';
import { inDev, PATCH } from '../../utils';
import _keycl from '../../utils/keycloak.vendors';
import { functies as userTags } from '../../data/fake/tags.fake.json'
import dayjs from 'dayjs';

const ProfileSummary = () => {
    const { profile } = useVisitor()

    const handleEmailChange = async ({ email }) => {
        const req = await PATCH.CHANGE_EMAIL(profile.id, email);
        console.log(req)
    }

    if (!_keycl.token && !inDev()) return <SignInMessage />
    else if (!profile && !inDev()) return <h3>Loading</h3>
    return <>
        <div className="mb-14">
            <h3 className="font-serif">Emailadres</h3>
            <p>Voor het aanmelden, en ontvangen van mails</p>
            <Form className="mt-4" onSubmit={ handleEmailChange }>
                <Input defaultValue={ profile.email } name="email" type="email" />
                <Button theme="button" type="submit">Wijzigen</Button>
            </Form>
        </div>

        
        <div className="mb-6">
            <h3 className="font-serif mb-4">Adressen</h3>
            <div className="grid grid-cols-2 gap-6">
                { profile['adressen'].map(({ straat, nummer, postcode, gemeente }, index) => (
                    <div 
                        key={ index }
                        className="border-2 border-gray-300 p-5 col-span-2 md:col-span-1"
                    >
                        <h3 className="font-medium text-xl -mb-1">{ straat } { nummer }</h3>
                        <h4 className="font-serif text-lg">{ postcode } { gemeente }</h4>
                        
                        <Button href={ links.gaProfile } className="mt-5 text-red-500" iconAfter="arrow-right-up" target="_blank">Adres aanpassen</Button>
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-14">
            <h3 className="font-serif mb-4">Contacten</h3>
            <div className="grid grid-cols-2 gap-6">
                { profile['contacten'].map(({ voornaam, achternaam, rol, email, gsm }, index) => (
                    <div 
                        key={ index }
                        className="border-2 border-gray-300 p-5 col-span-2 md:col-span-1"
                    >
                        <h4 className="font-serif text-lg">{ rol }</h4>
                        <h3 className="font-medium text-xl">{ voornaam } { achternaam }</h3>
                        
                        <div className="mb-4">
                            <h4 className="mt-4 text-gray-400 text-sm">{ 
                                email ? 
                                'Emails worden verstuurd naar' :
                                'We konden geen emailadres vinden, je zal dus geen emails ontvangen' 
                            }</h4>
                            { email && <p className="font-serif text-lg">{ email }</p> }
                        </div>
                        <div className="mb-4">
                            <h4 className="mt-4 text-gray-400 text-sm">{ 
                                gsm ? 
                                'We bellen je op' :
                                'We konden geen gsm-nummer vinden, we kunnen je dus moeilijker bereiken' 
                            }</h4>
                            { gsm && <p className="font-serif text-lg">{ gsm }</p> }
                        </div>
                        <Button href={ links.gaProfile } className="mt-5 text-red-500" iconAfter="arrow-right-up" target="_blank">Gegevens aanpassen</Button>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 lg:gap-6">
            <div className="col-span-2 lg:col-span-1">
                <h3 className="font-serif mb-4">Functie(s)</h3>
                <div className="-mt-4">
                    { profile['functies'].filter(({ einde }) => !einde).map(({ functie, begin }, index) => (
                        <div 
                            key={ index }
                            className="border-b-2 border-gray-300 py-4"
                        >
                            <h3 className="text-base font-normal">{ userTags.find(({ id }) => id === functie)['beschrijving'] }</h3>
                            <h4 className="font-serif text-lg text-gray-400">sinds { dayjs(begin).format('DD MMMM \'YY') }</h4>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <h3 className="font-serif mb-4">Oude functie(s)</h3>
                <div className="-mt-4">
                    { profile['functies'].filter(({ einde }) => einde).map(({ functie, einde }, index) => {
                        const tagInfo = userTags.find(({ id }) => id === functie);
                        const isLeader = tagInfo['groeperingen'].find(({ naam }) => naam === 'Leiding');
                        
                        return (
                            <div 
                                key={ index }
                                className="border-b-2 border-gray-300 py-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-base font-normal">{ tagInfo['beschrijving'] }</h3>
                                    <h4 className="font-serif text-lg text-gray-400">tot { dayjs(einde).format('DD MMMM \'YY') }</h4>
                                </div>
                                <div className="px-4">
                                    { isLeader && <Icon name="team" size="1.5rem" color="#6f101d" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
}

const GroupAdminLogin = () => {
    const { isLoggedIn, logout } = useVisitor()

    return (
        <PageLayout
            title="Groepsadministratie"
            subtitle="Je gegevens bij Scouts en Gidsen Vlaanderen"
        >
            { isLoggedIn && <ProfileSummary />}
            { isLoggedIn && (
                <div className="pt-12 flex justify-center">
                    <Button theme="simple" iconAfter="logout-circle-r" onClick={() => {
                        logout({ redirectUri: window.location.origin +  '/ga' })
                    }}>Afmelden</Button>
                </div> 
            )}
            <small className="block mt-12 font-serif text-md text-center">*Wij bewaren je gegevens nooit bij derde partijen.<br />Al je peresoonlijke data blijft veilig bij Scouts en Gidsen Vlaanderen of lokaal op je computer.</small>
        </PageLayout>
    )
}

export default GroupAdminLogin
