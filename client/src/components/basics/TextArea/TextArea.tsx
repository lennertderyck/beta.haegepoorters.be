import { FC, TextareaHTMLAttributes } from 'react';
import useControlledInputs from '../../../utils/hooks/useControlledInputs/useControlledInputs';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
};

const TextArea: FC<Props> = ({ name, ...otherProps }) => {
    const [registrar] = useControlledInputs(name);
      
    return (
        <textarea {...registrar} {...otherProps} />
    )
}

export default TextArea;