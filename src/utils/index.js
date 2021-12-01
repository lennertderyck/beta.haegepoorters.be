import dayjs from "dayjs";
import { siteGroups } from '../data/site';

import './react-tabs.vendors'

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

export const checkSurveyResponse = (callback) => {
    const saved = JSON.parse(cookieHook.get('survey_1_site'))
    
    // Stop function when there is no saved response or a rating is already send
    if (!saved || saved?.rating) {
        callback && callback(true, saved)
        return;
    };
    
    // Show the survey again after two weeks
    const expired = dayjs().diff(saved?.date, 'day');
    if (expired >= 14) callback && callback(false, saved)
} 

export * from './dom'
export * from './activities'
export * from './payments'
export * from './requests'
export * from './roles'