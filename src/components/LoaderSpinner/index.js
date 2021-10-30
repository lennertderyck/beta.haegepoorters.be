import React from 'react';
import { SpinnerCircular } from 'spinners-react';

const LoaderSpinner = ({ intro, msg, children }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <SpinnerCircular сolor="transparant" secondaryColor="#661A2030" style={{ color: '#661A20' }} />
            { intro && <h2 className="text-2xl text-center font-serif">{ intro }</h2>}
            { msg || children && <p className="text-center">{ msg || children  }</p> }
        </div>
    )
}

export default LoaderSpinner