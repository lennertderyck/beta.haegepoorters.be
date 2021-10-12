import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, CenterMessage, SignInMessage } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import { siteGroups } from '../../data/site';
import { PageLayout } from '../../layouts';

const ActivityEditor = () => {
    const { group } = useParams()
    const { _keycl, profile } = useVisitor()

    if (!_keycl.token && process.env.NODE_ENV !== 'development') return <PageLayout>
        <div className="h-full ">
            <SignInMessage />
        </div>
    </PageLayout>
    
    if (!profile?.isLeader) return  <div className="h-full flex items-center justify-center">
        <CenterMessage intro="Jij bent geen leiding ;)" icon="shield-user">
            Enkel actieve leiding kan deze pagina bekijken
        </CenterMessage>
    </div>
    
    if (!group) return <PageLayout
        title="Haegeprekerkes"
        subtitle="Bewerk de Haegeprekerkes"
    >
        <div className="bg-gray-100 py-4 px-5 text-sm mb-6">
            <ul className="list-disc list-inside">
                <li>Vul in deze documenten het Haegeprekerke aan per maand</li>
                <li>Maak een overzichtelijk onderscheid tussen elke periode</li>
                <li><strong>Het Haegeprekerke wordt niet automatisch aangepast</strong>, je bewerkingen moeten door de redactie nog steeds overgezet worden, breng ons dus zeker op de hoogte!</li>
            </ul>
        </div>
        
        { siteGroups.filter(({ activityEditorCode }) => activityEditorCode).map(({ plur, value  }, index) => <>
            <Link 
                key={ index }
                to={ '/haegeprekerke/edit/' + value }
                className="flex flex-col items-start border-b-2 py-5 lg:px-5 lg:hover:bg-gray-100 w-full"
            >
                <h4 className="align-middle text-left font-semibold text-lg capitalize">{ plur }</h4>
            </Link>
        </>) }
    </PageLayout>
    
    const activeEdit = siteGroups.find(({ value }) => value === group)
    
    return (
        <>
            <div className="bg-gray-200 flex justify-between py-3 px-5 w-full mb-3">
                <Button theme="simple" icon="arrow-left" to="/haegeprekerke/edit">
                    terug naar overzicht
                </Button>
                <h3 className="font-medium text-base mr-2">
                    Je bent momenteel het Haegeprekerke voor de <span className="underline inline font-semibold">{ activeEdit.plur }</span> aan het bewerken
                </h3>
            </div>
            <iframe 
                src={`https://docs.google.com/document/d/${ activeEdit.activityEditorCode }/edit`}
                width="100%" 
                className="h-screen"
            />
        </>
    )
}

export default ActivityEditor