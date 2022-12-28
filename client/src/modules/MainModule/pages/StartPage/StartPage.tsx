import { FC } from 'react';
import HighlightedEvents from '../../components/HighlightedEvents/HighlightedEvents';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/basics';
import HeroBanner from './HeroBanner';
import RelatedLinks from './RelatedLinks';
import HighlightedNews from '../../components/HighlightedNews/HighlightedNews';

interface Props {};

const StartPage: FC<Props> = () => {
    return (
        <div className="page page--wide page--headless">
            <div className="page__content">
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 xl:col-span-8">
                        <h3 className="section-title mb-5">
                            <Link to="/haegeprekerke" className="flex items-center gap-4">
                                <span>Activiteiten in de kijker</span>
                                <Icon name="arrow-right" size="1.4rem" />
                            </Link>
                        </h3>
                        <HighlightedEvents />
                    </div>
                    <div className="col-span-12 xl:col-span-4">
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
    )
}

export default StartPage;