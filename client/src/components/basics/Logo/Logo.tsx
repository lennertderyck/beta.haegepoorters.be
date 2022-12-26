import { FC } from 'react';
import svg from './logo.svg'

interface Props {
    width?: string;
}

const Logo: FC<Props> = ({ width }) => {
    return (
        <img src={ svg } width={ width } alt="logo" />
    )
}

export default Logo