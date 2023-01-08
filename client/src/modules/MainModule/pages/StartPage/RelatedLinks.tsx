import { FC } from 'react';
import { Button } from '../../../../components/basics';

interface Props {};

const RelatedLinks: FC<Props> = () => {
    const items = [
        { title: 'Groepsadministratie', description: 'Beheer de persoonlijke gegevens van je kind(eren)', actionLabel: 'Aanmelden', href: 'https://groepsadministratie.scoutsengidsenvlaanderen.be' },
        { title: 'Hopper', description: 'Koop al je uitrusting bij Hopper en geniet een mooie korting als lid', actionLabel: 'Shoppen bij Hopper', href: 'https://www.hopper.be' },
        { title: 'Scouts en Gidsen Vlaanderen', description: 'De overkoepelende organisatie waar onze scouts bij hoort', actionLabel: 'Meer weten', href: 'https://scoutsengidsenvlaanderen.be' },
        { title: 'Trooper', description: 'Steun gratis onze scouts met je online aankopen', actionLabel: 'Steun ons!', href: 'https://www.trooper.be/nl/trooperverenigingen/hp' },
    ];
    
    
    return (
        <ul className="grid grid-cols-4 gap-4 card-group">
            { items.map((item, index) => (
                <li 
                    key={ index } 
                    className="card card--md col-span-4 md:col-span-2 lg:col-span-1"
                >
                    <h4 className="card__title">{ item.title }</h4>
                    <p className="card__descriptor mb-4">{ item.description }</p>
                    <Button href={ item.href } theme="simple" icon="arrow-right-up">{ item.actionLabel }</Button>
                </li>
            ))}
        </ul>
    )
}

export default RelatedLinks;