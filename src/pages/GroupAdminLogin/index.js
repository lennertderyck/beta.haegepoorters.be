import React, { useState, useRef } from 'react';
import { useAxios } from "use-axios-client";
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { Button, Form, Icon, Input, NotMemberMsg, SignInMessage, SmartLookSensitive } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { accountLeaderLinks, links } from '../../data/nav';
import PageLayout from '../../layouts/PageLayout';
import { className, findUserTags, GET, inDev, PATCH } from '../../utils';
import _keycl from '../../utils/keycloak.vendors';
import { scoutingGroups, uris } from '../../data/site';
import { articleCalendar, calendarUpdate } from '../../data/dateFormat';

const Card = ({ data, group }) => {
    const [ open, setOpen ] = useState(false);
    const el = useRef();
    
    const { summary, description, start, end, location, htmlLink } = data;
    const startDate = dayjs(start.date || start.dateTime)
    const endDate = dayjs(end.date || end.dateTime)
    const periodDiff = endDate.diff(startDate, 'day')
    const descrIsEmpty = description === '' || !description;
                
    return (<a href={ htmlLink } target="_blank" { ...className('flex py-4 lg:px-6 border-b-2 border-gray-200 cursor-pointer')}>
        <div className="mr-6">
            <p className="font-bold text-3xl -mb-2 text-center text-gray-400 relative">
                <span>{ startDate.format('D') }</span>
                <span className="absolute righ-0 text-sm top-1/2 transform -translate-y-1/2">{ periodDiff > 1 && '+' }</span>
            </p>
            <p className="text-center font-serif uppercase text-gray-400">{ startDate.format('MMM').replace('.', '') }</p>
        </div>
        <div className="w-full flex justify-center flex-col">
            <h4 className="font-bold text-xl">{ summary }</h4>
            {/* <h5 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{ location }</h5> */}
            { !descrIsEmpty && 
                <div className="overflow-hidden transition-all font-serif">
                    { description }
                </div>
            }
        </div>
    </a>)
}

const HighlightedLeaderEvents = () => {
    const { data, error, loading } = useAxios(GET.LEADER_CALENDAR);
    
    if (!data) return null
    
    const { updated, items } = data
    
    const updateTimeFormatted = dayjs(updated).calendar(null, calendarUpdate)

    return <>
        <div className="flex items-start justify-between">
            <div>
                <h3 className="font-serif">Komende activeiten</h3>
                <p className="mb-6">Leidingsactiviteiten</p>
            </div>
        </div>
        { items
            .sort(({ start: a}, { start: b}) => {
                return new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date)
            })
            .map(( data ) => (
                <Card data={ data } />
            ))}
        <div className="flex mt-6 flex-col lg:flex-row-reverse">
            <div className="text-xs uppercase tracking-widest lg:mt-0 font-medium text-center lg:text-right mb-6 lg:mb-0">Laatste update <br className="hidden lg:inline" /><strong>{ updateTimeFormatted }</strong></div>
            <div className="flex flex-col lg:flex-row flex-1">
                <Button theme="button" icon="rss" href={ uris.leaderCalendarSubscribtion } target="_blank" className="mb-4 lg:mb-0 block mx-auto lg:ml-0 lg:mr-4">Abonneren op agenda</Button>
                <Button theme="simple" iconAfter="arrow-right-up" href={ uris.leaderCalendarOverview } target="_blank" className="px-2 block mx-auto lg:mx-0">Volledig overzicht</Button>
            </div>
        </div>
    </>
}

