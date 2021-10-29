import React from 'react'

import { Icon } from '..'
import { className } from '../../utils'

const CoronaStatusBadge = ({ className: cls }) => {
    return <div { ...className(
        'rounded-full tracking-widest font-serif font-bold uppercase text-green-500 px-3 py-2 text-sm flex items-center w-fit',
        cls
    )}>
        activiteiten toegelaten
        <Icon name="check-double" className="opacity-50 inline text-green-500 ml-2" color="inherit" />
    </div>
}

export default CoronaStatusBadge