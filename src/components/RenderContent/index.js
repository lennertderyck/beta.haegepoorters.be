import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer-ts';
import { className } from '../../utils';

import styles from './RenderContent.module.scss';

const RenderContent = ({ content, className: cls }) => <div {...className(styles.container, cls)}>{ render(content) }</div>

export default RenderContent