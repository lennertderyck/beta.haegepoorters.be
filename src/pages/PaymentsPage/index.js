import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Collapse, Form, Icon, Input } from '../../components';
import { siteGroups } from '../../data/site';
import { PageLayout } from '../../layouts';
import { generatePaymentQR, siteGroup } from '../../utils';

const PaymentsPage = () => {
    const { code } = useParams()
    const [ composedDesrc, setComposedDescr ] = useState()
    
    return (
        <PageLayout 
            title="Betalingen"
            subtitle={ code ? 'Betaling \'title here\'' : 'Genereer een betaling'}
        >
            <Form>
                {({ amount, descr, reciever }) => (<>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-1">
                        <div className="col-span-6">
                            <Input 
                                name="descr" 
                                label="Omschrijving"
                                placeholder="Bijvoorbeeld drankkaart 5 euro"
                                comment="Dit is ook de mededeling voor de overschrijving"
                            />
                            {/* <Button 
                                theme="simple" 
                                className="-mt-2 mb-6"
                                iconAfter="arrow-down-s"
                            >Gebruik variabelen</Button> */}
                            { false && <Collapse label="Gebruik variabelen" className="-mt-2 mb-6">
                                <p className="text-sm font-serif">Deze variabelen kan je gebruiken voor een link in een mail in de Groepsadministratie. Klik om ze toe te voegen.</p>
                                <div className="bg-gray-100 mt-2 px-4 pt-4 pb-2">
                                    <Button onClick={() => setComposedDescr(s => descr + '[Volledige Naam]')} className="text-sm inline-flex mr-2 mb-2 bg-gray-200 px-2 py-1">Volledige Naam</Button>
                                    <Button onClick={() => setComposedDescr(s => descr + '[Voornaam]')} className="text-sm inline-flex mr-2 mb-2 bg-gray-200 px-2 py-1">Voornaam</Button>
                                    <Button onClick={() => setComposedDescr(s => descr + '[Achternaam]')} className="text-sm inline-flex mr-2 mb-2 bg-gray-200 px-2 py-1">Achternaam</Button>
                                    <Button onClick={() => setComposedDescr(s => descr + '[Lidnummer]')} className="text-sm inline-flex mr-2 mb-2 bg-gray-200 px-2 py-1">Lidnummer</Button>
                                    <Button onClick={() => setComposedDescr(s => descr + '[Adres]')} className="text-sm inline-flex mr-2 mb-2 bg-gray-200 px-2 py-1">Adres</Button>
                                </div>
                            </Collapse>}
                            <Input
                                name="amount"
                                label="Bedrag"
                                placeholder="0"
                                type="number"
                                comment="Het verschuldigde bedrag"
                                min={ 0 }
                                max={ 50 }
                                defaultValue={ 0 }
                            />
                            <Input
                                name="reciever"
                                label="Ontvanger"
                                placeholder="0"
                                type="select"
                                comment="Voor welke kas is de overschrijving bestemt?"
                                min={ 0 }
                                max={ 50 }
                            >
                                { siteGroups.filter(({ payments }) => payments).map(({ plur, value }, index) => (
                                    <option value={ value }>{ plur }</option>
                                ))}
                            </Input>
                        </div>
                        <div className="col-span-6 flex flex-col">
                            { reciever && <img 
                                src={ generatePaymentQR({
                                    amount,
                                    descr,
                                    account: siteGroup(reciever)?.plur,
                                    reciever: siteGroup(reciever)?.payments
                                })}
                                className="w-40 self-center mb-6"
                            />}
                            { !reciever && <>
                                <div className="bg-gray-100 p-6 flex flex-col">
                                    <Icon name="qr-code" size="2.2rem" className="self-center mb-1" />
                                    <p className="text-sm text-center">Je QR-code zal hier verschijnen na <br /> het invullen van de gegevens</p>
                                </div>
                            </>}
                            { reciever && <>
                                <p className="text-center">
                                    Storting naar <strong>{ siteGroup(reciever)?.plur }</strong>
                                </p>
                                <h3 className="text-center">{ siteGroup(reciever)?.payments }</h3>
                                { amount !== 0 && <p className="text-center mt-2">
                                    van <strong>{ amount } euro</strong>
                                </p> }
                                { amount == 0 && <div className="p-4 bg-gray-100 text-sm mt-6">
                                    <h4 className="font-bold mb-2">Opgelet</h4>
                                    Aangezien het bedrag 0 euro is zal je manueel nog een bedrag moeten invoeren alvorens de betaling te bevestigen in je bank-app.
                                </div> }
                            </> }
                            
                        </div>
                    </div>
                </>)}
            </Form>
        </PageLayout>
    )
}

export default PaymentsPage