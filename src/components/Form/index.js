import React, { useEffect, useMemo, createContext, useContext } from 'react';
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form";
import { useLazyAxios } from 'use-axios-client';

import { className } from '../../utils';
import Button from '../Button';
import CenterMessage from '../CenterMessage';
import Icon from '../Icon';

import styles from './Form.module.scss'

const GroupWrapper = ({ label, required, className: cls, children }) => <div className={ cls }>
    { label && (
        <span {...className(
            'text-gray-400 mb-1 block'
        )}>{ label } { required && '*' }</span>
    )}
    { children }
</div>

const FieldWrapper = ({ disableBorder = false, className: cls, type, hasComment, children, disabled }) => <label 
    {...className(
        'p-2 bg-white',
        hasComment ? 'mb-2' : 'mb-5',
        !disableBorder && 'border-2 border-gray-300 block',
        disabled ? 'border-gray-200' : 'border-gray-300',
        cls
    )}
>{ children }</label>

const Comment = ({ comment }) => {
    if (!comment) return null;
    return <p className="font-serif text-sm">{ comment }</p>;
}

const Field = ({ label, name, className: cls, containerClassName, type = 'text', required = false, comment, standalone, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper {...className(
            (comment && !standalone) && 'mb-5',
            containerClassName
        )}>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper hasComment={ comment } disabled={ otherProps.disabled }>
                <input 
                    type={ type }
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register( otherProps.register || name )}
                    { ...otherProps }
                />
            </FieldWrapper>
            <Comment comment={ comment } />
        </GroupWrapper>
    )
}

const Area = ({ label, name, className: cls, required = false, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper disabled={ otherProps.disabled }>
                <textarea 
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register(otherProps.register || name)}
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
            <FieldWrapper hasComment={ comment } disabled={ otherProps.disabled }>
                <select 
                    { ...className(
                        cls,
                        'w-full'
                    )}
                    {...register(otherProps.register || name)}
                    { ...otherProps }
                >
                    { children }
                </select>
            </FieldWrapper>
            <Comment comment={ comment } />
        </GroupWrapper>
    )
}

const Check = ({ label, name, className: cls, required = false, type, comment, checked, ...otherProps }) =>{
    const { register } = useFormContext();
    
    return (
        <GroupWrapper>
                <FieldWrapper 
                disableBorder {...className(
                    'flex -ml-2',
                    'Input--checkbox',
                    cls,
                    styles['HiddenCheckInput']
                )} 
                hasComment={ comment }
                disabled={ otherProps.disabled }
            >
                <input type={ type } {...register(otherProps.register || name)} className="hidden" defaultChecked={ checked } />
                <div className="w-5 h-5 border-2 border-gray-300 relative transform translate-y-1" >
                    <Icon name="check" size="1.2rem" className="top-1/2 left-1/2" />
                </div>
                <div className="ml-4">
                    { label && <span className="text-gray-500 block">{ label } { required && '*' }</span> }
                    <Comment comment={ comment } />
                </div>
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
    fieldArray,
    customPostData,
    ...otherProps
}) => {
    const methods = useForm({ defaultValues });
    const { watch, control } = methods;
    const [ submit, status ] = useLazyAxios({ url: action, method, ...fetchOptions })
    
    const nestedFunction = typeof children === 'function';
    
    const handleSubmit = (data) => {
        const payload = customPostData || data;
        
        if (action && !nativeAction) submit(payload)
        if (onSubmit) onSubmit(payload)
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
        <FormStatusProvider value={{ submit, status, control, fieldArray }}>
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
                        { nestedFunction ? children({ watchedValues }) : children }
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