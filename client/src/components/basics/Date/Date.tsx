import dayjs, { ConfigType } from 'dayjs';
import { FC } from 'react';

interface Props {
    date?: ConfigType;
    children?: string;
    format?: string;
};

const Date: FC<Props> = ({ date = dayjs(), children: childrenAsFormat, format }) => {
    const formatted = dayjs(date).format(childrenAsFormat || format);
    
    return (<>{ formatted }</>)
}

export default Date;