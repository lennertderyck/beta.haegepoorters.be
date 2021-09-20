import React, { useState } from 'react';
import { Form, Input } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { contactSubjects, uris, siteGroups } from '../../data/site';
import PageLayout from '../../layouts/PageLayout'

const ContactPage = () => {
    const { searchParams } = new URL(window.location)
    const { role, profile } = useVisitor()
    const groups = siteGroups.filter(({ contactForm }) => contactForm)
    
    const selectedReciever = searchParams.get('r')
    const selectedSubject = searchParams.get('subject')
    
    const recievers = [
        { value: 'vzw', contactForm: 'vzw', plur: 'VZW' },
        ...groups
    ]

    return (
        <PageLayout title="Contact" subtitle="Vraag? Suggestie? Laat het ons weten!" wide>
            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-5">
                    <iframe 
                        src={ uris.mapsIntegration }
                        className="w-full border-0"
                        allowfullscreen="" 
                        loading="lazy"
                        height="400"
                    />
                </div>
                <div className="col-span-7">
                    <Form button="Versturen" action="http://localhost:5050">
                        {({ subject }) => (
                            <>
                                <Input name="reciever" label="Aanspreekpunt" type="select" defaultValue={ selectedReciever || role.contactForm }>
                                    <option value="groepsleiding">groepsleiding</option>
                                    { recievers.map(({ value, contactForm, plur }) => (
                                        <option value={ contactForm } key={ value } >{ plur }</option>
                                    ))}
                                </Input>
                                <Input name="name" label="Naam" defaultValue={ profile?.vgagegevens['voornaam'] } />
                                <Input name="sender" label="Email" type="email" defaultValue={ profile?.['email'] } />
                                {/* <Input name="subject" label="Onderwerp" /> */}
                                <Input name="subject" label="Onderwerp" type="select" defaultValue={ selectedSubject || null }>
                                    { contactSubjects.map(({ value, label}) => (
                                        <option value={ value }>{ label }</option>
                                    ))}
                                </Input>
                                <div className="bg-gray-100 p-4 text-sm mb-6">
                                    { subject && contactSubjects.find(({ value }) => value === subject).faqText }
                                </div>
                                {subject !== 'verhuur' && <Input name="message" label="Bericht" type="area" />}
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </PageLayout>
    )
}

export default ContactPage