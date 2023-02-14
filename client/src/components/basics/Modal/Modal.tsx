import { FC, PropsWithChildren, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useModal from './useModal/useModal';
import { ModalRemote } from './Modal.types';
import classNames from 'classnames';
import Button from '../Button/Button';

interface Props extends PropsWithChildren {
    defaultState?: boolean;
    remote?: ModalRemote;
    variant?: 'modal' | 'snack';
    blank?: boolean;
};

const Modal: FC<Props> = ({ children, defaultState, remote, variant = 'modal', blank }) => {
    const [ index, setIndex ] = useState<number>(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const [ modalState, controls ] = useModal({ defaultState, remote });
    
    useLayoutEffect(() => {
        const allModals = document.querySelectorAll<HTMLDivElement>('.Modal');
        const index = Array.from(allModals).reverse().findIndex((modal) => modal === rootRef.current);
        setIndex(index);
    })
    
    if (!modalState.open) return null;
    else return (
        <div 
            ref={ rootRef } 
            style={{
                zIndex: 100 - index,
            }}
            className={classNames(
                'Modal', 'Index--' + index,
                'fixed inset-0 flex px-12 lg:px-0 justify-center bg-black bg-opacity-30 z-50',
                variant === 'snack' ? 
                    'items-end py-12 lg:py-36' : 
                    'py-20 lg:py-36'
            )}
        >
            <div
                style={{
                    transform: `translateY(${ index * 5 }px)`
                }}
                className={classNames(
                    !blank && 'bg-white shadow p-8',
                    'lg:min-w-[30vw] lg:max-w-[60vw] h-fit w-full max-h-full overflow-scroll'
                )}
            >
                <h4>Index: {index}</h4>
                { children }
                <Button onClick={ controls.close }>Sluiten</Button>
            </div>
        </div>
    )
}

export default Modal;