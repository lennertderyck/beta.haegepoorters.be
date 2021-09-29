import React, { useReducer } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import imageReducer, { initialImageState } from '../../reducers/images';
import { className } from '../../utils';

// const Image = styled.img.attrs({
//     loading: 'lazy'
// })`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `;

const Image = ({ className: cls, ...otherProps }) => (
    <img 
        loading="lazy" 
        alt=""
        { ...className(
            'w-full h-full object-cover',
            cls
        )}
        { ...otherProps }
    />
)

const Wrapper = styled.div`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
`;

const Img = ({ src, height = 'auto', width = '100%', className: cls }) => {
    const [ state, dispatch ] = useReducer(imageReducer, initialImageState)
    
    return (
        <Wrapper
            height={ height } 
            width={ width }
            { ...className(
                'relative overflow-hidden',
                !state.loaded && 'bg-gray-200',
                cls
            )}
        >
            <Image 
                src={ src } 
                { ...className(
                    'relative ease-linear',
                    state.loading && 'opacity-0',
                    state.loaded && 'opacity-100'
                )}
                onLoadStart={() => dispatch('loading')}
                onLoad={() => dispatch('loaded')}
                onError={() => dispatch('error')}
            />
            <Skeleton 
                width="100%" 
                height="100%" 
                { ...className(
                    'absolute top-0 left-0 z-10 duration-600 ease-out',
                    state.loaded && 'left-full'
                )}
            />
        </Wrapper>
    )
}

export default Img