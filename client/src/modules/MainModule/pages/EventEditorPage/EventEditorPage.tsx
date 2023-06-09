import { FC } from 'react';
import { groupsToArray } from '../../../../utils/data/groups';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/basics';
import ProtectedRoute from '../../../../components/elements/ProtectedRoute/ProtectedRoute';

interface Props {};

const EventEditorPage: FC<Props> = () => {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">
                    Haegeprekerke bewerken
                </h1>
            </div>
            <ProtectedRoute staffOnly view="blocked">
                <div className="page__content">
                        <ul>
                            { groupsToArray.map(([shortcode, group], index) => (
                                <li key={ index }>
                                    <Link to={ shortcode } className="flex justify-between border-b-2 border-gray-200 py-4">
                                        <div>
                                            <h4 className="text-lg font-semibold">{ group.name }</h4>
                                        </div>
                                        <Icon name="arrow-right" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                </div>
            </ProtectedRoute>
        </div>
    )
}

export default EventEditorPage;