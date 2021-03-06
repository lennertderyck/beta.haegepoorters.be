import React, { useContext, useState, createContext } from 'react';
import { useQuery } from '@apollo/client';

import { Button, Container, Img, Icon, Modal } from '../../components';
import QUERIES from '../../graphql/queries';
import PageLayout from '../../layouts/PageLayout';
import { useVisitor } from '../../contexts/visitorContext';
import { siteGroups } from '../../data/site';
import { className, filterTeamOnFunction } from '../../utils';

const teamContext = createContext();
const { Provider } = teamContext;
const useTeamContext = () => useContext(teamContext)

const Card = ({ data }) => {
    const { sensitiveHidden, profile} = useVisitor()
    const { content: { first_name, tel, image: { filename }, functions_extra, wel_name }} = data;
    const { toggleModal } = useTeamContext()
    
    const isGroupResp = functions_extra.includes('group_resp');
    const isGrl = functions_extra.includes('grl');
    
    const handleSensitiveForceClick = () => {
        toggleModal()
    }
    
    const showTelByFunction = isGroupResp || isGrl || profile?.isLeader;
    
    return <div className="border-b-2 border-gray-200 pb-6 h-full">
        <Img src={ filename } height="15rem" className="mb-4" />
        <h4 className="font-bold text-xl -mb-1">{ first_name }</h4>
        { wel_name && <p className="font-serif text-lg">{ wel_name }</p>}
        
        {(( sensitiveHidden && showTelByFunction)) && <button onClick={ handleSensitiveForceClick } className="flex items-center mt-3">
            <Icon name="phone" size="1.2rem" className="mr-2" /> 
            <span className="filter blur-sm">+32412456789</span>
        </button>}
        {( !sensitiveHidden && showTelByFunction) && <a href={ 'tel:' + tel } className="flex items-center mt-3">
            <Icon name="phone" size="1.2rem" className="mr-2" /> 
            <span>{ tel }</span>
        </a>}
    </div>
}

const Group = ({ data: items }) => {
    return <div className="grid grid-cols-4 gap-6">
        { items
            .map((data, index) => (
                <div
                    className="col-span-4 md:col-span-2 lg:col-span-1" 
                    key={ index }
                >
                    <Card data={ data } />
                </div>
            )
        )}
    </div>
}

const TeamPage = () => {
    const { data, loading } = useQuery(QUERIES.TEAM_FULL)
    const { sensitiveHidden, showSensitive, profile } = useVisitor()
    const [ showModal, setShowModal ] = useState()

    const toggleModal = n => setShowModal(p => n ? n : !p)
    
    if (loading) return <p>loading</p>

    const { TeammemberItems: { items }} = data
        
    return (
        <Provider value={{
            toggleModal
        }}> 
            <Modal 
                open={ showModal } 
                className="lg:w-1/2"
                title="Telefoonnummers weergeven?"
            >
                {/* <h3 className="mb-4 text-gray-600">Telefoonnummers weergeven?</h3> */}
                <p className="mb-4 font-serif text-xl">We verbergen gevoelige gegevens zoals emailadressen en telefoonnummers standaard op onze website om spam tegen te gaan.</p>
                <Button 
                    theme="button"
                    onClick={() => {
                        setShowModal(false)
                        showSensitive()
                    }}
                >Gevoelige gegevens tonen</Button>
            </Modal>
            
            <PageLayout title="Leiding" subtitle="Ons team van gemotiveerde leiding" wide className="relative">
                <Container className="-mt-6">
                    { profile?.isLeader && <div className="sticky bottom-0 p-4 bg-gray-200 mb-12 -mx-6 sm:mx-0 flex items-center">
                        <Icon name="information" size="1.3rem" className="mr-3" />
                        Alle gsm-nummers worden weergegeven omdat je aangemeld bent als leiding
                    </div>}
                </Container>
                
                <h3 className="font-serif mb-6 capitalize font-bold text-3xl">Groepsleiding</h3>
                <div className="grid grid-cols-4 gap-6 mb-12">
                    { items.filter(({ content: { functions_extra }}) => functions_extra.includes('grl')).map(data => (
                        <div className="col-span-4 md:col-span-2 lg:col-span-1">
                            <Card data={ data } />
                        </div>
                    ))}
                </div>
               
                
                { siteGroups
                    .filter(({ isGroup }) => isGroup )
                    .map(({ plur, value }) => (<div className="mb-12">
                        <h3 className="font-serif mb-6 capitalize font-bold text-3xl">{ plur }</h3>
                        <Group shortcode={ value } data={ filterTeamOnFunction(items, value) } />
                    </div>
                ))}
                
                { sensitiveHidden && <div className="sticky bottom-0 p-4 bg-gray-200 mx-8 mt-12">
                    <Button 
                        theme="simple" 
                        icon="eye-close"
                        onClick={() => toggleModal()}
                        className="w-full"
                    >Gsm-nummers weergeven</Button>
                </div>}
            </PageLayout>
        </Provider>
    )
}

export default TeamPage