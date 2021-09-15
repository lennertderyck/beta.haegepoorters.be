import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer-ts';

import styles from './RenderContent.module.scss';

const RenderContent = ({ content }) => <div className={ styles.container }>{ render(content) }</div>

export default RenderContent