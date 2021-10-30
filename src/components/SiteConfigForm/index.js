import React from 'react';
import { useAxios, useLazyAxios } from 'use-axios-client';

import { useVisitor } from '../../contexts/visitorContext';
import Form, { Input } from '../Form';
import LoaderSpinner from '../LoaderSpinner';
import Button from '../Button';

const SiteConfigForm = () => {
    const { _keycl } = useVisitor()
    const { data, loading } = useAxios({
        url: 'https://site.hpi.haegepoorters.be/api/site_config'
    })
    
    const [ submit, { data: savedData } ] = useLazyAxios('https://site.hpi.haegepoorters.be/api/site_config', {
        method: 'POST',
        responseType: 'text',
        headers: {
            'Authorization': `Bearer ${ _keycl.token }`
        }
    })
    
    if (!data) return <LoaderSpinner />
    
    console.log(savedData)
    
    return (
        <Form onSubmit={submit}>
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
            <Button type="submit" theme="button">Site configuratie opslaan</Button>
        </Form>
    )
}

export default SiteConfigForm