import dayjs from 'dayjs';
import { FC } from 'react';

interface Props {
    children?: string;
};

const Component: FC<Props> = ({ children: childrenAsDate}) => {
    // @ts-ignore
    const formatted = dayjs(dayjs()).from(childrenAsDate, true)
    
    return (<>{ formatted }</>)
}

export default Component;