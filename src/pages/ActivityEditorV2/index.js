import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Fade from 'react-reveal/Fade';

import { Container, PageWrapper, RenderContent, TimeLineCard, CenterMessage, Button, Icon } from '../../components';
import QUERIES from '../../graphql/queries';
import { className, sortActivitiesByDate } from '../../utils';

const reorder = (list, { index: startIndex }, { index: endIndex }) => {
    const oldDates = list.map(({ period }) => period);
    
    const result = Array.from(list);
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    const newDates = result.map(({ period, ...otherData }, index) => ({ ...otherData, period: oldDates[index] }))
    
    return newDates;
};

const Date = (props) => {
    const { current, snapshot, period, index, source, destination } = props
    const isOverlapped = current === index;
    const isDragged = snapshot?.draggingOver
    
    return (
        <Fade spy={ period }>
            <h3 className="text-red-500 font-serif text-xl">
                <span { ...className(
                    (
                        current !== -1 && isDragged && !isOverlapped ||
                        isOverlapped && !isDragged
                    ) && 'line-through mr-2')}
                >
                    { dayjs(period.start).format('D MMMM') }
                    { period.multiple && <> tot { dayjs(period.end).format('D MMMM') }</>} 
                </span>
                {( isDragged && !isOverlapped && destination ) && <>{ dayjs(destination.period.start).format('D MMMM') } { destination.period.multiple && <>tot { dayjs(destination.period.end).format('D MMMM') }</> }</>}
                {( isOverlapped && !isDragged && source ) && <>{ dayjs(source.period.start).format('D MMMM') } { source.period.multiple && <>tot { dayjs(source.period.end).format('D MMMM') }</> }</>}
            </h3>
        </Fade>
    )
}

const ActivityEditorV2 = () => {
    const [ list, updateList ] = useState([])
    const [{ current, source, destination }, setCurrent ] = useState({
        current: -1,
        source: undefined,
        destination: undefined
    })
    const { group } = useParams()
    const { data, error } = useQuery(QUERIES.HAEGEPREKERKE)
    
    const handleDragEnd = (result) => {
        setCurrent({
            current: -1,
            source: undefined,
            destination: undefined
        })
        
        // dropped outside the list
        if (!result.destination) {
          return;
        }

        const items = reorder(
          list,
          result.source,
          result.destination
        );

        updateList(items);
    }
    
    const handleDragStart = (s) => {
        const source = s.source.index
        const destination = s.destination.index
        
        setCurrent({
            current: destination,
            source: list[source],
            destination: list[destination]
        })
    }
    
    useEffect(() => {
        if (data) {
            const { HaegeprekerkeItems: { items: [{ content }]}} = data;
            updateList(content[group]);
        }
    }, [data])
       
    if (!data) return <p>Loading</p>
    if (error) return <CenterMessage
        icon="signal-wifi-error"
        intro="We konden het Haegeprekerke niet ophalen"
    >
        Er is mogelijks iets mis met je internetverbinding
    </CenterMessage>
        
    return (
        <PageWrapper>
            <Container>
                <Button theme="button" icon="arrow-left" className="mb-12" to={ '/haegeprekerke/edit/' + group }>Terug naar oude editor</Button>
                <div className="bg-gray-100 py-4 px-5 text-sm mb-6">
                    <ul className="list-disc list-inside">
                        <li>Deze editor werkt nog niet, maar dient als demo en werkt mogelijks nog niet goed op alle apparaten.</li>
                        {/* <li>Klik op een activiteit om die te bewerken.</li> */}
                        <li>Activiteiten kunnen in elke volgorde gesleept worden met de hendel aan de linkerkant. Let op! Datums worden automatisch aangepast.</li>
                    </ul>
                </div>
                <div className='border-l-2 border-red-500 border-opacity-40'>
                    <DragDropContext onDragEnd={ handleDragEnd } onDragUpdate={ handleDragStart }>
                        <Droppable droppableId="activitiesList">
                            {( provided, snapshot ) => (
                                <div
                                    { ...provided.droppableProps }
                                    ref={ provided.innerRef }
                                >
                                    { list
                                        .map(({ _uid, title, descr, period}, index) => (
                                            <Draggable key={ _uid } draggableId={ _uid } index={ index }>
                                                {(provided, snapshot) => (
                                                    <div
                                                        { ...provided.draggableProps }
                                                        ref={ provided.innerRef }
                                                    >
                                                        <TimeLineCard
                                                            { ...className(
                                                                'bg-white border-2 border-gray-300', 
                                                                snapshot.draggingOver && 'shadow-lg',
                                                                (current === index && !snapshot?.draggingOver) ? 'border-red-500' : 'border-gray-300'
                                                            )}
                                                            draggable={ 
                                                                <div
                                                                    className="absolute -left-3 top-0 bg-white border-2 border-red-500 text-red-500 py-1.5"
                                                                    { ...provided.dragHandleProps }
                                                                >
                                                                    <Icon name="more-2" color="inherit" size="1.2rem" className="font-bold"/>
                                                                </div> 
                                                            }
                                                        >
                                                            <div className="p-5">
                                                                <Fade spy={ period }>
                                                                    <Date { ...{ current, snapshot, period, index, source, destination }} />
                                                                    {/* <h3 className="text-red-500 font-serif text-xl"> */}
                                                                        {/* <span { ...className(
                                                                            (
                                                                                current !== -1 && snapshot?.draggingOver ||
                                                                                current === index && !snapshot?.draggingOver
                                                                            ) && 'line-through mr-2')}>{ dayjs(period.start).format('D MMMM') }
                                                                        </span> */}
                                                                        {/* { 
                                                                            (current === index && !snapshot?.draggingOver) ?
                                                                            source && dayjs(source.period.start).format('D MMMM') : 
                                                                            destination && dayjs(destination.period.start).format('D MMMM') 
                                                                        } */}
                                                                        {/* { period.multiple && <> tot { dayjs(period.end).format('D MMMM') }</>}  */}
                                                                    {/* </h3> */}
                                                                </Fade>
                                                                <h4 className="mb-3 font-medium text-lg">{ title }</h4>
                                                                <RenderContent content={ descr } />
                                                            </div>
                                                            <div className="border-t-2 border-gray-300 p-5">
                                                                <Fade spy={ period.multiple }>
                                                                    { period.multiple ?
                                                                        <p className="text-sm">Activiteiten over meerdere dagen kan je nog niet bewerken. Stuur iemand van redactie.</p> :
                                                                        <Button icon="edit-2" theme="simple" className="cursor-not-allowed opacity-50">Activiteit bewerken</Button>
                                                                    }
                                                                </Fade>
                                                            </div>
                                                        </TimeLineCard>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                    { provided.placeholder }
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default ActivityEditorV2