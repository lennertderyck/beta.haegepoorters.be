import { FC, useMemo, useState } from 'react';
import { Activity } from '../../../../types/content';
import { Button, ExpansionPane, Icon } from '../../../../components/basics';
import useContentResolver from '../../../../utils/hooks/useContentResolver/useContentResolver';
import { GroupAbbrev } from '../../../../types/general';
import groups from '../../../../utils/data/groups';

interface Props {
    group: GroupAbbrev;
    activity: Activity | undefined;
};

const EventCard: FC<Props> = ({ activity, group }) => {
    const content = useContentResolver(activity?.descr);
    const [ open, setOpen ] = useState(false);
    
    const groupName = useMemo(() => {
        return groups[group].name
    }, [ group ])
    
    if (!activity) return null;
            
    return (
        <div 
            className="flex bg-gray-100 px-6 py-4 border-b-2 gap-6 cursor-pointer"
        >
            <div onClick={() => setOpen(s => !s)}>
                <div className="-mb-2 text-center text-gray-400 relative">
                    <span className="font-bold text-3xl">14</span>
                    { activity.period.multiple && <span className="font-semibold absolute -right-2 top-1/2 -translate-y-1/2">+</span>}
                </div>
                <div className="text-center font-serif uppercase text-gray-400">Jan</div>
            </div>
            <div className="flex-1">
                <div onClick={() => setOpen(s => !s)}>
                    <h4 className="font-semibold text-xl">{ activity.title }</h4>
                    <h5 className="text-xs uppercase tracking-wider font-medium whitespace-nowrap">{ groupName }</h5>
                </div>
                
                <div className="-my-2">
                    <ExpansionPane active={ open }>
                        <div className="xl:max-w-[75%]" onClick={() => setOpen(s => !s)}>
                            <p className="mt-2 font-serif leading-5"><content.Parsed /></p>
                        </div>
                        <Button to={ '/haegeprekerke/' + group } theme="simple" className="mt-3" icon="arrow-right">Lees meer</Button>
                    </ExpansionPane>
                </div>
            </div>
        </div>
    )
}

export default EventCard;