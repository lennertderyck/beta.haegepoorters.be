import React from 'react';
import Icon from '../Icon';
import Fade from 'react-reveal/Fade';
import { className } from '../../utils';

const CenterMessage = ({ icon = 'seedling', intro, msg, className: cls, children }) => (
    <Fade bottom duration={ 500 }>
        <>
            <Icon 
                { ...className(
                    cls,
                    'text-center mb-2'
                )}
                name={ icon } 
                size="2rem" 
            />
            <h2 className="text-2xl text-center font-serif">{ intro }</h2>
            <p className="text-center">{ msg || children  }</p>
        </>
    </Fade>
)

export default CenterMessage