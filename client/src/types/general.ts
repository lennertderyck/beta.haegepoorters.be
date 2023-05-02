export type GroupAbbrev = 'kap' | 'wel' | 'wol' | 'jgv' | 'giv';
export interface Group {
    functionId: string;
    name: string;
    activityEditorCode: string;
    airtableId: string;
}

export type CookiePolicy = 'all' | 'restricted';