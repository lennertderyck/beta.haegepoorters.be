import classNames from "classnames";
import dayjs from "dayjs";
import { siteGroups } from '../data/site';

import './react-tabs.vendors'

export const className = (...params) => ({ className: classNames(params) });

export const sortActivitiesByDate = (
    { period: { start: a }}, 
    { period: { start: b }},
) => {
    return new Date(a) - new Date(b)
};

export const activityIsPassed = (date) => dayjs(new Date()).isAfter(dayjs(date), 'day');

export const findFirstActivity = (acts) => {
    return acts?.find(({ period: { start }}) => !activityIsPassed(start))
}

export const checkActivities = (acts, group_acts) => {
    if (!group_acts) return findFirstActivity(acts)
    
    const { period: { start: a }} = findFirstActivity(acts);
    const { period: { start: b }} = group_acts;
    
    const diff = dayjs(a).diff(dayjs(b))

    return diff !== 0 ? findFirstActivity(acts) : null
}

export const filterTeamOnFunction = (items, funct) => items.filter(({ content: { functions } }) => {
    return functions?.content?.shortcode === funct
});

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
    get(name) {
        return localStorage.getItem(
            this.name(name)
        )
    },
    delete(name) {
        localStorage.removeItem(
            this.name(name)
        )
    },
    exists(name) {
        const result = this.get(name)
        return result ? true : false
    }
}

export const findTag = (taglist) => {
    return taglist.filter(({ einde }) => !einde)
}

export const generatePaymentQR = ({ reciever = 'Groepskas', account = 'BE', amount = 0, descr = 'betaling'}) => {
    return `https://qrcode.tec-it.com/API/QRCode?data=BCD%0a001%0a1%0aSCT%0aKREDBEBB%0a${ reciever }+HAEGEPOORTERS%0a${ account }%0a${ amount }%0a%0a${ descr }&backcolor=%23ffffff&method=image`
}
export const generatePaymentCode = ({ reciever = 'grk', amount = 0, descr }) => {
    const composedString = [reciever, amount, descr].join(';')
    return btoa(composedString)
}

export const decodePaymentCode = (code) => {
    if (!code) return;
    
    const [ reciever, amount, descr ] = atob(code).split(';')
    return {
        reciever,
        amount,
        descr
    }
}

export const siteGroup = (value) => siteGroups.find(({ value: v }) => value === v);

export const inDev = () => process.env.NODE_ENV === 'development'

export const autoFillPermission = (permission, callbackFn) => {
    switch (permission) {
        case 'always':
            cookieHook.set('autoFill', permission)
            if (callbackFn) callbackFn(permission)
            break;
        case 'onetime':
            cookieHook.set('autoFill', permission)
            if (callbackFn) callbackFn(permission)
            break;
        case 'never':
            cookieHook.set('autoFill', permission)
            if (callbackFn) callbackFn(permission)
            break;
        default:
            break;
    }
}

export const handleShare = ({ 
    url = window.location.href,
    text = 'Haegepoorters Destelbergen', 
    title = 'Haegepoorters Destelbergen'
}) => {
    navigator.share({
        url,
        text,
        title
    })
}

export const isOverflowing = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
}

export * from './requests'
export * from './roles'