import React, { useState, createContext, useContext } from 'react';
import { Button, Form, Input } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { contactSubjects, uris, siteGroups } from '../../data/site';
import PageLayout from '../../layouts/PageLayout'
import { autoFillPermission } from '../../utils';

const prefillContext = createContext();
const { Provider } = prefillContext;
const usePrefillContext = () => useContext(prefillContext)

const PrefillMessage = () => {
    const { setPrefill } = usePrefillContext()

    return (
        <div className="bg-gray-100 p-4 mb-4">
            <p className="mb-3">
                Wil je je gegevens automatisch aanvullen vanuit je profiel?
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Naam</li>
                <li>Email</li>
                <li>Lidnummer</li>
            </ul>
            <div className="flex">
                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('always', () => {
                    setPrefill(true)
                })}>Altijd</Button>
                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('onetime', () => {
                    setPrefill(true)
                })}>Alleen deze keer</Button>
                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('never')}>Nooit</Button>
            </div>
        </div>
    )
}

const ContactPage = () => {
    const { searchParams } = new URL(window.location)
    const { role, profile } = useVisitor()
    const [ prefill, setPrefill ] = useState(false)

    const groups = siteGroups.filter(({ contactForm }) => contactForm)
    
    const selectedReciever = searchParams.get('r')
    const selectedSubject = searchParams.get('subject')
    
    const recievers = [
        { value: 'vzw', contactForm: 'vzw', plur: 'VZW' },
        ...groups
    ]

    return (
        <Provider value={{ prefill, setPrefill }}>
            <PageLayout title="Contact" subtitle="Vraag? Suggestie? Laat het ons weten!" wide>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 lg:col-span-5">
                        <iframe 
                            src={ uris.mapsIntegration }
                            className="w-full border-0"
                            allowfullscreen="" 
                            loading="lazy"
                            height="400"
                            title="google maps"
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-7">
                        { false && <PrefillMessage /> }
                        <div className="bg-gray-100 p-4 mb-4">
                            <p className="mb-3">
                                Wil je je gegevens automatisch aanvullen vanuit je profiel?
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>Naam</li>
                                <li>Email</li>
                                <li>Lidnummer</li>
                            </ul>
                            <div className="flex">
                                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('always', () => {
                                    setPrefill(true)
                                })}>Altijd</Button>
                                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('onetime', () => {
                                    setPrefill(true)
                                })}>Alleen deze keer</Button>
                                <Button theme="button" className="mr-4" onClick={() => autoFillPermission('never')}>Nooit</Button>
                            </div>
                        </div>
                        <Form button="Versturen" action="http://localhost:5050">
                            {({ subject }) => (
                                <>
                                    <Input name="reciever" label="Aanspreekpunt" type="select" defaultValue={ selectedReciever || role.contactForm }>
                                        <option value="groepsleiding">groepsleiding</option>
                                        { recievers.map(({ value, contactForm, plur }) => (
                                            <option value={ contactForm } key={ value } >{ plur }</option>
                                        ))}
                                    </Input>
                                    <Input name="name" label="Naam" defaultValue={ prefill ? profile?.vgagegevens['voornaam'] : '' } />
                                    <Input name="sender" label="Email" type="email" defaultValue={ prefill ? profile?.['email'] : '' } />
                                    <Input 
                                        name="childId" 
                                        label="Lidnummer kind" 
                                        defaultValue={ prefill ? profile?.verbondsgegevens['lidnummer'] : '' } 
                                        comment="Optioneel maar zo vinden we eenvoudig je gegevens terug"
                                    />
                                    {/* <Input name="subject" label="Onderwerp" /> */}
                                    <Input name="subject" label="Onderwerp" type="select" defaultValue={ selectedSubject || null }>
                                        { contactSubjects.map(({ value, label}) => (
                                            <option value={ value }>{ label }</option>
                                        ))}
                                    </Input>
                                    <div className="bg-gray-100 p-4 text-sm mb-6">
                                        { subject 
                                            ? contactSubjects.find(({ value }) => value === subject).faqText 
                                            : contactSubjects.find(({ value }) => value === 'groepsadmin').faqText }
                                    </div>
                                    {subject !== 'verhuur' && <Input name="message" label="Bericht" type="area" />}
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </PageLayout>
        </Provider>
    )
}

export default ContactPage