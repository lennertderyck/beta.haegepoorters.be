import classNames from "classnames";
import dayjs from "dayjs";

import { GET } from './requests'

export const className = (...params) => ({ className: classNames(params) });
export const sortActivitiesByDate = (
    { period: { start: a }}, 
    { period: { start: b }},
) => {
    return new Date(a) - new Date(b)
}
export const activityIsPassed = (date) => dayjs(new Date()).isAfter(dayjs(date))

export const filterTeamOnFunction = (items, fn) => items.filter(({ content: { functions } }) => {
    return functions?.content?.shortcode === fn
})

export const cookieHook = {
    name(name) {
        return `hook:${ name }`
    },
    set(name, value) {
        localStorage.setItem(
            this.name(name),
            value
        )
    },
    delete(name) {
        localStorage.removeItem(
            this.name(name)
        )
    },
    exists(name) {
        const result = localStorage.getItem(
            this.name(name)
        )
        return result ? true : false
    }
}

export {
    GET
}