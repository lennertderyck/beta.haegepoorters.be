import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer-ts';

const RenderContent = ({ content }) => <>{ render(content) }</>

export default RenderContent