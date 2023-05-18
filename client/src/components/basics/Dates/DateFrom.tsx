import dayjs from 'dayjs';
import { FC } from 'react';

interface Props {
    children?: string;
    ignoreSuffix?: boolean;
};

const Component: FC<Props> = ({ children: childrenAsDate, ignoreSuffix }) => {
    // @ts-ignore
    const formatted = dayjs(dayjs()).from(childrenAsDate, ignoreSuffix)
    
    return (<>{ formatted }</>)
}

export default Component;