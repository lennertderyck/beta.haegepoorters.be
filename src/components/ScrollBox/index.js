import React from 'react';
import { className } from '../../utils';

import styles from './ScrollBox.module.scss'

const ScrollBox = ({ children, className: cls }) => {
    return (
        <div { ...className( styles.wrapper, cls ) }>
            { children }
        </div>
    )
}

export default ScrollBox