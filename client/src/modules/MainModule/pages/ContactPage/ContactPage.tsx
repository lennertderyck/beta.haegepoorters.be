import { FC } from 'react';
import ContactForm from './ContactForm';

interface Props {};

const ContactPage: FC<Props> = () => {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Contact</h1>
                <p>Vraag? Suggestie? Laat het ons weten!</p>
            </div>
            <div className="page__banner">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.772191531905!2d3.7631204157534572!3d51.05729407956365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c376c02393bccb%3A0x1e72273a2eee6c6a!2sScouts%20en%20Gidsen%20Haegepoorters%20Destelbergen!5e0!3m2!1snl!2sbe!4v1672183356043!5m2!1snl!2sbe"
                    allowFullScreen={ false } 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    className="w-full h-full bg-gray-100"
                />
            </div>
            <div className="page__content">
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage;