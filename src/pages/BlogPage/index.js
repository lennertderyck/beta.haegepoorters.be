import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';

import queries from '../../graphql/queries';
import { RenderContent, Container, Button, Icon, Img, PageWrapper, RenderTimes, Form, Input, Modal, HideByCookie, ShareService } from '../../components';
import ArticleLayout from '../../layouts/ArticleLayout';
import QUERIES from '../../graphql/queries';
import dayjs from 'dayjs';
import { articleCalendar } from '../../data/dateFormat';

const BlogArticlePage = () => {
    const { slug } = useParams()
    const { data, loading } = useQuery(queries.NEWS_ITEM_BY_SLUG, {
        variables: {
            slug: 'blog/' + slug
        }
    })
    
    if (loading) return <ArticleLayout loading={ true } /> 
    
    const { NewsItem: { 
        name,
        first_published_at,
        content: { 
            body,
            descr_short,
            banner: {
                filename: banner
            }
        }
    }} = data
    
    return (
        <ArticleLayout
            title={ name }
            intro={ descr_short }
            banner={ banner }
            date={ first_published_at }
            goBack="/blog"
        >
            <RenderContent content={ body } />
            <ShareService />
        </ArticleLayout>
    )
}

const Loader = () => {
    return (
        <div className="border-b-2 border-gray-200 py-6 h-full">
            <Skeleton width="100%" height="10rem" className="mb-6" />
            <Skeleton width="8rem" /><br />
            <Skeleton height="1.5rem" width="10rem" className="mb-3" /><br/>
            <Skeleton width="80%" /><br/>
            <Skeleton width="60%" />
        </div>
    )
}

const Card = ({ data }) => {
    const { name, full_slug, first_published_at, content: { descr_short, banner: { filename }} } = data;
    const calendarTime = dayjs(dayjs(first_published_at)).calendar(null, articleCalendar)
    
    return (
        <Button theme="clear" to={ full_slug } className="border-b-2 border-gray-200 py-6 h-full flex flex-col justify-between">
            <div className="w-full">
                { filename && <Img src={ filename } height="10rem" className="mb-6 block" />}
                <p className="mt-2 flex items-center text-sm mb-1">
                    <span className="mr-1"><Icon name="time" /></span>
                    { calendarTime }
                </p>
                <h4 className="font-bold text-xl mb-2 text-gray-600">{ name }</h4>
                <p className="font-serif text-base whitespace-normal">{ descr_short }</p>
            </div>
            <div className="pt-4 w-full">
                <Button to={ full_slug } theme="simple" iconAfter="arrow-right">Meer hierover</Button>
            </div>
        </Button>
    )
}

const ArticlesOverview = () => {
    const { data, loading } = useQuery(QUERIES.NEWS_ITEMS);
    
    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RenderTimes>
                <div className="col-span-1 h-full">
                    <Loader />
                </div>
            </RenderTimes>
        </div>
    )
    
    const { NewsItems: { items }} = data;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            { items.map((data, index) => <div className="col-span-1 h-full" key={ index }>
                <Card data={ data } />
            </div> )}
        </div>
    )
}

const SignUpModal = () => {
    return <Modal 
        title="Nieuwsbrief"
        button="Schrijf je in" 
        buttonTheme="button"
    >
        <Form
            action="https://haegepoorters.us6.list-manage.com/subscribe/post?u=e97a617a55c0d1d8e0ec95376&id=c5cc95ede7"
        >
            <Input name="EMAIL" label="Email" placeholder="powell@scouting.be" />
            <Button theme="button" submit="true">Versturen</Button>
        </Form>
    </Modal>
}

const BlogPage = () => {
    const { slug } = useParams()
    
    if (slug) return <BlogArticlePage />
    
    return (
        <PageWrapper>
            <Container className="mb-12">
                    <h1 className="font-serif font-bold text-5xl text-gray-600 mb-6">Nieuws &amp; blog</h1>
                    <p>Het reilen en zeilen binnen onze scouts</p>
            </Container>
            {/* <HideByCookie name="mc-signup">
                {({ hide }) => <Container className="mb-4">
                    <div className="bg-gray-100 p-6 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-lg">Blijf op de hoogte!</h4>
                            <p className="font-serif text-lg">Laat je email achter en krijg updates direct in je inbox.</p>
                        </div>
                        <SignUpModal />
                        <Button onClick={() => hide()}><Icon name="close" size="1.4rem" /></Button>
                    </div>
                </Container>}
            </HideByCookie> */}
            <Container wide>
                <ArticlesOverview />
            </Container>
            <form method="post" name="mc-embedded-subscribe-form" >
                <input type="email" name="EMAIL"/>
            </form>
        </PageWrapper>
    )
}

export default BlogPage