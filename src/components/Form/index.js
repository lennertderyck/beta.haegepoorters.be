import React from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { className } from '../../utils';
import { useApi } from '../../hooks'
import Button from '../Button';
import CenterMessage from '../CenterMessage';

const GroupWrapper = ({ children }) => <div>{ children }</div>
const FieldWrapper = ({ children }) => <label className="border-2 border-gray-300 block p-2 mb-5">{ children }</label>

const Field = ({ label, name, className: cls, type = 'text', required = false, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper>
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

const Select = ({ label, name, className: cls, required = false, children, ...otherProps }) => {
    const { register } = useFormContext();

    return (
        <GroupWrapper>
            { label && <span className="text-gray-400 mb-1 block">{ label } { required && '*' }</span> }
            <FieldWrapper>
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
    return <Field type={ type } { ...otherProps } />
}

const Form = ({
    button,
    className: cls,
    action,
    children,
}) => {
    const methods = useForm();
    const { watch } = methods;
    const { submit, status } = useApi(action)
    
    const handleSubmit = data => {
        console.log('sending')
        if (action) submit({ method: 'POST', body: data })
    };
    const watchedValues = watch();
    
    console.log(status)
          
    return (
        <FormProvider {...methods}>
            <div className="relative">
                <form 
                    onSubmit={ methods.handleSubmit( handleSubmit )} 
                    { ...className(
                        cls
                    )}
                >
                    { typeof children ? children(watchedValues) : children }
                    { button && <Button type="submit" theme="button">{ button }</Button>}
                </form>
                {( status === 'loading' ) && <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-white bg-opacity-60 flex items-center justify-center">
                    <CenterMessage
                        icon="thumb-up"
                        intro="We kleven er nog even een zegel op ..."
                    >
                        Sluit dit venster in de tussentijd nog niet
                    </CenterMessage>
                </div> }
            </div>
        </FormProvider>
    )
}

export default Form