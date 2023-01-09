import { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import groups from '../../../../utils/data/groups';
import { Icon } from '../../../../components/basics';

interface Props {};

const EventsEditDetailPage: FC<Props> = () => {
    const params = useParams<any>();
    const group = useMemo(() => {
        if (params.group) return groups[params.group as keyof typeof groups]
    }, [params.group]);
    
    return (
        <div className="page page--blank page--hide-footer h-full flex flex-col">
            <div className="sticky top-0 bg-white flex items-center gap-4 border-b-2 border-gray-200">
                <Link to=".." relative="path" className="p-4 flex items-center gap-4 bg-red-100 text-red-500">
                    <Icon name="arrow-left" />
                    <span className="uppercase text-sm tracking-widest font-semibold">Terug naar overzicht</span>
                </Link>
                <div>Je bewerkt het Haegeprekerke van de <span className="lowercase font-semibold">{ group?.name }</span></div>
            </div>
            <iframe
                src={`https://docs.google.com/document/d/${ group?.activityEditorCode }/edit?rm=demo`}
                width="100%" 
                className="flex-1"
            />
        </div>
    )
}

export default EventsEditDetailPage;