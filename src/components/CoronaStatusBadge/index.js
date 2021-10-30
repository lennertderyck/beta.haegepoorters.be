import React from 'react'

import { Icon } from '..'
import { className } from '../../utils'

const custom = (statusCode) => {
    return {
        '2': {
            label: 'Activiteiten toegelaten',
            icon: 'check-double',
            className: 'text-green-500'
        },
        '1': {
            label: 'Activiteiten beperkt',
            icon: 'surgical-mask',
            className: ''
        },
        '0': {
            label: 'Activiteiten opgeschort',
            icon: 'close-circle',
            className: ''
        },
    }[statusCode]
}

const Wrapper = ({ className: cls }) => <div { ...className(
    'rounded-full tracking-widest font-serif font-bold uppercase text-green-500 px-3 py-2 text-sm flex items-center w-fit',
    cls
)}>
    activiteiten toegelaten
    <Icon name="check-double" className="opacity-50 inline text-green-500 ml-2" color="inherit" />
</div>

const CoronaStatusBadge = ({ className: cls, statusCode }) => {
    const { label, icon, className: customCls } = custom(statusCode);
    
    return <Wrapper className={ cls }>
        { label }
        <Icon name={ icon } { ...className(
            'opacity-50 inline ml-2',
            customCls
        ) } color="inherit" />
    </Wrapper>
}

export default CoronaStatusBadge