import { LoaderFunction } from 'react-router-dom';
import groups from '../../data/groups';

const groupDataLoader: LoaderFunction = ({ params }) => {
    return groups[params.group as keyof typeof groups];
}

export default groupDataLoader;