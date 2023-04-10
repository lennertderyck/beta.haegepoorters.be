import { FC, useMemo, useState } from 'react';
import { Event } from '../../../../types/content';
import { Button, Date, ExpansionPane, Icon } from '../../../../components/basics';
import { GroupAbbrev } from '../../../../types/general';
import groups from '../../../../utils/data/groups';

interface Props {
    group: GroupAbbrev;
    event: Event | undefined;
};

const EventCard: FC<Props> = ({ event, group }) => {        
    const [ open, setOpen ] = useState(false);
    
    const maxContentLength = 150;
    
    const contentLength = useMemo(() => {
        return event?.description ? event.description.length : 0;
    }, [event?.description]); 
    const eventDescription = useMemo(() => {
        return event?.description.substring(0, maxContentLength)
    }, [event?.description])
    const groupName = useMemo(() => {
        return groups[group].name;
    }, [group])
        
    if (!event) return null;
    return (
        <div 
            className="flex bg-gray-50 px-6 py-4 border-b-2 gap-6 cursor-pointer"
        >
            <div onClick={() => setOpen(s => !s)}>
                <div className="-mb-2 text-center text-gray-400 relative">
                    <span className="font-bold text-3xl"><Date format="DD">{ event.start }</Date></span>
                    { event.multiple && <span className="font-semibold absolute -right-2 top-1/2 -translate-y-1/2">+</span>}
                </div>
                <div className="text-center font-serif uppercase text-gray-400"><Date format="MMM">{ event.start }</Date></div>
            </div>
            <div className="flex-1">
                <div onClick={() => setOpen(s => !s)}>
                    <h4 className="font-semibold text-xl">{ event.title }</h4>
                    <h5 className="text-xs uppercase tracking-wider font-medium whitespace-nowrap">{ groupName }</h5>
                </div>
                
                { contentLength !== 0 && (
                    <div className="-my-2">
                        <ExpansionPane active={ open }>
                            <div className="xl:max-w-[75%]" onClick={() => setOpen(s => !s)}>
                                <p className="mt-2 font-serif leading-5">{ eventDescription }{ contentLength >= maxContentLength && '...'}</p>
                            </div>
                            <Button to={ '/haegeprekerke/' + group } theme="simple" className="mt-3" icon="arrow-right">Lees meer</Button>
                        </ExpansionPane>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventCard;