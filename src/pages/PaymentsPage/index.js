import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Button, Collapse, Form, Icon, Input } from '../../components';
import { siteGroups } from '../../data/site';
import { PageLayout } from '../../layouts';
import { className, decodePaymentCode, generatePaymentCode, generatePaymentQR, siteGroup } from '../../utils';

import styles from './PaymentsPage.module.scss';

const PaymentsPage = () => {
    const { code } = useParams()
    const [ composedDesrc, setComposedDescr ] = useState()
    const [ decodedPayment, setDecodedPayment ] = useState(decodePaymentCode(code))

    return (
        <PageLayout 
            title="Betalingen"
            subtitle={ code ? `Betaling: ${ decodedPayment.descr }` : 'Genereer een betaling'}
        >
            <Form>
                {({ amount, descr, reciever }) => (<>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-1 mb-12">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="">
                                <Collapse label="Heb je een code?" className="mb-6" open={ decodedPayment ? true : false }>
                                    <Input 
                                        name="paymentCode" 
                                        label="Deelcode" 
                                        placeholder="Bv. Z3JrOzA7SW5zY2hyaWp2aW5n"
                                        defaultValue={ code }
                                        onChange={({ target: { value }}) => setDecodedPayment(value)}
                                    />
                                </Collapse>
                                <Input 
                                    name="descr"
                                    label="Omschrijving"
                                    placeholder="Bijvoorbeeld drankkaart 5 euro"
                                    comment="Dit is ook de mededeling voor de overschrijving"
                                    defaultValue={ decodedPayment?.descr }
                                />
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
                                    defaultValue={ decodedPayment?.amount || 0 }
                                />
                                <Input
                                    name="reciever"
                                    label="Ontvanger"
                                    type="select"
                                    comment="Voor welke kas is de overschrijving bestemt?"
                                    defaultValue={ decodedPayment?.reciever || 'grk' }
                                >
                                    { siteGroups.filter(({ payments }) => payments).map(({ plur, value }) => (
                                        <option value={ value }>{ plur }</option>
                                    ))}
                                </Input>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6 flex flex-col">
                            { (reciever || decodedPayment) 
                                ? <img 
                                    src={ generatePaymentQR({
                                        amount: decodedPayment?.amount || amount,
                                        descr: decodedPayment?.descr || descr,
                                        account: siteGroup(decodedPayment?.reciever || reciever)?.plur,
                                        reciever: siteGroup(decodedPayment?.reciever || reciever)?.payments
                                    })}
                                    className="w-40 self-center mb-6"
                                />
                                : <>
                                    <div className="bg-gray-100 p-6 flex flex-col">
                                        <Icon name="qr-code" size="2.2rem" className="self-center mb-1" />
                                        <p className="text-sm text-center">Je QR-code zal hier verschijnen na <br /> het invullen van de gegevens</p>
                                    </div>
                                </>
                            }
                            { (reciever || decodedPayment) && <>
                                <p className="text-center">
                                    Storting naar <strong>{ siteGroup(decodedPayment?.reciever || reciever)?.plur }</strong>
                                </p>
                                <h3 className="text-center">{ siteGroup(decodedPayment?.reciever || reciever)?.payments }</h3>
                                { (amount != 0 || decodedPayment != 0) 
                                    ? <p className="text-center mt-2">
                                        van <strong>{ amount } euro</strong>
                                    </p>
                                    : <div className="p-4 bg-gray-100 text-sm mt-6">
                                        <h4 className="font-bold mb-2">Opgelet</h4>
                                        Aangezien het bedrag 0 euro is zal je manueel nog een bedrag moeten invoeren alvorens de betaling te bevestigen in je bank-app.
                                    </div> 
                                }
                            </> }
                        </div>
                    </div>
                    <div className="mb-8">
                        <h4 className="text-center mb-4 font-serif">Ondersteund door</h4>
                        <div className="flex items-center justify-center">
                              <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ml36ldb4bqmjanut38sr.svg" className="h-7 mr-4" alt="Logo Kbc" height="35px" />
                              <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ignqtssujkocqd8oklqr.svg" className="h-7 mr-4" alt="Logo Argenta" height="35px" />
                              <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/jt41u1euwcfqghiqsw2u.svg" className="h-5 mr-4" alt="Logo Belfius" height="20px" />
                              <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1632171970/tfak2eyntzba2qtxnei8.svg" className="h-6 mr-4" alt="Logo ING" height="35px" />
                              <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/hhoar3wstamzzfg3dcci.svg" className="h-7" alt="Logo BNP Paribas" height="35px" />
                        </div> 
                    </div>
                    <hr className="border-t-2 border-gray-300 my-6" />
                    <Collapse label="Deel je betaling">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-6">
                                <p className="mb-3">Met de code</p>
                                <p className="mb-5 break-words font-serif bg-gray-100 p-4 select-all">{ generatePaymentCode({
                                    amount,
                                    descr,
                                    reciever
                                }) }</p>
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <p className="mb-3">Of surf naar</p>
                                <p className="mb-5 break-words font-serif bg-gray-100 p-4 select-all">{ window.location.href }/{ generatePaymentCode({
                                    amount,
                                    descr,
                                    reciever
                                }) }</p>
                            </div>
                        </div>
                                    
                    </Collapse>
                </>)}
            </Form>
        </PageLayout>
    )
}

export default PaymentsPage