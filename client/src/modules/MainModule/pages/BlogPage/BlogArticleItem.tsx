import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BlogArticle } from '../../../../types/content';
import { Button, Date, Icon } from '../../../../components/basics';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';

interface Props {
    article: StoryBlokResponse<BlogArticle>
};

const BlogArticleItem: FC<Props> = ({ article }) => {
    return (
        <Link to={ article.slug } className="card flex flex-col">
            <div className="flex-1">
                { article.content.banner.filename && 
                    <div className="card__img h-40 mb-2">
                        <img className="h-full w-full object-cover" src={ article.content.banner.filename } alt="" />
                    </div>
                }
                <div className="flex items-center text-sm mb-1 gap-1">
                    <Icon name="time" size="1rem" />
                    <span><Date format="DD MMM YYYY">{ article.published_at }</Date></span>
                </div>
                <h3 className="card__title">{ article.name }</h3>
                <p className="card__descriptor">{ article.content.descr_short }</p>
            </div>
            <Button theme="simple" icon="arrow-right" className="mt-4">Meer hierover</Button>
        </Link>
    )
}

export default BlogArticleItem;