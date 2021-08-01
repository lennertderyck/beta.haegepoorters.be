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
                published_at
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
    NEWS_ITEMS: gql`
        {
            NewsItems(sort_by: "first_published_at:desc") {
                items {
                    name
                    slug
                    published_at
                    first_published_at
                    full_slug
                    content {
                        descr_short
                        body
                        banner {
                            filename
                        }
                    }
                }
            }
        }
    `,
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
    ` ,
    HAEGEPREKERKE: gql`
        {
            HaegeprekerkeItems(per_page: 1, page: 1) {
                items {
                    name
                    content {
                        descr
                        period
                        kap
                        wel
                        wol
                        jgv
                        giv
                    }
                }
            }
        }
    `,
    CORONA_UPDATES_BY_TAG: gql`
        {
            NewsItems(with_tag: "corona", sort_by: "first_published_at:desc" ) {
                items {
                    name
                    first_published_at
                    content {
                        body
                    }
                }
            }
        }
    `,
    TEAM_FULL: gql`
        {
            TeammemberItems(sort_by: "content.first_name:asc") {
                items {
                    content {
                        first_name
                        last_name
                        image { filename }
                        tel
                    }
                }
            }
        }
    `
}

export default QUERIES