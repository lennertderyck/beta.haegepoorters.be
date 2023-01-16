import { FC, createElement, useRef, useState } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

interface Props {};

const MarkdownEditor: FC<Props> = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    
    const handleKeyCommand = (command: any, editorState: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    }
    
    const bold = () => {
        RichUtils.toggleInlineStyle(editorState, 'BOLD')
    }

    return (
        <div>
            <button onClick={ bold }>bold</button>
            <Editor 
                editorState={editorState} 
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
}

export default MarkdownEditor;