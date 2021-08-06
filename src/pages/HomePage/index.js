import React from 'react';

import { CoronaStatusBanner, HighlightedEvents, HighlightedNews, Modal } from '../../components'

const HomeContent = () => {
  return <>
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
