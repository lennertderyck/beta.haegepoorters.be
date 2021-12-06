import React, { useEffect, useState } from 'react';
import { useLazyAxios } from 'use-axios-client';
import dayjs from 'dayjs';

import { Button, CenterMessage, Collapse, Form, Icon, Input } from '..';
import { surveyOptions } from '../../data/site';
import { className, checkSurveyResponse, cookieHook, ENDPOINTS } from '../../utils';

const Survey = ({ className: cls }) => {
    const [ savedResponse, setSavedResponse ] = useState()
    const [ sendData, { data, error, loading }] = useLazyAxios({
        url: ENDPOINTS.SURVEY_1_SITE,
        method: 'POST'
    })
    
    // use useRef?
    useEffect(() => {
        checkSurveyResponse((responded, data) => responded && setSavedResponse(data))
    }, [])
    
    
    const handleUserResponse = ({ rating, comment }) => {
        rating = parseInt(rating)
        
        cookieHook.set('survey_1_site', JSON.stringify({
            rating,
            date: new Date()
        }))
        
        sendData({
            identifier: window.localStorage.getItem('SL_L_23361dd035530_VID'),
            rating,
            comment,
            origin: window.location.href,
            dev_mode: process.env.NODE_ENV === 'development',
        })
    }
    
    const handleIgnore = () => {
        cookieHook.set('survey_1_site', JSON.stringify({
            ignore: 'later',
            date: new Date()
        }))
    }
    
    if (savedResponse?.rating && process.env.NODE_ENV !== 'development') return null
    if (!data) return <div>
        <Form 
            {...className(cls)}
            onSubmit={ handleUserResponse }
        >
            {({ watchedValues: data }) => <>
                <h3 className="text-lg text-center">Wat is je gevoel bij onze nieuwe site?</h3>
                <div className="flex justify-center mt-4">
                    { surveyOptions.map(({ icon, value }) => (
                        <Input type="wrapper" name="rating" value={ value }>
                            {({ checked }) => (
                                <Icon 
                                    name={ icon } 
                                    size="1.7rem" 
                                    color={ checked && '#661A20' } 
                                    { ...className(
                                        'mx-2',
                                        data?.rating == value ? 'transform scale-110' : 'opacity-50'
                                    )} 
                                />
                            )}
                        </Input>
                    ))}
                </div>
                
                {/* <Fade when={ data.rating } mountOnEnter unmountOnExit>
                    <div className="mt-4">
                        <Input type="area" name="comment" label="Nuanceer je keuze (optioneel)" />
                    </div>
                </Fade> */}
                <div className="flex flex-col items-center mt-6">
                    <Button type="submit" theme="button" loading={ loading }>Versturen</Button>
                    <Button type="button" theme="simple" className="px-3 mt-4" onClick={ handleIgnore }>Vraag me later</Button>
                </div>
            </>}
        </Form>
    </div>
    
    else return <div
        className={ cls }
    >
        <CenterMessage
            icon="thumb-up"
            intro="Bedankt!"
        >
            We waarderen je feedback!
        </CenterMessage>
    </div>
}

export default Survey