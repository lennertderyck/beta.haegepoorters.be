import React from 'react';
import styled from 'styled-components';
import { className } from '../../utils';

// const path = 'https://unpkg.com/remixicon@2.5.0/fonts/remixicon.symbol.svg'

const I = styled.i`
    display: block;
    font-size: ${({ size }) => size};
    max-height: ${({ size }) => size};
    line-height: ${({ size }) => size};
    color: ${({ tint }) => tint };
`

const Icon = ({ name = 'shirt', style = 'line', size = '1rem', color: tint = 'grey', className: cls }) => {
    return <I size={ size } tint={ tint } { ...className(`ri-${ name }-${ style }`, cls) }/>
}

export default Icon