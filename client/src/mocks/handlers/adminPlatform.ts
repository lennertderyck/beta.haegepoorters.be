// https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/token
// https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep
// https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/leiding
// https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/:id

import { rest } from "msw";
import { token } from "../fake/token";

const PLATFORM_AUTH_URL = 'https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/token';
const PLATFORM_API_URL = 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/';

export const adminPlatformHandlers = [
    rest.post(PLATFORM_AUTH_URL, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(token),
        )
    }),
]