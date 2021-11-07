import { useQuery } from '@apollo/client'
import React from 'react'
import dayjs from 'dayjs';

import QUERIES from '../../graphql/queries'
import { PageLayout } from '../../layouts'
import { articleCalendar } from '../../data/dateFormat';
import { CoronaStatusBadge, CoronaStatusBanner, Icon, RenderContent, ShareService } from '../../components';

const Card = ( { data }) => {
    const { name, full_slug, first_published_at, content: { body } } = data;
    const calendarTime = dayjs(dayjs(first_published_at)).calendar(null, articleCalendar)

    return <div className="border-b-2 border-gray-300 py-8">
        <p className="mt-2 flex items-center text-sm mb-1">
            <span className="mr-1"><Icon name="time" /></span>
            Update <span className="lowercase ml-1">{ calendarTime }</span>
        </p>
        <h4 className="font-bold text-xl mb-4 text-gray-600">{ name }</h4>
        <RenderContent content={ body } />
    </div>
}

const CoronaUpdatesPage = () => {
    const { data, loading } = useQuery(QUERIES.CORONA_UPDATES_BY_TAG)

    if (loading) return <PageLayout loading />
    console.log(data)
    const { NewsItems: { items }} = data

    return <PageLayout title="Corona updates" subtitle="Alle updates betreffende corona en scouting" loading={ loading } banner="https://res.cloudinary.com/haegepoortersbe/image/upload/v1627595499/ie2ah4fyteq375u98vax.jpg">
        <CoronaStatusBadge className="border-2 border-green-100 mx-auto" statusCode="2" />
        { items.map((d) => <Card data={ d } />)}
        <ShareService />
    </PageLayout>
}

export default CoronaUpdatesPage