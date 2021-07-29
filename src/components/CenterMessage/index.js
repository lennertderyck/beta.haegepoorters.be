import React from 'react';
import Icon from '../Icon';

const CenterMessage = ({ icon, intro, msg, children }) => (
    <>
        <Icon name={ icon } className="text-center mb-2" size="2rem" />
        <h2 className="text-2xl text-center font-serif">{ intro }</h2>
        <p className="text-center">{ msg || children  }</p>
    </>
)

export default CenterMessage