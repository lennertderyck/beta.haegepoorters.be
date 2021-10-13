import React from 'react';
import { Footer } from '..';
import { className } from '../../utils';

const PageWrapper = ({ children, embedded = false, footer = true }) => (<div className="flex flex-col h-full">
    <div {...className(!embedded && 'py-12 lg:py-24', 'flex-1')}>
        { children}
    </div>
    {( !embedded && footer ) && <Footer />}
</div>)

export default PageWrapper