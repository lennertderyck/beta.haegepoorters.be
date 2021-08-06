import React from 'react';
import Button from '../Button';
import Icon from '../Icon';

// import styles from './CoronaStatusBanner.module.scss';

const CoronaStatusBanner = () => {    
    return (
        <Button to="/corona" theme="clear" className="w-full">
            <div
                className="bg-gray-200 flex justify-between p-3 w-full"
            >
                <div className="flex">
                    <div className="flex items-center mr-3">
                        <Icon name="virus" size="2rem"/>
                    </div>
                    <div className="flex items-center">
                        <h3 className="font-semibold text-lg mr-2">Scouting tijdens corona</h3>
                        <Icon name="arrow-right" size="1.2rem"/>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-end">
                    <div className="rounded-full bg-white tracking-widest font-serif font-bold uppercase text-green-500 px-3 py-2 text-sm flex items-center">
                        activiteiten toegelaten
                        <Icon name="check-double" className="opacity-50 inline text-green-500 ml-2" />
                    </div>
                </div>
            </div>
        </Button>
    )
}

export default CoronaStatusBanner