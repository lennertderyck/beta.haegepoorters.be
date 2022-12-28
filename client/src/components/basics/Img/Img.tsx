import { FC, ImgHTMLAttributes, useMemo } from 'react';
import { useAsyncState } from '../../../utils/hooks';
import { className } from '../../../utils/funcs/dom';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

interface WrapperProps {
    width?: string | number;
    height?: string | number;
}

const Wrapper = styled.div<WrapperProps>`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
`;

interface Props extends ImgHTMLAttributes<HTMLImageElement> {};

const Img: FC<Props> = ({ height = 'auto', width = '100%', className: cls, ...otherProps }) => {
    const [ states , { initiate, fulfill, cancelWithError }] = useAsyncState();
    
    const isLoaded = useMemo(() => (
        !states.loading && !states.error
    ), [ states ])
    
    return (
        <Wrapper
            width={ width }
            height={ height }
            { ...className(
                'relative overflow-hidden',
                isLoaded && 'bg-gray-200',
                cls
            )}
        >
            <img 
                loading="lazy" 
                { ...otherProps }
                { ...className(
                    'w-full h-full relative ease-linear object-cover',
                    states.loading && 'opacity-0',
                    isLoaded && 'opacity-100'
                )}
                
                onLoadStart={ initiate }
                onLoad={ fulfill }
                onError={ cancelWithError }
            />
            <Skeleton 
                width="100%" 
                height="100%" 
                { ...className(
                    'absolute top-0 left-0 z-10 duration-600 ease-out',
                    isLoaded && 'left-full'
                )}
            />
        </Wrapper>
    )
}

export default Img;