import React, { useEffect, useMemo, createContext, useContext } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Transition } from 'react-transition-group'

import { className } from '../../utils';
import { useApi } from '../../hooks'
import Button from '../Button';
import CenterMessage from '../CenterMessage';
import Icon from '../Icon';

import styles from './Form.module.scss'
import { useLazyAxios } from 'use-axios-client';
import DelayedUnmount from '../DelayedUnmount';

const GroupWrapper = ({ label, required, className: cls, children }) => <div className={ cls }>
    { label && (
        <span {...className(
            'text-gray-400 mb-1 block'
        )}>{ label } { required && '*' }</span>
    )}
    { children }
</div>

const FieldWrapper = ({ disableBorder = false, className: cls, type, hasComment, children }) => <label {...className(
    'p-2',
    hasComment ? 'mb-2' : 'mb-5',
    !disableBorder && 'border-2 border-gray-300 block',
    cls
)}>{ children }</label>

const Field = ({ label, name, className: cls, containerClassName, type = 'text', required = false, comment, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper {...className(
            comment && 'mb-5',
            containerClassName
        )}>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper hasComment={ comment }>
                <input 
                    type={ type }
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register(name)}
                    { ...otherProps }
                />
            </FieldWrapper>
            { comment && <p className="font-serif text-sm">{ comment }</p>}
        </GroupWrapper>
    )
}

const Area = ({ label, name, className: cls, required = false, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper>
                <textarea 
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register(name)}
                    { ...otherProps }
                />
            </FieldWrapper>
        </GroupWrapper>
    )
}

const Select = ({ label, name, className: cls, required = false, children, comment, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper 
            {...{ label, required }}
            {...className(
                comment && 'mb-5'
            )}
        >
            <FieldWrapper hasComment={ comment }>
                <select 
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register(name)}
                    { ...otherProps }
                >
                    { children }
                </select>
            </FieldWrapper>
            { comment && <p className="font-serif text-sm">{ comment }</p>}
        </GroupWrapper>
    )
}

const Check = ({ label, name, className: cls, required = false, type, ...otherProps }) =>{
    const { register } = useFormContext();
    
    return (
        <GroupWrapper>
            <FieldWrapper disableBorder {...className(
                'flex items-center -ml-2',
                'Input--checkbox',
                cls,
                styles['HiddenCheckInput']
            )}>
                <input type={ type } {...register(name)} className="hidden" />
                <div className="w-5 h-5 border-2 border-gray-300 relative" >
                    <Icon name="check" size="1.2rem" className="top-1/2 left-1/2" />
                </div>
                { label && <span className="text-gray-500 block ml-4">{ label } { required && '*' }</span> }
            </FieldWrapper>
        </GroupWrapper>
    )
}

export const Input = ({
    type,
    children,
    ...otherProps
}) => {    
    if (type === 'area' || type === 'textarea') return <Area { ...otherProps } />
    if (type === 'select') return <Select { ...otherProps }>{ children }</Select>
    if (
        type === 'check' || 
        type === 'checkbox' || 
        type === 'radio'
    ) return <Check type={ type } { ...otherProps } />
    return <Field type={ type } { ...otherProps } />
}

const formStatusContext = createContext()
const { Provider: FormStatusProvider } = formStatusContext;

export const useFormStatus = () => useContext(formStatusContext)

const Form = ({
    button,
    className: cls,
    action,
    method = 'POST',
    nativeAction,
    onSubmit,
    onChange,
    children,
    defaultValues,
    fetchOptions,
    overlayMessage = false,
    confirmation,
    errorMessage,
    ...otherProps
}) => {
    const methods = useForm({ defaultValues });
    const { watch } = methods;
    const [ submit, status ] = useLazyAxios({ url: action, method, ...fetchOptions })    
    
    const nestedFunction = typeof children === 'function';
    
    const handleSubmit = data => {
        if (action && !nativeAction) submit(data)
        if (onSubmit) onSubmit(data)
    };
    
    const watchedValues = useMemo(() =>
        nestedFunction || onChange ? watch() : {},
        [ nestedFunction, onChange, watch() ]
    );
    
    useEffect(() => {
        if (onChange) onChange(watchedValues)
    }, [ watchedValues, onChange ])

    useEffect(() => {
        methods.trigger()
    }, [defaultValues]) // eslint-disable-line
          
    return (
        <FormStatusProvider value={{ submit, status }}>
            <FormProvider {...methods}>
                <div className="relative">
                    <form
                        action={ nativeAction && action }
                        onSubmit={ methods.handleSubmit(handleSubmit) } 
                        { ...className(
                            cls
                        )}
                        {...otherProps}
                    >
                        { nestedFunction ? children(watchedValues) : children }
                        { button && <Button type="submit" theme="button">{ button }</Button>}
                        
                        {(( status.error || status.data ) && ( errorMessage || confirmation )) && <div className="p-4 bg-gray-100 mt-4">
                            { status.error && <p className="text-sm">{ errorMessage }</p>}
                            { status.data && <p className="text-sm">{ confirmation }</p>}
                        </div>}
                    </form>
                    {( status.loading && overlayMessage ) && <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-white bg-opacity-60 flex items-center justify-center">
                        <CenterMessage
                            icon="thumb-up"
                            intro="We kleven er nog even een zegel op ..."
                        >
                            Sluit dit venster in de tussentijd nog niet
                        </CenterMessage>
                    </div> }
                </div>
            </FormProvider>
        </FormStatusProvider>
    )
}

export default Form