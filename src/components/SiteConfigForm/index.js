import React, { useEffect, useRef } from 'react';
import { useAxios } from 'use-axios-client';

import { useVisitor } from '../../contexts/visitorContext';
import Form, { Input, useFormStatus } from '../Form';
import LoaderSpinner from '../LoaderSpinner';
import Button from '../Button';
import { useForm, useFieldArray } from 'react-hook-form';
import Collapse from '../Collapse';
import Modal from '../Modal';
import ContextStore, { useContextStore } from '../ContextStore';
import { className, ENDPOINTS } from '../../utils';
import Icon from '../Icon';

const defaultPrefillFieldConfig = {
    prefillIndex: null, 
    prefill: undefined
}

const FieldModal = ({ onSubmit, prefill, prefillIndex, ...otherProps }) => {
    return <Modal 
        button="Voeg veld toe" 
        buttonTheme="simple" 
        title="Site instellingen – aangepaste velden" 
        buttonIconAfter="menu-add"
        modalClassName="pb-0"
        { ...otherProps }
    >
        {({ toggle }) => (
            <Form 
                onSubmit={data => { 
                    if (onSubmit) onSubmit({ data, prefillIndex })
                    toggle(false)
                }}
                defaultValues={ prefill }
            >
                <Input name="value" label="Waarde" comment="Een waarde die nu al meegegeven wordt" />
                <Input name="label" label="Label" comment="De titel boven het veld" />
                <Input name="comment" label="Comment" comment="De extra uitleg die onder het veld wordt weergegeven. Precies zoals deze tekst." />
                <Input type="select" name="type" label="Type" comment="Het type data dat opgeslagen moet worden">
                    <option value="text">Tekst</option>
                    <option value="number">Getal</option>
                    <option value="email">Email</option>
                </Input>
                <Input type="checkbox" name="deletable" label="Verwijderbaar" checked comment="Dit veld kan verwijderd worden door webmasters" />
                <div className="sticky bottom-0 bg-white pb-8">
                    <hr className="mb-6" />
                    <Button type="submit" theme="button">Toevoegen</Button>
                </div>
            </Form>
        )
    }
</Modal>
}

const FormFields = () => {
    const { fieldArray: { fields, remove, update }} = useFormStatus()
    const [ , setArrayFieldsContext ] = useContextStore()
    
    const setFieldEdit = (prefillIndex, prefill) => {
        setArrayFieldsContext(s => ({ ...s, prefillIndex, prefill}))
    }
    
    useEffect(() => {
        // console.clear()
        console.log(fields)
    })
    
    return <>
        { fields.map((field, index) => {
            const { value, ...moreProps } = field.obj;

            return (
                <div
                    key={ field.id }
                    { ...className(
                        'relative flex items-start mb-6'
                    )}
                >
                    <Input { ...moreProps } key={ field.id } defaultValue={ value } register={`siteConfig.${index}.value`} containerClassName="flex-1" standalone />
                    <Button 
                        className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1" 
                        theme="simple" 
                        type="button"
                        onClick={() => setFieldEdit(index, field.obj)}
                    >
                        <Icon name="edit-2" color="inherit" className="text-red-500" />
                    </Button>
                </div>
            )
        })}
    </>
}

const Content = () => {
    const $saveFieldsButton = useRef()
    const { _keycl } = useVisitor()
    const [ arrayFieldsContext, setArrayFieldsContext ] = useContextStore()
    const { data } = useAxios({
        url: ENDPOINTS.SITE_CONFIG
    })
    const { data: customFieldsData, refetch } = useAxios({
        url: ENDPOINTS.CUSTOM_FIELDS
    })
    
    const { control } = useForm();
    const arrayFieldContext = useFieldArray({
        control,
        name: "siteConfig",
    });
    const { fields, append, update } = arrayFieldContext;
    
    useEffect(() => {
        setArrayFieldsContext({ 
            ...arrayFieldContext, 
            ...defaultPrefillFieldConfig
        })
    }, [])
    
    useEffect(() => {
        if (customFieldsData) append(customFieldsData)
    }, [customFieldsData])
    
    const handleFieldUpdate = ({ prefillIndex, data }) => {
        console.log('handle update', data)
        setArrayFieldsContext(s => ({ ...s, ...defaultPrefillFieldConfig }))
        update(prefillIndex, { obj: data })
    }
    
    if (!data && !customFieldsData) return <LoaderSpinner />
    return (
        <>
            { arrayFieldsContext?.prefillIndex && (
                <FieldModal prefill={ arrayFieldsContext.prefill } prefillIndex={ arrayFieldsContext.prefillIndex } open onSubmit={ handleFieldUpdate } />
            )}
            
            <div className="mb-6">
                <div className="flex items-center">
                    <FieldModal onSubmit={({ data }) => append({ obj: data })} />
                </div>
            </div>

            <Form 
                action="http://localhost:3001/api/custom_fields"
                confirmation="Wijzigingen opgeslagen!"
                errorMessage="Er ging iets fout :("
                className="mb-12"
                fieldArray={arrayFieldContext}
                customPostData={ fields }
            >
                <FormFields />
                { fields.length !== 0 && 
                    <Button 
                        theme="button"
                        type="submit"
                        className="mr-4"
                        iconAfter="save"
                        ref={ $saveFieldsButton }
                    >Velden opslaan</Button>
                }
            </Form>
            
            <Form 
                action="https://site.hpi.haegepoorters.be/api/site_config"
                confirmation="Wijzigingen opgeslagen!"
                errorMessage="Er ging iets fout :("
                fetchOptions={{
                    responseType: 'text',
                    headers: {
                        'Authorization': `Bearer ${ _keycl.token }`
                    }
                }}
            >
                <Input 
                    type="select" 
                    label="Coronastatus" 
                    name="corona_status"
                    defaultValue={ data.corona_status }
                    comment={'In welke mate gaan activiteiten door? Kies voor "Niet van toepassing" wanneer deze instelling niet meer relevant is, dan zal ook de banner op de homepagina verborgen worden.'}
                >
                    <option value="2">Activiteiten toegelaten</option>
                    <option value="1">Aangepaste maatregelen</option>
                    <option value="0">Activiteiten opgeschort</option>
                    <option value="nvt">Niet van toepassing</option>
                </Input>
                <Input 
                    type="number" 
                    defaultValue={ data?.members_amount }
                    name="members_amount"
                    label="Aantal leden"
                    comment="Je kan het aantal leden in onze scouts nakijken via de statistieken pagina in de Groepsadministratie. Dit aantal wordt onder andere weergegeven op de Startpagina."
                />
                <Button type="submit" theme="button">Site configuratie opslaan</Button>
            </Form>
        </>
    )
}

const Wrapper = () => {    
    return <ContextStore>
        <Content />
    </ContextStore>
}

export default Wrapper