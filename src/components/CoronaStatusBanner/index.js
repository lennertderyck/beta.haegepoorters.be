import React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import CoronaStatusBadge from '../CoronaStatusBadge';

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
                    <CoronaStatusBadge className="bg-white" />
                </div>
            </div>
        </Button>
    )
}

export default CoronaStatusBanner