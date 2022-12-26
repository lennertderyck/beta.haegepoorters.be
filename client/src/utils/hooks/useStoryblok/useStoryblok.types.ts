import { States } from "../useAsyncState/useAsyncState.types";

interface AnonymousData {
    [key: string]: any;
}

interface StoryBlokRecord {
    id: number,
    name: string,
    slug: string,
    full_slug: string;
    parent_id: number
}

interface MetaData extends AnonymousData {}
interface TranslatedSlugs {}
interface Alternates extends StoryBlokRecord {
    is_folder: boolean,
}

export type StoryBlokContentBlock<Content = {}> = Content & {
    _uid: string;
    component: string;
}
export type StoryBlokContentBlockPlugin<Content = {}> = StoryBlokContentBlock<Content & {
    plugin: string;
}>

interface Content extends AnonymousData, StoryBlokContentBlock {}

export interface StoryBlokResponse<Data = any> extends StoryBlokRecord {
    created_at: string;
    published_at: string;
    uuid: string;
    content: Content & Data;
    sort_by_date: string | null;
    position: number;
    tag_list: string[];
    is_startpage: boolean;
    meta_data: MetaData | undefined;
    group_id: string;
    first_published_at: string;
    release_id: null | any;
    lang: string;
    path: string | null;
    alternates: Alternates[];
    default_full_slug: string | null;
    translated_slugs: TranslatedSlugs[];
};

export interface StoryBlokFile {
    id: string | null;
    alt: string | null;
    name: string;
    focus: string | null;
    title: string | null;
    width: number | undefined;
    height: number | undefined;
    filename: string | null;
    copyright: string | null;
    fieldtype: string | undefined;
    public_id: string | undefined;
    aspect_ratio: number | undefined;
}

export type StoryBlokRequest = () => Promise<void>;

export type UseStoryBlok = <Data = any>(path: string, params?: any) => [
    States<{
        stories: StoryBlokResponse<Data>[],
        story: StoryBlokResponse<Data>
    }>,
    StoryBlokRequest
];