import { FC } from 'react';
import useContentResolver from '../../../utils/hooks/useContentResolver/useContentResolver';

interface Props {
    content?: any;
    children?: any;
};

const ContentRender: FC<Props> = ({ children, content }) => {
    const { Parsed } = useContentResolver(children || content);
    
    return <Parsed className="content" />
}

export default ContentRender;