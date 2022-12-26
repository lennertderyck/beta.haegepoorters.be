import { StoryBlokContentBlockPlugin } from "../utils/hooks/useStoryblok/useStoryblok.types";

interface Activity {
    descr: any;
    period: StoryBlokContentBlockPlugin<{
        _uid: "e44a450f-f3ce-414d-ab8c-89f43c23353f",
        start: "2022-10-02",
        end: null,
        multiple: false
    }>
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
