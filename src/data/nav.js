import { uris } from './site'

export const mainNav = [
    { icon: 'home-5', label: 'Startpagina', slug: '/', offlineSupport: true, ignoreActiveClass: true },
    { icon: 'book-3', label: 'Haegeprekerke', slug: '/haegeprekerke', offlineSupport: true, ignoreActiveClass: false },
    { icon: 'newspaper', label: 'Nieuws & blog', slug: '/blog', ignoreActiveClass: false },
    { icon: 'team', label: 'Leiding', slug: '/leiding', ignoreActiveClass: false },
    // { icon: 'hand-heart', label: 'HP Renové', slug: '/vzw' },
    { icon: 'hammer', label: 'HP Renové', slug: '/vzw', ignoreActiveClass: false },
    // { icon: 'gallery', label: 'Galerij', slug: '/galerij' },
    // { icon: 'lifebuoy', label: 'FAQ', slug: '/veelgestelde-vragen' },
    // { icon: 'question', label: 'FAQ', slug: '/veelgestelde-vragen' },
    // { icon: 'virus', label: 'Corona', slug: '/corona' },
    { icon: 'chat-4', label: 'Contact', slug: '/contact', ignoreActiveClass: false },
]

export const homeRelatedLinks = [
    { 
        title: 'Groepsadministratie', 
        descr_short: 'Beheer de persoonlijke gegevens van je kind(eren)',
        url: 'https://groepsadministratie.scoutsengidsenvlaanderen.be',
        button_text: 'Aanmelden'
    },
    { 
        title: 'Hopper', 
        descr_short: 'Koop al je uitrusting bij Hopper en geniet een mooie korting als lid',
        url: 'https://www.hopper.be/',
        button_text: 'Shoppen bij Hopper'
    },
    { 
        title: 'Scouts en Gidsen Vlaanderen', 
        descr_short: 'De overkoepelende organisatie waar onze scouts bij hoort',
        url: 'https://scoutsengidsenvlaanderen.be',
        button_text: 'Meer weten'
    },
    { 
        title: 'Trooper', 
        descr_short: 'Steun gratis onze scouts met je online aankopen',
        url: 'https://www.trooper.be/nl/trooperverenigingen/hp',
        button_text: 'Steun ons!'
    },
]

export const accountLeaderLinks = [
    {
        label: 'Haegeprekerke indienen',
        to: '/haegeprekerke/edit'
    },
    {
        label: 'Betaal QR aanmaken',
        to: '/betalingen'
    },
    {
        label: 'Webmail',
        to: '/mail'
    },
    {
        label: 'Dropbox',
        href: 'https://www.dropbox.com/sh/6cqa2eif1xs3rki/AACTJ-AZjSBXj6iC_Xhs5oL7a?dl=0',
        target: '_blank'
    }
]

export const links = {
    gaProfile: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/#/lid/profiel'
}