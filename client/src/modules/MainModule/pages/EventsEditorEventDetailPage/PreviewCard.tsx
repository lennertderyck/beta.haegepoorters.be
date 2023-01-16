import { FC } from 'react';
import EventItem from '../EventsPage/EventItem';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { Date, ExpansionPane } from '../../../../components/basics';
import { EditionActivity } from '../../../../types/content';
import EventItemLoader, { EventItemSkeleton } from '../EventsPage/EventItemLoader';
import dayjs from 'dayjs';

interface Props {
    defaultValues: Partial<EditionActivity>;
};

const PreviewCard: FC<Props> = ({ defaultValues }) => {
    const formControls = useFormContext();
    
    const title = formControls.watch('title', defaultValues.title);
    const start = formControls.watch('start');
    const end = formControls.watch('end');
    const multiple = formControls.watch('multiple', defaultValues.multiple);
    const content = formControls.watch('description', defaultValues.description);
        
    return (
        <div>
            <EventItemSkeleton animated={ false } contentPreview={ false } />
            <div className={classNames(
                'relative border-l-2 border-red-500 border-opacity-40 pl-8 pb-8 group-last:pb-0'
            )}>
                <span className="absolute left-0 translate-x-[-.45rem] bg-red-500 block w-3 h-3 rounded-full" />
                <div className="-translate-y-1.5">
                    <h5 className="text-red-500 font-serif text-xl">
                        <Date format="DD MMMM">{ start }</Date>
                        <ExpansionPane className="inline" active={ multiple }>
                            <> tot <Date format="DD MMMM">{ end }</Date></>
                        </ExpansionPane>
                    </h5>
                    <h4 className="mb-3 font-medium text-lg">{ title }</h4>
                    <div className="content">
                        { content }
                    </div>
                </div>
            </div>
            <EventItemSkeleton animated={ false } contentPreview={ true } />
        </div>
    )
}

export default PreviewCard;