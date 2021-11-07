import React, { useEffect } from 'react';
import { useAxios, useLazyAxios } from 'use-axios-client';

import { useVisitor } from '../../contexts/visitorContext';
import Form, { Input, useFormStatus } from '../Form';
import LoaderSpinner from '../LoaderSpinner';
import Button from '../Button';
import { useForm, useFieldArray } from 'react-hook-form';
import Collapse from '../Collapse';
import Modal from '../Modal';
import ContextStore, { useContextStore } from '../ContextStore';
import { className } from '../../utils';
import Icon from '../Icon';

const FormFields = () => {
    const { fieldArray: { fields, remove }} = useFormStatus()
    const [ editMode, setEditMode ] = useContextStore()
    
    return <>
        {fields.map((field, index) => {
            const { deletable, value, ...moreProps } = field.obj;
            
            return <div { ...className(
                'relative flex items-start border-l-2 border-gray-300',
                editMode && 'pl-6 border-opacity-100',
                !editMode && 'border-opacity-0'
            )}>
                <Input { ...moreProps } key={ field.id } defaultValue={ value } register={`siteConfig.${index}.value`} containerClassName="flex-1" standalone />
                {( deletable && editMode ) && <Button className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 p-1" theme="simple" onClick={() => remove(field.id)}><Icon name="close" color="inherit" className="text-red-500" /></Button> }
            </div>
        })}
    </>
}

const Content = () => {
    const { _keycl } = useVisitor()
    const { data, loading } = useAxios({
        url: 'https://site.hpi.haegepoorters.be/api/site_config'
    })
    
    const [ editMode, setEditMode ] = useContextStore()
    
    const { control } = useForm();
    const { fields, prepend, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "siteConfig", // unique name for your Field Array
    });
    
    const handleAddField = (obj) => {
        prepend({ obj })
    }
    
    useEffect(() => {
        console.log({ fields })
    }, [fields])
    
    if (!data) return <LoaderSpinner />
    return (
        <>
            <div className="mb-6">
                <div className="flex items-center">
                    <Button onClick={() => setEditMode(s => !s)} theme="button" className="mr-4" iconAfter={ editMode ? 'save' : 'edit-2' }>{ editMode ? 'Velden opslaan' : 'Bewerk velden' }</Button>
                    <Modal button="Voeg veld toe" buttonTheme="simple" title="Site instellingen – aangepaste velden" buttonIconAfter="menu-add">
                        {({ toggle }) => <Form onSubmit={ data => { handleAddField(data) && toggle()} }>
                            <Input name="value" label="Waarde" comment="Een waarde die nu al meegegeven wordt" />
                            <Input name="label" label="Label" comment="De titel boven het veld" />
                            <Input name="comment" label="Comment" comment="De extra uitleg die onder het veld wordt weergegeven. Precies zoals deze tekst." />
                            <Input type="select" name="type" label="Type" comment="Het type data dat opgeslagen moet worden">
                                <option value="text">Tekst</option>
                                <option value="number">Getal</option>
                                <option value="email">Email</option>
                            </Input>
                            <Input type="checkbox" name="deletable" label="Verwijderbaar" checked comment="Dit veld kan verwijderd worden door webmasters" />
                            <Button type="submit" theme="button" className="mt-6">Toevoegen</Button>
                        </Form>}
                    </Modal>
                </div>
            </div>

            <Form fieldArray={{ fields, prepend, remove }} className="mb-12">
                <FormFields />
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