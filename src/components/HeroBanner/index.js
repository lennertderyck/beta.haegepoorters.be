import React from 'react';
import { className } from '../../utils';

const HeroBanner = ({ className: cls, children }) => {
    return (
        <div {...className(
            'container bg-gray-200 relative',
            cls
        )}>
            <img 
                src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1628940149/bxkwl4yli627r8dzfv2k.jpg" 
                alt=""
                className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover filter brightness-60"
            />
            <div className="p-16 text-white relative z-10">
                { children }
            </div>
        </div>
    )
}

export default HeroBanner