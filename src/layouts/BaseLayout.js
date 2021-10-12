import React from 'react';
import { Footer, MainMenu } from '../components';
import { className } from '../utils';

import styles from './Layouts.module.scss'

const BaseLayout = ({ children }) => {
    
    return (
        <div className="flex">
            <div className={ styles.mainMenu }> 
                <MainMenu />
            </div>
            <div { ...className('w-full min-h-screen flex flex-col', styles.screen )}>
                <div className="flex-1">
                    { children }
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default BaseLayout