import { FC, TextareaHTMLAttributes } from 'react';
import useControlledInputs from '../../../utils/hooks/useControlledInputs/useControlledInputs';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
};

const TextArea: FC<Props> = ({ name, className, ...otherProps }) => {
    const [registrar] = useControlledInputs(name);
      
    return (
        <textarea 
            className={ classNames(className, styles.area)}
            {...registrar} 
            {...otherProps} 
        />
    )
}

export default TextArea;