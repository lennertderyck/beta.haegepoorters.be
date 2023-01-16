import { FC, useEffect } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { Edition } from '../../../../types/content';
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import EditionNavButton from './EditionNavButton';
import { Group } from '../../../../types/general';
import { Button, Loader } from '../../../../components/basics';

interface Props {};

const EventsEditorGroupPage: FC<Props> = () => {
    const loaderGroupData = useLoaderData() as Group;
    const navigate = useNavigate();
    const params = useParams<any>();
    const { data: editions, loading: editionsLoading } = useAxios<Edition[]>(process.env['REACT_APP_BACKEND_URL'] + '/editions');
    
    useEffect(() => {
        if (!!!params.edition && editions) {
            const firstEditon = editions[0];
            navigate(firstEditon.id);
        }
    }, [editions, params.edition]);
        
    return (
        <div className="page">
            <div className="page__header">
                <Button to="/haegeprekerke/editor" icon="arrow-left" iconPlacement="start">Overzicht groepen</Button>
                <h1 className="page__title mt-12">{ loaderGroupData.name }</h1>
                { editions && editions?.length > 1 && (
                    <ul className="flex flex-wrap gap-4">
                        { editions?.map((edition) => (
                            <li key={ edition.id }>
                                <EditionNavButton edition={ edition } />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="page__content">
                { editionsLoading ? (
                    <div className="flex items-center gap-3 w-fit">
                        <div className="label text-sm">Activiteiten ophalen</div>
                        <div className="w-fit"><Loader size="1.3rem" /></div>
                    </div>
                ) : (
                    <>
                        {!!!params.edition && <p className="text-gray-400">Selecteer een editie om te beginnen</p>}
                        <Outlet />
                    </>
                )}
            </div>
        </div>
    )
}

export default EventsEditorGroupPage;