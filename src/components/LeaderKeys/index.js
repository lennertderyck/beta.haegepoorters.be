import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';

import { useAxios } from 'use-axios-client';
import { CatchError, Collapse, Icon, LoaderSpinner, Modal } from '..';
import { useVisitor } from '../../contexts/visitorContext';
import { className, ENDPOINTS } from '../../utils';

const Card = ({ data, className: cls }) => {
    const [ open, setOpen ] = useState()
    
    const accessString = (d) => {
        if (d.length === 1) return d[0].name
        else return `${ d[0].name }, ...`
        
        // data.access.map(({ name }) => name).join(', ')
    }

    return <CatchError
    >
        <div 
            {...className(
                'border-2 border-gray-300 col-span-1 relative cursor-pointer',
                cls
            )}
            onClick={() => setOpen(s => !s)}
        >
            <div className="bg-gradient-to-r from-white via-white to-transparent p-4 flex items-center z-10 relative ">
                <Icon name="key-2" size="1.3rem" color="#661A20" />
                <div className="ml-5">
                    <h4 className="font-serif text-lg">{ data.passkey ? 'Loper' : accessString(data.access) }</h4>
                    <h3 className="font-medium text-base">{ data.description }</h3>
                    { data.key_id && <div className="bg-red-100 text-red-500 text-xs uppercase tracking-widest font-medium px-2 py-1 w-fit mt-2">
                        sleutel { data.key_id }
                    </div> }
                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 select-none">
                <img 
                    src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1636925905/x1bzryzdgdfxtstydgal.jpg"
                    alt=""
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
        { open && (
            <Modal 
                title={ <div>
                    <h3 className="text-gray-600 mr-6">{ data.description }</h3>
                    <div className="flex">
                        { data.key_id && <div className="bg-red-100 text-red-500 text-xs uppercase tracking-widest font-medium px-2 py-1 w-fit mt-2">
                            sleutel { data.key_id }
                        </div> }
                    </div>
                </div> }
                open 
                onClose={() => setOpen(false)}
            >
                <div className="grid grid-cols-12 divide-y-2 divide-gray-300">
                    <div className="grid grid-cols-12 col-span-12 gap-x-8 py-4">
                        <div className="col-span-12 lg:col-span-6">
                            <h3 className="font-serif text-xl">Kenmerk</h3>
                            <p className="text-sm">Sleutelnummer (witte sticker)</p>

                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            { data.key_id ? 
                                <p className="text-sm">Dit is <strong>sleutel { data.key_id }</strong></p> :
                                <p className="text-sm text-gray-400">Deze sleutel heeft geen nummer</p>
                            }
                        </div>
                        <div className="col-span-12 mt-4">
                            <Collapse label="Meer info" className="">
                                <p className="text-gray-400 font-serif text-sm">
                                    Sinds heden krijgt elke sleutel een uniek nummer. Hierdoor kunnen we elke sleutel opzich koppelen aan een persoon en volgen in een nieuw systeem. 
                                    Een sleutel met een nieuw nummer heeft een witte sticker. Sleutels zonder witte sticker zijn nog niet voorzien van het nieuw nummer.
                                </p>
                            </Collapse>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-12 col-span-12 gap-8 py-4">
                        <div className="col-span-12 lg:col-span-6">
                            <h3 className="font-serif text-xl">Waarborg</h3>
                            <p className="text-sm">25 euro per sleutel</p>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div {...className(
                                'text-xs uppercase tracking-widest font-medium px-2 py-1 w-fit mt-2 flex items-center',
                                data.deposits && 'text-green-500'
                            )}>
                                <span>{ data.deposits ? 'Betaald' : 'Onbetaald' }</span>
                                { data.deposits && <Icon 
                                    className="ml-2 text-green-500 opacity-50" 
                                    name="check-double" 
                                    color="inherit" 
                                    size="1.2rem"
                                />}
                            </div> 
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-12 col-span-12 gap-8 py-4">
                        <div className="col-span-12 lg:col-span-6">
                            <h3 className="font-serif text-xl">Toegang</h3>
                            <p className="text-sm">Deze ruimten kan je openen</p>
                            <p className="text-xs tracking-widest uppercase mt-3 flex items-center">
                                <Icon name="shield-star" size="1.2rem" className="mr-1" />
                                <span className="font-medium">Dit is een loper</span>
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6">    
                            <ul className="list-disc list-inside mt-2 text-sm">
                                { data.access.map(d => <li>
                                    { d.name }
                                </li>)}
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </Modal>
        )}
    </CatchError>
}

const LeaderKeys = () => {
    const { profile } = useVisitor()
    const { loading, data } = useAxios(ENDPOINTS.LEADER_KEYS + '/' + profile.id)
    
    const calcDeposit = () => {
        const paid = data.leaderKeys.filter(({ deposits }) => {
            return deposits.payed == deposits.to_pay
        })
        
        const notPaid = data.leaderKeys.length - paid.length;
        
        if (notPaid !== 0) return `${ paid.length * 25 } van ${ data.leaderKeys.length * 25 } euro betaald`
        return `${ data.leaderKeys.length * 25 } euro betaald`
    }
    
    return (
        <div>
            <div className="grid grid-cols-12 gap-6 justify-between items-center mb-6">
                <div className="col-span-12 lg:col-span-6">
                    <h3 className="font-serif">Sleutels</h3>
                    <p>Een overzicht van jouw sleutels</p>
                </div>
                
                { data && <Tooltip
                    className="col-span-12 lg:col-span-6"
                    title="De hoeveelheid waarborg die je betaald hebt"
                    position="top"
                    arrow
                >
                    <div className="bg-gray-100 p-4 flex-1 flex items-center justify-between cursor-pointer">
                        <span className="flex items-center">
                            <Icon name="money-euro-circle" size="1.3rem" className="mr-1" />
                            Waarborg
                        </span>
                        <div className="text-xs uppercase tracking-widest font-medium text-right">
                            <strong>{ calcDeposit() }</strong>
                        </div>
                    </div>
                </Tooltip> }
            </div>
            { !data && <LoaderSpinner />}
            { data && <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    { data.leaderKeys.map((d, index) => <Card data={ d } key={ index } />)}
                </div>
                <Collapse label="Beschikbare sleutels" className="mt-6" labelIcon="key">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        { data.availableKeys.map((d, index) => <div 
                            key={ index }
                            className="bg-gray-100 p-3"
                        >
                            {/* <h4 className="font-serif text-lg">{ d.access.map(({ name }) => name).join(', ') }</h4> */}
                            <h3 className="font-medium text-base">{ d.name }</h3>
                            <p className="text-xs uppercase tracking-wide font-medium text-gray-400">{ d.available_amount } beschikbaar</p>
                        </div>)}
                    </div>
                </Collapse>
                
                <hr className="my-6" />
                
                <Collapse label="Klopt deze info niet?" className="mt-6">
                    <p className="text-sm">Herlaad je pagina. Helpt dit niet? Dan is de info mogelijks nog niet aangepast door de beheerder. <br /> Speek de sleutelverantwoordelijke aan.</p>
                </Collapse>
            </>}
        </div>
    )
}

export default LeaderKeys