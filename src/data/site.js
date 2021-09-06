export const visitorRoles = [
    { value: 'oud', isGroup: false, label: 'ouder', plur: 'ouders' },
    { value: 'kap', isGroup: true, contactForm: 'kapoenen', label: 'kapoen', plur: 'kapoenen' },
    { value: 'wel', isGroup: true, contactForm: 'welpen', label: 'welp', plur: 'welpen' },
    { value: 'wol', isGroup: true, contactForm: 'woudlopers', label: 'woudloper', plur: 'woudlopers' },
    { value: 'jgv', isGroup: true, contactForm: 'jonggivers', label: 'jonggiver', plur: 'jonggivers' },
    { value: 'giv', isGroup: true, contactForm: 'givers', label: 'giver', plur: 'givers' },
    { value: 'lei', isGroup: false, label: 'leiding', plur: 'leiding' },
]

export const uris = {
    mapsIntegration: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20067.32038937371!2d3.7758826000000005!3d51.04542365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1e72273a2eee6c6a!2sScouts%20en%20Gidsen%20Haegeporters%20Destelbergen!5e0!3m2!1snl!2sbe!4v1630695585935!5m2!1snl!2sbe'
}

export const contactSubjects = [
    { 
        value: 'groepsadmin',
        label: 'Groepsadministratie',
        faqText: 'Een vraag over de Groepsadministratie? Neem dan ook zeker eens een kijkje op onze FAQ pagina en je vind misschien al een antwoord op je vraag. Zo niet, aarzel niet om ons te contacteren!'
    },
    { 
        value: 'inschrijvingen',
        label: 'Inschrijvingen',
        faqText: null
    },
    { 
        value: 'evementen',
        label: 'Evementen',
        faqText: null
    },
    { 
        value: 'verhuur',
        label: 'Verhuur',
        faqText: 'We verhuren onze lokalen niet. Je kan echter wel materiaal huren bij ons. Meer info op onze verhuurpagina.'
    },
    { 
        value: 'andere',
        label: 'Andere',
        faqText: 'Neem ook eens een kijkje tussen de veelgestelde vragen, daar vind je ook al een heleboel informatie.'
    },
]