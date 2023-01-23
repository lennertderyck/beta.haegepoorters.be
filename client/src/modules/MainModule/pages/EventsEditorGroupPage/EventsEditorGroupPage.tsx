import { FC, useEffect } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { Edition } from '../../../../types/content';
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import EditionNavButton from './EditionNavButton';
import { Group } from '../../../../types/general';
import { Button, Date, Loader } from '../../../../components/basics';
import { sortEventEditionsByStartDate } from '../../../../utils/funcs/algorithms/sorting';

interface Props {};

const EventsEditorGroupPage: FC<Props> = () => {
    const loaderGroupData = useLoaderData() as Group;
    const navigate = useNavigate();
    const params = useParams<any>();
    const { data: editions, loading: editionsLoading } = useAxios<Edition[]>(process.env['REACT_APP_BACKEND_URL'] + '/editions');
    
    const firstEditon = editions?.sort(sortEventEditionsByStartDate)?.[0];
    
    useEffect(() => {
        if (!!!params.edition && firstEditon) {
            navigate(firstEditon.id);
        }
    }, [firstEditon, params.edition]);
    
    const selectedEditon = editions?.find((edition) => edition?.id === params.edition);
        
    return (
        <div className="page">
            <div className="page__header">
                <Button to="/haegeprekerke/editor" icon="arrow-left" iconPlacement="start">Overzicht groepen</Button>
                <h1 className="page__title mt-12">{ loaderGroupData.name }</h1>
                { editions && editions?.length > 1 && (
                    <ul className="flex flex-wrap gap-4">
                        { editions?.sort(sortEventEditionsByStartDate).map((edition) => (
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
                        <div className="label text-sm">Haegeprekerkes ophalen</div>
                        <div className="w-fit"><Loader size="1.3rem" /></div>
                    </div>
                ) : (
                    <>
                        {!!!params.edition && <p className="text-gray-400">Selecteer een editie om te beginnen</p>}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                { editions?.length === 1 && (
                                    <>
                                        <h3 className="text-red-500 font-serif">
                                            <span className="capitalize"><Date format="MMMM">{ firstEditon?.start }</Date></span> tot <span className="capitalize"><Date format="MMMM">{ firstEditon?.end }</Date></span>
                                        </h3>
                                        <p><Date format="DD/MM">{ firstEditon?.start }</Date> - <Date format="DD/MM">{ firstEditon?.end }</Date></p>
                                    </>
                                )}
                            </div>
                            {
                                selectedEditon && selectedEditon?.editable && (
                                    <Button icon="add" to={`/haegeprekerke/editor/${ params.group }/${ params.edition }/new`} relative="path">Activiteit toevoegen</Button>
                                )
                            }
                        </div>
                        { selectedEditon && !selectedEditon?.editable && (
                            <div className="p-6 rounded-lg bg-gray-100 text-sm">
                                Je kan deze editie (nog) niet bewerken
                            </div>
                        )}
                        <Outlet />
                    </>
                )}
            </div>
        </div>
    )
}

export default EventsEditorGroupPage;