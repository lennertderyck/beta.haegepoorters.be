export interface UpdateActivity {
    title: string;
    start: string;
    end: string;
    multiple: boolean;
    description: string;
}

export interface CreateActivity {
    title: string;
    start: string;
    end: string;
    multiple: boolean;
    description: string;
    group: [string];
}