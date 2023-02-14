import { FC } from 'react';
import { UserContactPerson } from '../../../../types/requests/adminPlatform';

interface Props {
    contact: UserContactPerson;
};

const ContactCard: FC<Props> = ({ contact }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h4>{ contact.voornaam } { contact.achternaam } <span className="text-gray-400 font-normal">{`(${ contact.rol })`}</span></h4>
            <p>{ contact?.email }</p>
            <p>{ contact?.gsm }</p>
        </div>
    )
}

export default ContactCard;