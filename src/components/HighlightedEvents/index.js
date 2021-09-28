import React, { useRef, useState, memo } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import dayjs from 'dayjs';
// import { render } from 'storyblok-rich-text-react-renderer-ts';
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

import queries from '../../graphql/queries'
import RenderTimes from '../RenderTimes';
import { className } from '../../utils';
import CenterMessage from '../CenterMessage';
import Collapse from '../Collapse';
import Button from '../Button';
import { Link } from 'react-router-dom';

const resolver = new RichTextResolver()

const Loader = () => (
    <>
        <div className="flex items-center py-4 px-6 border-b-2 border-gray-200">
            <div className="mr-6">
                <Skeleton height="2rem" width="2rem" />
                <Skeleton height=".75rem" />
            </div>
            <div className="w-full">
                <Skeleton height="1.5rem" width="18rem" /><br/>
                <Skeleton width="12rem" />
            </div>
        </div>
    </>
)

const ActivitySumm = memo(({ descr }) => {     
    const resolvedHTML = resolver.render(descr);
    const parsedHTML = new DOMParser().parseFromString(resolvedHTML, 'text/html');
    const parsedText = parsedHTML.body.textContent.substring(0, 200)
    const length = parsedText.length
            
    return <>{ parsedText }{ length > 250 && '...'}</>
})

const Card = ({ data, group }) => {
    const [ open, setOpen ] = useState(false);
    const el = useRef();
    
    const { title, period, descr } = data;
    const date = dayjs(period.start)
    const descrIsEmpty = descr === '';
                
    return (<div { ...className('flex py-4 px-6 border-b-2 border-gray-200', !descrIsEmpty && 'cursor-pointer')} onClick={() => setOpen(p => !p)} ref={ el }>
        <div className="mr-6">
            <p className="font-bold text-3xl -mb-2 text-center text-gray-400 relative">
                <span>{ date.format('D') }</span>
                <span className="absolute righ-0 text-sm top-1/2 transform -translate-y-1/2">{ period.multiple && '+' }</span>
            </p>
            <p className="text-center font-serif uppercase text-gray-400">{ date.format('MMM').replace('.', '') }</p>
        </div>
        <div className="w-full">
            <h4 className="font-bold text-xl">{ title }</h4>
            <h5 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{ group }</h5>
            { !descrIsEmpty && 
                <div { ...className(
                    'overflow-hidden transition-all font-serif',
                    !open && 'max-h-0 opacity-0 pt-0',
                    open && 'opacity-100 pt-2',
                )}>
                    <ActivitySumm descr={ descr }/>
                </div>
            }
        </div>
    </div>)
}

const HighlightedEvents = () => {
    const { data, loading, error } = useQuery(queries.HIGHLIGHTED_EVENTS)
    
    if (loading) return <div className="bg-gray-100">
        <RenderTimes><Loader /></RenderTimes>
    </div>
    
    if (error) return <CenterMessage
        intro="Oeps"
    >
        We konden dit voorlopig niet laden
    </CenterMessage>
        
    const { 
        HaegeprekerkeItems: { items: [{ content: { kap: [kap], wel: [wel], wol: [wol], jgv: [jgv], giv: [giv] }}]},
        // ActivityItems: { items }
    } = data;
    const groups = [
        {
            label: 'kapoenentak',
            data: kap
        },
        {
            label: 'welpentak',
            data: wel
        },
        {
            label: 'woudlopertak',
            data: wol
        },
        {
            label: 'jonggivertak',
            data: jgv
        },
        {
            label: 'givertak',
            data: giv
        }
    ]
    
    return (<>
        <div className="bg-gray-100">
            { groups.map(({ label, data: g}) => 
                g && <Card 
                    key={ g['_uid'] } 
                    data={ g } 
                    group={ label } 
                />
            )}
        </div>
        <Collapse label="Zie je je tak niet?" className="mt-6">
            <div className="text-sm">
                Het kan zijn dat jouw tak hun activeiten nog niet doorgegeven heeft. In dat geval zullen ze hier snel verschijnen.
                Had je toch graag meer info? <Link to="/contact" className="underline">Contacteer dan je tak</Link>.
            </div>
        </Collapse>
    </>)
}

export default HighlightedEvents