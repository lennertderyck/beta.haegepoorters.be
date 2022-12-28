import { FC } from 'react';
import { Button, Icon } from '../../../../components/basics';

interface Props {};

const NotFoundPage: FC<Props> = () => {
    return (
        <div className="page page--wide h-full flex items-center">
            <div className="page__content">
                <Icon name="map-pin-2" className="block mx-auto mb-4" size="1.8rem" />
                <h2 className="font-serif text-2xl text-center">Oeps, dat liep niet volgens plan</h2>
                <p className="text-center">We konden de gevraagde pagina niet vinden</p>
                <Button to="/" icon="arrow-right" className="mx-auto mt-4">Startpagina</Button>
            </div>
        </div>
    )
}

export default NotFoundPage;