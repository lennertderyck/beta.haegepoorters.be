import React from 'react';
import { className } from '../../utils';

const PageWrapper = ({ children, embedded = false }) => (
    <div {...className(!embedded && 'py-12 lg:py-24')}>
        { children}
    </div>
)

export default PageWrapper