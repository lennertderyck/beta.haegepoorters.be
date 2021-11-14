import React from 'react';
import { useAxios } from 'use-axios-client';
import { Icon, LoaderSpinner } from '..';
import { useVisitor } from '../../contexts/visitorContext';
import { ENDPOINTS } from '../../utils';

const Card = ({ data }) => {
    return <div className="border-2 border-gray-300 col-span-1 relative">
        <div className="bg-gradient-to-r from-white via-white to-transparent p-4 flex items-center z-10 relative">
            <Icon name="key-2" size="1.3rem" color="#661A20" />
            <div className="ml-5">
                <h4 className="font-serif text-lg">{ data.access.map(({ name }) => name).join(', ') }</h4>
                <h3 className="font-medium text-base">{ data.description }</h3>
            </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0">
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
        
        console.log(notPaid)
        
        if (notPaid !== 0) return `${ paid.length * 25 } van ${ data.length * 25 } euro betaald`
        return `${ data.length * 25 } euro betaald`
    }
    
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-serif">Sleutels</h3>
                    <p className="mb-6">Een overzicht van jouw sleutels</p>
                </div>
                <div>
                    { data && <div className="text-xs uppercase tracking-widest lg:mt-0 font-medium text-right mb-6 lg:mb-0">
                        Waarborg <br className="hidden lg:inline" /><strong>{ calcDeposit() }</strong>
                    </div>}
                </div>
            </div>
            { !data && <LoaderSpinner />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                { data && data.map(d => <Card data={ d } />)}
            </div>
        </div>
    )
}

export default LeaderKeys