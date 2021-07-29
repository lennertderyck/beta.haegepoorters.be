import React from 'react';
import dayjs from 'dayjs';
import Button from '../Button';

const currentYear = dayjs().format('YYYY')

const Footer = () => {
    return (
        <div className="bg-gray-300 w-full py-12">
            <div className="container px-4 md:px-0">
                <div className="grid grid-cols-12 mb-6">
                    <div className="col-span-4">
                        <h4 className="font-bold">Scouts &amp; Gidsen Haegepoorters</h4>
                        <p>
                            Bijlokestraat 18<br />
                            9070 Destelbergen
                        </p>
                        <Button to="/contact?r=grl" theme="simple" className="mt-3 block">Contacteer groepsleiding</Button>
                    </div>
                    <div className="col-span-4">
                        <h4 className="font-bold">HP Rénové vzw</h4>
                        <Button to="/contact?r=vzw" theme="simple" className="mt-3 block">Contacteer vzw</Button>
                    </div>
                </div>
                <small className="block font-medium text-gray-400">
                    &copy; 2007 - { currentYear } Scouts &amp; Gidsen Haegepoorters Destelbergen &nbsp; | &nbsp; Ontwikkeld door <a href="https://jung.gent">JUNG･Gent</a>
                </small>
            </div>
        </div>
    )
}

export default Footer