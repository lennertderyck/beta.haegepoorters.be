import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Form, Input } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { visitorRoles } from '../../data/site';
import PageLayout from '../../layouts/PageLayout'

const ContactPage = () => {
    const { searchParams } = new URL(window.location)
    const { role } = useVisitor()
    const groups = visitorRoles.filter(({ contactForm }) => contactForm)
    
    const selectedReciever = searchParams.get('r')
    
    const recievers = [
        { value: 'vzw', contactForm: 'vzw', plur: 'VZW' },
        ...groups
    ]

    return (
        <PageLayout title="Contact" subtitle="Vraag? Suggestie? Laat het ons weten!">
            <Form button="Versturen" action="http://localhost:5050">
                {() => (
                    <>
                        <Input name="reciever" label="Aanspreekpunt" type="select" defaultValue={ selectedReciever || role.contactForm }>
                            <option value="groepsleiding">groepsleiding</option>
                            { recievers.map(({ value, contactForm, plur }) => (
                                <option value={ contactForm } key={ value } >{ plur }</option>
                            ))}
                        </Input>
                        <Input name="name" label="Naam" />
                        <Input name="sender" label="Email" type="email" />
                        <Input name="subject" label="Onderwerp" />
                        <Input name="message" label="Bericht" type="area" />
                    </>
                )}
            </Form>
        </PageLayout>
    )
}

export default ContactPage