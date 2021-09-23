import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';

import { Button, CenterMessage, Container, Icon, PageWrapper, RenderContent, RenderTimes } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import QUERIES from '../../graphql/queries';
import Skeleton from 'react-loading-skeleton';
import { activityIsPassed, className, sortActivitiesByDate } from '../../utils';

/**
 * Sort all activities by date
 * Find first that is not passed
 */

const VisitorSelector = () => {
    const [ open, setOpen ] = useState(false);
    const { role, setRole, siteGroups } = useVisitor();
    
    const groups = siteGroups.filter(({ isGroup }) => isGroup);
    
    return (
        <div className="relative z-10">
            <Button 
                onClick={() => setOpen(p => !p)}
                theme="clear"
                className="text-red-500 bg-red-500 bg-opacity-10 flex justify-end py-2 pl-3 pr-2 tracking-widest text-xs uppercase font-semibold"
            >
                <span>{ role.plur }</span>
                <Icon name="arrow-down-s" className="ml-1" color="#6f101d" />
            </Button>
            <div className="absolute top-full right-0 mt-2">
                <Fade when={ open } collapse duration={ 500 }>
                    <div className="p-3 text-red-500 bg-red-100">
                        { groups.map(({ plur, value }) => (
                            (role.value !== value) && <Button
                                key={ value }
                                className="text-right w-full tracking-widest text-xs uppercase font-semibold mb-3 last:mb-0"
                                onClick={() => {
                                    setRole(value)
                                    setOpen(false)
                                }}
                            >{ plur }</Button>
                        ))}
                    </div>
                </Fade>
            </div>
        </div>
    )
}

const Loader = () => {
    return (
        <div className="border-l-2 border-gray-400 border-opacity-40 pb-8 pl-8 relative">
            <div className="absolute -left-1.5 top-3 w-3 h-3 bg-gray-400 border-2 border-gray-400 rounded-full" />
            <Skeleton height="2rem" width="10rem" /><br />
            <Skeleton height="1.2rem" width="15rem" className="mb-3" />
            <div className="font-serif">
                <div className="-mb-1">   
                    <Skeleton height="1rem" width="60%" />
                </div>
                <Skeleton height="1rem" width="70%" />
            </div>
        </div>
    )
}

const ActivityCard = ({ data, simple, scrollTo }) => {
    const cardRef = useRef()
    
    const { title, descr, period: { start }} = data;
    const isPast = activityIsPassed(start);
    
    // useEffect(() => {
    //     cardRef.current.scrollIntoView()
    // }, [])
    
    return (
        <div
            ref={ cardRef }
            { ...className(
                'border-l-2 border-red-500 border-opacity-40 pb-8 pl-8 relative',
                isPast && 'opacity-60'
            )}
        >
            <div className="absolute -left-1.5 top-2 w-3 h-3 bg-red-500 border-2 border-red-500 rounded-full" />
            <h3 className="text-gray-600">{ dayjs(start).format('DD MMMM') }</h3>
            <h4 className="mb-2">{ title }</h4>
            {!simple && <div className="font-serif">
                <RenderContent content={ descr } />
            </div>}
        </div>
    )
}

const RenderActivities = () => {
    const { data, loading, error } = useQuery(QUERIES.HAEGEPREKERKE)
    const { role, siteGroups, setRole } = useVisitor()
    
    if (loading) return <Container>
        <RenderTimes>
            <Loader />
        </RenderTimes>
    </Container>
    
    if (error) return <CenterMessage
        icon="signal-wifi-error"
        intro="We konden het Haegeprekerke niet ophalen"
    >
        Er is mogelijks iets mis met je internetverbinding
    </CenterMessage>

    const { HaegeprekerkeItems: { items: [{ content }]}} = data;
    const groupActivities = () => [...content[role.value]].sort(sortActivitiesByDate)
    const nextActivity = groupActivities().find(({ period: { start }}) => {
        return activityIsPassed(start) === false
    })
    
    const groups = siteGroups.filter(({ isGroup }) => isGroup )
        
    if (role.isGroup) return (
        <Container>
            { groupActivities().map((data, index) => <ActivityCard data={ data } key={ index } />) }
        </Container>
    )
    
    return (
        <Container wide>
            <div className="grid grid-cols-5">
                { groups.map(({ value, plur }) =>
                    <div 
                        key={ value }
                        className="col-span-1 cursor-pointer" 
                        onClick={() => setRole(value)}
                    >
                        <h4 className="text-2xl font-serif mb-4 font-medium capitalize">{ plur }</h4>
                        { [...content[value]]
                            .sort(sortActivitiesByDate)
                            .map((data, index) => (
                                <ActivityCard data={ data } simple key={ index } scrollTo={ data['_uid'] === nextActivity['_uid'] } />
                            )
                        )}
                    </div>
                )}
            </div>
        </Container>
    )
}

const ActivityPage = () => {    
    return (<PageWrapper>
        <Container className="mb-12 flex lg:justify-between flex-col md:flex-row items-start">
            <div className="mb-4"> 
                <h1 className="font-serif font-bold text-5xl text-gray-600 mb-6">Haegeprekerke</h1> 
                <p>Onze weekelijkse activiteiten</p>
            </div>
            <div className="flex flex-col items-start md:items-end">
                <p className="text-gray-400 text-right text-sm font-medium mb-2">Selecteer je tak</p>   
                <VisitorSelector />
            </div>
        </Container>
        {/* { !role.isGroup &&
            <CenterMessage
                intro="Hier is niks te vinden"
                className="mt-4"
            >
                Kies een groep om activiteiten weer te geven
            </CenterMessage>
        } */}
        <RenderActivities />
    </PageWrapper>)
}

export default ActivityPage