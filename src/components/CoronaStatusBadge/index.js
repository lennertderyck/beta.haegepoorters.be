import React from 'react'

import { Icon } from '..'
import { className } from '../../utils'
import { useAxios } from 'use-axios-client'
import { ENDPOINTS } from '../../utils'

const custom = (statusCode) => {
    return {
        '2': {
            label: 'Activiteiten toegelaten',
            icon: 'check-double',
            className: 'text-green-500',
            borderClassName: 'border-green-100'
        },
        '1': {
            label: 'Aangepaste maatregelen',
            icon: 'surgical-mask',
            className: 'text-kiwi-500',
            borderClassName: 'border-kiwi-100'
        },
        '0': {
            label: 'Activiteiten opgeschort',
            icon: 'close-circle',
            className: 'text-red-500',
            borderClassName: 'border-red-100'
        },
        'loading': {
            label: 'Status ophalen',
            icon: 'loader-5',
            className: 'text-gray-500',
            iconClassName: 'animate-spin',
            borderClassName: 'border-gray-200',
        }
    }[statusCode]
}

const Wrapper = ({ className: cls, border, status }) => {
    const { label, icon, className: customCls, borderClassName, iconClassName } = custom(status);
    
    return <div { ...className(
        'rounded-full px-3 py-2 flex items-center w-fit',
        cls,
        border && borderClassName + ' border-2', customCls
    )}>
        <span className="tracking-widest font-serif font-bold uppercase text-sm">{ label }</span>
        <Icon name={ icon } { ...className(
            'opacity-50 inline ml-2',
            customCls,
            iconClassName
        ) } color="inherit" />
    </div>
}

const CoronaStatusBadge = ({ className: cls, border, statusCode = '2' }) => {
    const { data } = useAxios(ENDPOINTS.SITE_CONFIG)
    
    if (!data) return <Wrapper { ...{ border, className: cls }} status="loading" />
    
    const { corona_status } = data;
    
    return <Wrapper { ...{ border, className: cls }} status={ corona_status } />
}

export default CoronaStatusBadge