import classNames from "classnames";
import dayjs from "dayjs";
import { siteGroups } from '../data/site';

export const className = (...params) => ({ className: classNames(params) });

export const sortActivitiesByDate = (
    { period: { start: a }}, 
    { period: { start: b }},
) => {
    return new Date(a) - new Date(b)
};

export const activityIsPassed = (date) => dayjs(new Date()).isAfter(dayjs(date));

export const filterTeamOnFunction = (items, fn) => items.filter(({ content: { functions } }) => {
    return functions?.content?.shortcode === fn
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

export const findTag = (taglist) => {
    return taglist.filter(({ einde }) => !einde)
}

export const generatePaymentQR = ({ reciever = 'Groepskas', account = 'BE', amount = 0, descr = 'beetaling'}) => {
    // const url = new URL(null, 'https://qrcode.tec-it.com/API/QRCode')
    // console.log({ url });
    return `https://qrcode.tec-it.com/API/QRCode?data=BCD%0a001%0a1%0aSCT%0aKREDBEBB%0a${ reciever }+HAEGEPOORTERS%0a${ account }%0a${ amount }%0a%0a${ descr }&backcolor=%23ffffff&method=image`
}

export const siteGroup = (value) => siteGroups.find(({ value: v }) => value === v);

export * from './requests'