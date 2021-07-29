import { gql } from "@apollo/client"

const QUERIES = {
    HIGHLIGHTED_EVENTS: gql`
        {
            HaegeprekerkeItems(per_page: 1, page: 1) {
                items {
                    content {
                        kap
                        wel
                        wol
                        jgv
                        giv
                        period
                    }
                }
            }
            ActivityItems(per_page: 2, page: 1) {
                items {
                    name
                    content {
                        period
                        descr
                        descr_short
                        group
                    }
                }
            }
        }
    `,
    HIGHLIGHTED_NEWS: gql`
        {
            NewsItems(per_page: 3, page: 1) {
                items {
                    name
                    slug
                    full_slug
                    content {
                        banner {
                            name
                            filename
                            id
                            focus
                            title
                        }
                        descr_short
                    }
                }
            }
        }
    `,
    NEWS_ITEM_BY_SLUG: gql`
        query NewsItemBySlug($slug: ID!) {
            NewsItem(id: $slug) {
                name
                content {
                    body
                    banner {
                        name
                        filename
                        id
                        focus
                        title
                    }
                    descr_short
                }
            }
        }
    ` ,
    PAGE_BY_SLUG: gql`
        query PageBySlug($slug: ID!) {
            PageItem(id: $slug) {
                name
                published_at
                content {
                    descr_short
                    body
                    banner {
                        filename
                    }
                }
            }
        }
    ` 
}

export default QUERIES