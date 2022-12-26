import { FC } from 'react';
import { BlogArticle } from '../../../../types/content';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';
import { Button } from '../../../../components/basics';

interface Props {
    article: StoryBlokResponse<BlogArticle>
};

const NewsCard: FC<Props> = ({ article }) => {
    return (
        <div className="card">
            <h4 className="card__title">{ article.name }</h4>
            <p className="card__descriptor">{ article.content.descr_short }</p>
            <div className="mt-4">
                <Button to={ '/blog/' + article.slug } theme="simple" icon="arrow-right">Meer hierover</Button>
            </div>
        </div>
    )
}

export default NewsCard;