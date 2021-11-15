import React, { useState } from 'react';
import { useAxios } from 'use-axios-client';
import { Collapse, Icon, LoaderSpinner } from '..';
import { useVisitor } from '../../contexts/visitorContext';
import { className, ENDPOINTS } from '../../utils';

const Card = ({ data, className: cls }) => {
    const [ open, setOpen ] = useState()

    return <div {...className(
        'border-2 border-gray-300 col-span-1 relative',
        cls
    )}>
        <div className="bg-gradient-to-r from-white via-white to-transparent p-4 flex items-center z-10 relative ">
            <Icon name="key-2" size="1.3rem" color="#661A20" />
            <div className="ml-5">
                <h4 className="font-serif text-lg">{ data.access.map(({ name }) => name).join(', ') }</h4>
                <h3 className="font-medium text-base">{ data.description }</h3>
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
}

const LeaderKeys = () => {
    const { profile } = useVisitor()
    const { loading, data } = useAxios(ENDPOINTS.LEADER_KEYS + '/' + profile.id)
    
    const calcDeposit = () => {
        const paid = data.filter(({ deposits }) => {
            return deposits.payed == deposits.to_pay
        })
        
        const notPaid = data.length - paid.length;
        
        if (notPaid !== 0) return `${ paid.length * 25 } van ${ data.length * 25 } euro betaald`
        return `${ data.length * 25 } euro betaald`
    }
    
    return (
        <div>
            <div className="grid grid-cols-12 gap-6 justify-between items-center mb-6">
                <div className="col-span-12 lg:col-span-6">
                    <h3 className="font-serif">Sleutels</h3>
                    <p>Een overzicht van jouw sleutels</p>
                </div>
                { data && <div className="col-span-12 lg:col-span-6 bg-gray-100 p-4 flex-1 flex items-center justify-between">
                    <Icon name="money-euro-circle" size="1.3rem" />
                     <div className="text-xs uppercase tracking-widest font-medium text-right">
                        Waarborg <strong>{ calcDeposit() }</strong>
                    </div>
                </div> }
            </div>
            { !data && <LoaderSpinner />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                { data && data.map(d => <Card data={ d } />)}
            </div>
            <hr className="my-6" />
            <h4>Beschikbare sleutels</h4>
            <Collapse label="Klopt deze info niet?" className="mt-6">
                <p className="text-sm">Herlaad je pagina. Helpt dit niet? Dan is de info mogelijks nog niet aangepast door de beheerder. <br /> Speek de sleutelverantwoordelijke aan.</p>
            </Collapse>
        </div>
    )
}

export default LeaderKeys