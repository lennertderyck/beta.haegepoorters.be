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
            NewsItems(per_page: 3, page: 1, sort_by: "first_published_at:desc") {
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
                    iframe
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
            TeammemberItems(sort_by: "content.functions_extra:desc, content.first_name:desc", per_page: 45) {
                total
                items {
                    content {
                        first_name
                        last_name
                        image { filename }
                        tel
                        functions_extra
                        functions {
                          content
                        }
                        totem
                        wel_name
                    }
                }
            }
        }
    `,
    TEAM_MEMBERS_COUNT: gql`
        {
            leaders: TeammemberItems {
                total
            }
            grl: TeammemberItems(
                filter_query_v2: { functions_extra: { in_array: "grl" } }
            ) {
                total
            }
        }
    `,
    GALLERY_ALBUMS: gql`
        {
            GaleryalbumItems {
                items {
                    name
                    content {
                        title
                        url,
                        groups
                    }
                }
            }
        }
    `,
    SEARCH_BY_TERM: gql`
        query SearchByTerm($query: String!) {
            ContentNodes(search_term: $query) {
                items {
                    name
                    full_slug
                    content
                    parent_id
                }
            }
        }
    `
}

export default QUERIES