const ProfileSummary = () => {
    const { profile } = useVisitor()

    const handleEmailChange = async ({ email }) => {
        const req = await PATCH.CHANGE_EMAIL(profile.id, email);
        console.log(req)
    }

    if (!_keycl.token && !inDev()) return <SignInMessage />
    else if (!profile && !inDev()) return <h3>Loading</h3>
    else if (!profile?.isMember && _keycl.token) return <NotMemberMsg />

    const adjustedTags = profile['functies'].map((data) => {
        const { functie } = data
        
        const tagInfo = findUserTags(functie)
        const isLeader = tagInfo['groeperingen'].find(({ naam }) => naam === 'Leiding');

        return { ...data, isLeader, tagInfo }
    })

    const tagsCurrent = adjustedTags
        .filter(({ einde }) => !einde)
        .sort(({ begin: x }, { begin: y }) => new Date(y) - new Date(x))

    const tagsOld = adjustedTags
        .filter(({ einde }) => einde)
        .sort(({ einde: x }, { einde: y }) => new Date(y) - new Date(x))

        
    console.log(profile)
        
    return <>
        <Tabs>
            { profile.isLeader && <TabList className="mb-12">
              <Tab>Leidingtools</Tab>
              <Tab>Profiel</Tab>
              <Tab>Groepsadministratie</Tab>
              { profile.isWebmaster && <Tab>Site instellingen</Tab> }
            </TabList>}

            { profile.isLeader && <>
                <TabPanel>
                    <div className="mb-14">
                        <h3 className="font-serif">Snelkoppelingen</h3>
                        <p>Alle tools voor actieve leiding</p>
                        <div className="grid grid-cols-12 mt-6 gap-4">
                            { accountLeaderLinks.map(({ to, href, label, ...otherProps }, index) => 
                                <div className="col-span-12 md:col-span-6" key={ index }>
                                    <Button { ...{ to, href, ...otherProps }} iconAfter="arrow-right" theme="list">{ label }</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <HighlightedLeaderEvents />
                    </div>
                </TabPanel>
                <TabPanel>
                    Profiel
                </TabPanel>
            </>}
            <TabPanel>
                <div className="mb-14 bg-red-500 p-6 text-white">
                    <h3 className="font-serif">Individuele steekkaart</h3>
                    <p>Belangrijke medische gegevens, laatst aangepast <span className="font-medium">{ dayjs(profile.vgagegevens.individueleSteekkaartdatumaangepast).fromNow() }</span></p>
                    <div className="mt-2">
                        <p className="text-sm text-white text-opacity-75">Hou je individuele steekkaart up-to-date, het is het eerste document dat leiding raadpleegt in geval van nood.</p>
                        <Button theme="simple-white" iconAfter="arrow-right-up" className="mt-7 text-white" href={ uris.medicalInfoBase + profile.id } target="_blank">Bekijken en bewerken</Button>
                    </div>
                </div>

                <div className="mb-14">
                    <h3 className="font-serif">Emailadres</h3>
                    <p>Voor het aanmelden, en ontvangen van mails</p>
                    <Form className="mt-4" onSubmit={ handleEmailChange }>
                        <Input defaultValue={ profile.email } name="email" type="email" />
                        <Button theme="button" type="submit">Wijzigen</Button>
                    </Form>
                </div>
            
                <div className="mb-6">
                    <h3 className="font-serif mb-4">Adressen</h3>
                    <div className="grid grid-cols-2 gap-6">
                        { profile['adressen'].map(({ straat, nummer, postcode, gemeente }, index) => (
                            <div 
                                key={ index }
                                className="border-2 border-gray-300 p-5 col-span-2 md:col-span-1"
                            >
                                <h3 className="font-medium text-xl -mb-1">{ straat } { nummer }</h3>
                                <h4 className="font-serif text-lg">{ postcode } { gemeente }</h4>
                            
                                <Button href={ links.gaProfile } className="mt-5 text-red-500" iconAfter="arrow-right-up" target="_blank">Adres aanpassen</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-14">
                    <h3 className="font-serif mb-4">Contacten</h3>
                    <div className="grid grid-cols-2 gap-6">
                        { profile['contacten'].map(({ voornaam, achternaam, rol, email, gsm }, index) => (
                            <div 
                                key={ index }
                                className="border-2 border-gray-300 p-5 col-span-2 md:col-span-1"
                            >
                                <h4 className="font-serif text-lg">{ rol }</h4>
                                <SmartLookSensitive>
                                    <h3 className="font-medium text-xl">{ voornaam } { achternaam }</h3>
                                </SmartLookSensitive>
                            
                                <div className="mb-4">
                                    <h4 className="mt-4 text-gray-400 text-sm">{ 
                                        email ? 
                                        'Emails worden verstuurd naar' :
                                        'We konden geen emailadres vinden, je zal dus geen emails ontvangen' 
                                    }</h4>
                                    { email && <p className="font-serif text-lg">{ email }</p> }
                                </div>
                                <div className="mb-4">
                                    <h4 className="mt-4 text-gray-400 text-sm">{ 
                                        gsm ? 
                                        'We bellen je op' :
                                        'We konden geen gsm-nummer vinden, we kunnen je dus moeilijker bereiken' 
                                    }</h4>
                                    { gsm && <p className="font-serif text-lg">{ gsm }</p> }
                                </div>
                                <Button href={ links.gaProfile } className="mt-5 text-red-500" iconAfter="arrow-right-up" target="_blank">Gegevens aanpassen</Button>
                            </div>
                        ))}
                    </div>
                </div>
            
                <div className="grid grid-cols-2 gap-8 lg:gap-6">
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-serif mb-4">Huidige functie{tagsCurrent.length !== 1 && 's'}</h3>
                        <div className="-mt-4">
                            {
                                tagsCurrent.map(({ isLeader, tagInfo, begin, groep }, index) => {
                                    return (
                                        <div 
                                            key={ index }
                                            className="border-b-2 border-gray-300 py-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <h3 className="text-base font-normal mb">{ tagInfo['beschrijving'] }</h3>
                                                <h4 className="font-medium text-xs uppercase tracking-wider mb-2 text-gray-400">{ scoutingGroups[groep] }</h4>
                                                <h4 className="font-serif text-lg text-gray-400">sinds { dayjs(begin).format('DD MMMM \'YY') }</h4>
                                            </div>
                                            <div className="px-4">
                                                { isLeader && <Icon name="team" size="1.5rem" color="#6f101d" />}
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-serif mb-4">Oude functie{tagsOld.length !== 1 && 's'}</h3>
                        <div className="-mt-4">
                            { 
                                tagsOld.map(({ isLeader, tagInfo, einde, groep }, index) => {
                                    return (
                                        <div 
                                            key={ index }
                                            className="border-b-2 border-gray-300 py-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <h3 className="text-base font-normal mb">{ tagInfo['beschrijving'] }</h3>
                                                <h4 className="font-medium text-xs uppercase tracking-wider mb-2 text-gray-400">{ scoutingGroups[groep] }</h4>
                                                <h4 className="font-serif text-lg text-gray-400">tot { dayjs(einde).format('DD MMMM \'YY') }</h4>
                                            </div>
                                            <div className="px-4">
                                                { isLeader && <Icon name="team" size="1.5rem" color="#6f101d" />}
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <Form>
                    <Input 
                        type="select" 
                        label="Coronastatus" 
                        name="corona_status"
                        comment={'In welke mate gaan activiteiten door? Kies voor "Niet van toepassing" wanneer deze instelling niet meer relevant is, dan zal ook de banner op de homepagina verborgen worden.'}
                    >
                        <option value="2">Activiteiten toegelaten</option>
                        <option value="1">Aangepaste maatregelen</option>
                        <option value="0">Activiteiten opgeschort</option>
                        <option value="nvt">Niet van toepassing</option>
                    </Input>
                </Form>
            </TabPanel>
        </Tabs>
    </>
}

const GroupAdminLogin = () => {
    const { isLoggedIn, logout } = useVisitor()

    return (
        <PageLayout
            title="Account"
            subtitle="Je gegevens bij Scouts en Gidsen Vlaanderen"
        >
            { isLoggedIn && <ProfileSummary />}
            { _keycl.token && (
                <>
                    <div className="pt-12 flex justify-center">
                        <Button theme="simple" iconAfter="logout-circle-r" onClick={() => {
                            logout({ redirectUri: window.location.origin +  '/ga' })
                        }}>Afmelden</Button>
                    </div> 
                    <small className="block mt-12 font-serif text-md text-center">*Wij bewaren je gegevens nooit bij derde partijen.<br />Al je peresoonlijke data blijft veilig bij Scouts en Gidsen Vlaanderen of lokaal op je computer.</small>
                </>
            )}
        </PageLayout>
    )
}

export default GroupAdminLogin
