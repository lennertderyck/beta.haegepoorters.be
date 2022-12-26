import dayjs, { ConfigType } from 'dayjs';
import { FC } from 'react';

interface Props {
    date?: ConfigType;
    children?: string;
    format?: string;
};

const Date: FC<Props> = ({ date = dayjs(), children: childrenAsDate, format }) => {
    const formatted = dayjs(childrenAsDate || date).format(format);
    
    return (<>{ formatted }</>)
}

export default Date;