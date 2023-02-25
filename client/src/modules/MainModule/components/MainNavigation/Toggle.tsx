import { ButtonHTMLAttributes, FC } from 'react';
import { Icon } from '../../../../components/basics';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {};

const Toggle: FC<Props> = (props) => {
    return (
        <button
            { ...props }
            className="flex items-center whitespace-nowrap fixed top-4 right-4 z-50 w-12 h-12 bg-red-500 p-3 rounded-full shadow justify-center lg:hidden cursor-pointer"
        >
            <Icon name="menu" className="text-white" />
        </button>
    )
}

export default Toggle;