import { StoryBlokContentBlock, StoryBlokContentBlockPlugin, StoryBlokFile, StoryBlokResponse } from "../utils/hooks/useStoryblok/useStoryblok.types";

export interface Activity extends StoryBlokContentBlock<{
    descr: any;
    title: string;
    period: StoryBlokContentBlockPlugin<{
        start: string,
        end: string,
        multiple: boolean
    }>
}> {};

export interface Event {
    id: string;
    start: string;
    end: string | undefined;
    description: string;
    title: string;
    multiple: boolean;
    editions: [string],
    group: [string],
    edition_id: [string],
    group_shortcodes: [string]
}

export interface HaegeprekerekeContent {
    descr: any;
    
    group_activities: any[];
    kap: Activity[];
    wel: Activity[];
    wol: Activity[];
    jgv: Activity[];
    giv: Activity[];
}

export interface BlogArticle extends StoryBlokContentBlock<{
    body: any,
    title: StoryBlokContentBlockPlugin<{
        example: string
    }>,
    banner: StoryBlokFile;
    shareable: boolean;
    descr_short: string;
}> {};

export interface Leader extends StoryBlokContentBlock<{
    tel: string;
    image: StoryBlokFile;
    totem: string;
    wel_name: string;
    functions: StoryBlokResponse<{
        logo: StoryBlokFile;
        label: string;
        title: StoryBlokContentBlockPlugin<{
            example: string;
        }>;
        shortcode: string;
        payments_account_nr: string;
        activity_editor_code: string;
    }>;
    last_name: string;
    first_name: string;
    functions_extra: string[];
}> {};

export interface Page extends StoryBlokContentBlock<{
    body: any;
    title: StoryBlokContentBlockPlugin<{
        example: string;
    }>;
    banner: StoryBlokFile;
    descr_short: string;
    quick_actions: any[];
}> {};

export interface Edition {
    id: string;
    title: string;
    start: string;
    end: string;
    due: string;
};

export interface EditionActivity {
    id: string,
    start: string,
    title: string,
    editions: [string],
    group: [string],
    edition_id: [string]
    multiple: boolean;
    end: string;
    description: string;
}