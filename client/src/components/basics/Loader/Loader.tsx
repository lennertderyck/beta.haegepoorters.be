import { FC } from 'react';
import Icon from '../Icon/Icon';

interface Props {
    size?: '1.3rem' | '2rem';
};

const Loader: FC<Props> = ({ size = '2rem' }) => {
    return (
        <div className="animate-spin">
            <Icon name="loader-5" size={ size } />
        </div>
    )
}

export default Loader;