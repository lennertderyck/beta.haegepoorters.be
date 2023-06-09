export interface AuthTokens {
    token: string;
    refreshToken: string;
}

export interface AccessRights {
    groupMember: boolean;
    active: boolean;
    staff: boolean;
}

export interface ClearanceAttributes {
    codes: string[];
    descriptors: string[];
}