import { useQuery } from '@apollo/client';
import React from 'react';

import { Container ,CoronaStatusBanner, HeroBanner, HighlightedEvents, HighlightedNews, Modal } from '../../components'
import QUERIES from '../../graphql/queries';

const MembersStats = () => {
  const { data, loading, error } = useQuery(QUERIES.TEAM_MEMBERS_COUNT);
  
  if (loading || error) return null
  
  const { leaders, grl } = data;
  const moreStats = {
    members: 235,
    femalePercentage: 47
  }
  
  return (
    <div className="tracking-widest uppercase text-xs mt-5">
      <span className="font-bold">{ moreStats.members } leden</span> tussen 6 en 17 jaar <span className="mx-2">|</span>
      <span className="font-bold">{ leaders.total } leiding</span> waarvan { grl.total } groepsleiding
    </div>
  )
}

export default function Home() {

  
  return (
    <>
      <div className="container mx-auto px-8">
        <Modal>
          <h3>Put a title here</h3>
          <p>Some content</p>
        </Modal>
        <CoronaStatusBanner />
        <div className="grid grid-cols-12 py-12 lg:gap-12">
          <div className="col-span-12 lg:col-span-8 mb-12">
            <h3 className="font-serif mb-6">Activiteiten in de kijker</h3>
            <HighlightedEvents />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <h3 className="font-serif mb-6">Nieuwtjes &amp; blog</h3>
            <HighlightedNews />
          </div>
        </div>
      </div>
      <HeroBanner className="mb-12 lg:h-80">
        <h2 className="text-5xl font-serif mb-6">Wij zijn scouts en gidsen ...</h2>
        <div className="lg:max-w-1/2">
          <p className="font-medium text-lg">Deel uitmaken van onze scouts is meer dan een hobby. De Haegepoorters, ook wel "HP" in de volksmond, zijn een thuis voor meer dan 200 jongeren.</p>
        </div>
        <MembersStats />
      </HeroBanner>
    </>
  )
}
