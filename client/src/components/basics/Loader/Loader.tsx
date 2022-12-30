import { FC } from 'react';
import Icon from '../Icon/Icon';

interface Props {};

const Loader: FC<Props> = () => {
    return (
        <div className="animate-spin">
            <Icon name="loader-5" size="2rem" />
        </div>
    )
}

export default Loader;