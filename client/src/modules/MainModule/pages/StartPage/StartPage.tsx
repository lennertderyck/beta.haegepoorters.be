import { FC } from 'react';
import HighlightedEvents from '../../components/HighlightedEvents/HighlightedEvents';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../../../../components/basics';
import HeroBanner from './HeroBanner';
import RelatedLinks from './RelatedLinks';
import HighlightedNews from '../../components/HighlightedNews/HighlightedNews';

interface Props {};

const StartPage: FC<Props> = () => {
    return (
        <>
            <div className="container px-6">
                <Link to="/blog/kampdata-2023" className="border-b-2 hidden lg:flex items-center justify-between py-3 overflow-hidden group">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Icon name="notification-3" />
                        <p className="font-serif text-xl">Onze kampdata voor 2023 zijn beschikbaar!</p>
                    </div>
                    <Button theme="simple" icon="arrow-right" className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-[0%] lg:translate-y-[100%] lg:group-hover:translate-y-[0%]">Kampdata bekijken</Button>
                </Link>
            </div>
            <div className="page !pt-12 page--wide page--headless">
                <div className="page__content">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-12">
                        <div className="col-span-12 lg:col-span-8">
                            <h3 className="section-title mb-5">
                                <Link to="/haegeprekerke" className="flex items-center gap-4">
                                    <span>Activiteiten in de kijker</span>
                                    <Icon name="arrow-right" size="1.4rem" />
                                </Link>
                            </h3>
                            <HighlightedEvents />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <h3 className="section-title mb-5">
                                <Link to="/blog" className="flex items-center gap-4">
                                    <span>Nieuwtjes & blog</span>
                                    <Icon name="arrow-right" size="1.4rem" />
                                </Link>
                            </h3>
                            <HighlightedNews />
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <HeroBanner />
                </div>
                <div className="page__content mt-12">
                    <h3 className="section-title mb-5">Komt ook van pas ...</h3>
                    <RelatedLinks />
                </div>
            </div>
        </>
    )
}

export default StartPage;