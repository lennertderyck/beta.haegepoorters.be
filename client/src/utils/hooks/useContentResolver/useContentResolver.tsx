import { FC, HTMLAttributes, createElement, useMemo, useRef } from 'react';
// @ts-ignore
import RichTextResolver from 'storyblok-js-client/source/richTextResolver';

const useContentResolver = (data: any) => {
    const resolver = useRef(new RichTextResolver());
    const raw = useMemo(() => resolver.current.render(data), [resolver, data]);
   
    const Parsed: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
        return createElement('div', {
            ...props,
            dangerouslySetInnerHTML: {
                __html: raw
            }
        })
    }
    
    return {
        raw,
        Parsed
    }
}

export default useContentResolver;