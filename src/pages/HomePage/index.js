import React from 'react';

import { CoronaStatusBanner, HighlightedEvents, HighlightedNews } from '../../components'

const HomeContent = () => {
  return <>
    <div className="container mx-auto px-8">
      <CoronaStatusBanner />
      <div className="grid grid-cols-12 py-12 gap-12">
        <div className="col-span-8">
          <h3 className="font-serif mb-6">Activiteiten in de kijker</h3>
          <HighlightedEvents />
        </div>
        <div className="col-span-4">
          <h3 className="font-serif mb-6">Nieuwtjes &amp; blog</h3>
          <HighlightedNews />
        </div>
      </div>
    </div>
  </>
}

export default function Home() {
  return (
    <>
      {/* <ApolloProvider client={client}> */}
        <HomeContent />
      {/* </ApolloProvider> */}
    </>
  )
}
