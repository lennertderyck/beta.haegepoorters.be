import { FC, useEffect } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { useParams } from 'react-router-dom';
import { EditionActivity } from '../../../../types/content';
import { Button, Date, Loader } from '../../../../components/basics';

interface Props {};

const EventsEditorEditonPage: FC<Props> = () => {
    const params = useParams<any>();
    const { data: activities, refetch, loading } = useAxios<EditionActivity[]>(process.env['REACT_APP_BACKEND_URL'] + '/activities', {
        params: {
            edition: params.edition,
            group: params.group
        }
    });
    
    useEffect(() => {
        refetch();
    }, [params.edition])
        
    if (loading) return (
        <div className="flex items-center gap-3 w-fit">
            <div className="label text-sm">Activiteiten ophalen</div>
            <div className="w-fit"><Loader size="1.3rem" /></div>
        </div>
    )
    else return (
        <>
            <div className="flex items-center justify-end">
                <Button icon="add" to="new">Activiteit toevoegen</Button>
            </div>
            <ul className="list mt-6">
                { activities?.map((activity) => (
                    <li
                        key={ activity.id }
                        className="list__item flex items-center justify-between"
                    >
                        <div>
                            <h5 className="text-red-500 font-serif text-xl">
                                <Date format="DD MMMM">{ activity.start }</Date>
                                {/* { activity.multiple && <> tot <Date format="DD MMMM">{ activity.period.end }</Date></>} */}
                            </h5>
                            <h4 className="font-medium text-lg">{ activity.title }</h4>
                        </div>
                        <Button theme="simple" icon="edit" to={ activity.id }>Bewerken</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default EventsEditorEditonPage;