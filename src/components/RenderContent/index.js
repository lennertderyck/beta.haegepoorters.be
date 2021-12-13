import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer-ts';
import { className } from '../../utils';

import styles from './RenderContent.module.scss';

const RenderContent = ({ content, className: cls, children }) => (
    <div {...className(styles.container, cls)}>
        { children || render(content) }
    </div>
)

export default RenderContent