import React, { useEffect } from 'react';
import { Button, CenterMessage, Form, Input, SignInMessage } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import PageLayout from '../../layouts/PageLayout';
import { GET, PATCH } from '../../utils';
import _keycl from '../../utils/keycloak.vendors';

const ProfileSummary = () => {
    const { profile, userSaved } = useVisitor()

    const handleEmailChange = async ({ email }) => {
        const req = await PATCH.CHANGE_EMAIL(profile.id, email);
        console.log(req)
    }
    
    if (!userSaved()) return <SignInMessage />
    else if (!profile) return <h3>Loading</h3>
    return <>
        <div className="mb-8">
            <h3 className="font-serif">Emailadres</h3>
            <p>Voor het aanmelden, en ontvangen van mails</p>
            <Form className="mt-4" onSubmit={ handleEmailChange }>
                <Input defaultValue={ profile.email } name="email" type="email" />
                <Button theme="button" type="submit">Wijzigen</Button>
            </Form>
        </div>
        <div className="mb-8">
            <h3 className="font-serif mb-4">Adressen</h3>
            <div className="grid grid-cols-2 gap-6">
                { profile['adressen'].map(({ straat, nummer, postcode, gemeente }, index) => (
                    <div 
                        key={ index }
                        className="border-2 border-gray-300 p-5 col-span-1"
                    >
                        <h3 className="font-medium text-xl -mb-1">{ straat } { nummer }</h3>
                        <h4 className="font-serif text-lg">{ postcode } { gemeente }</h4>
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-8">
            <h3 className="font-serif mb-4">Contacten</h3>
            <div className="grid grid-cols-2 gap-6">
                { profile['contacten'].map(({ voornaam, achternaam, rol }, index) => (
                    <div 
                        key={ index }
                        className="border-2 border-gray-300 p-5 col-span-1"
                    >
                        <h4 className="font-serif text-lg">{ rol }</h4>
                        <h3 className="font-medium text-xl">{ voornaam } { achternaam }</h3>
                    </div>
                ))}
            </div>
        </div>
    </>
}

const GroupAdminLogin = () => {
    const { isLoggedIn } = useVisitor()

    return (
        <PageLayout
            title="Groepsadmin"
            subtitle={ isLoggedIn ? 'Dit konden we van je vinden' : 'Meld je aan om en haal alles uit onze site' }
        >
            { isLoggedIn && <ProfileSummary />}
            <small className="block mt-12 font-serif text-md">*Wij bewaren je gegevens nooit bij derde partijen.<br />Al je peresoonlijke data blijft veilig bij Scouts en Gidsen Vlaanderen of lokaal op je computer.</small>
        </PageLayout>
    )
}

export default GroupAdminLogin
