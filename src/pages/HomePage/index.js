import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

import { Button, CoronaStatusBanner, Footer, HeroBanner, HighlightedEvents, HighlightedNews, Icon, Modal } from '../../components'
import { homeRelatedLinks } from '../../data/nav';
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
            <Link className="flex items-center mb-6" to="/haegeprekerke">
              <h3 className="font-serif">Activiteiten in de kijker</h3>
              <Icon name="arrow-right" size="1.4rem" className="ml-3"/>
            </Link>
            <HighlightedEvents />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Link className="flex items-center mb-6" to="/blog">
              <h3 className="font-serif">Nieuwtjes &amp; blog</h3>
              <Icon name="arrow-right" size="1.4rem" className="ml-3"/>
            </Link>
            <HighlightedNews />
          </div>
        </div>
      </div>
      <HeroBanner className="mb-12 lg:mb-20 lg:h-80">
        <h2 className="text-5xl font-serif mb-6">Wij zijn scouts en gidsen ...</h2>
        <div className="lg:max-w-1/2">
          <p className="font-medium text-lg">Deel uitmaken van onze scouts is meer dan een hobby. De Haegepoorters, ook wel "HP" in de volksmond, zijn een thuis voor meer dan 200 jongeren.</p>
        </div>
        <MembersStats />
      </HeroBanner>
      <div className="container mx-auto mb-24 px-8 md:px-0">
        <h3 className="font-serif mb-6">Komt ook van pas...</h3>
        <div className="grid grid-cols-12 gap-6 lg:gap-4">
          { homeRelatedLinks.map(({ title, descr_short, url, button_text }, index) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-3" key={ index }>
              <h4 className="font-semibold text-lg mb-1">{ title }</h4>
              <p className="font-serif text-base">{ descr_short }</p>
              <Button 
                href={ url } 
                theme="simple" 
                className="mt-4"
                target="_blank"
                iconAfter="arrow-right-up"
              >{ button_text || 'Meer hierover' }</Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
