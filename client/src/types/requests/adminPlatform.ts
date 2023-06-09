interface Link {
    rel: string;
    href: string;
    method: string;
    secties: any[];
};

type AdminPlatformBase<T = any> = T & {
    links: Link[];
};

interface AdminPlatformResponse extends AdminPlatformBase<{}> {};

export interface UserFunction extends AdminPlatformBase {
    groep: string;
    functie: string;
    begin: string;
    einde?: string;
    code: string | undefined;
    omschrijving: string;
};

export interface UserContactPerson {
    id: string;
    adres: string;
    voornaam: string;
    achternaam: string;
    zelfdeAdres: boolean;
    gsm?: string;
    email?: string;
    rol: string;
}

export interface UserAddress {
    id: string;
    land: string;
    postcode: string;
    gemeente: string;
    straat: string;
    nummer: string;
    telefoon: string;
    postadres: boolean;
    status:string;
    positie: {
        latitude: number;
        longitude: number
    };
    omschrijving: string
}

export interface UserProfile extends AdminPlatformBase<{
    functies: UserFunction[];
    id: string;
    aangepast: string;
    persoonsgegevens: {
        geslacht: string;
        gsm: string;
    };
    vgagegevens: {
        voornaam: string;
        achternaam: string;
        geboortedatum: string;
        beperking: boolean;
        verminderdlidgeld: boolean;
        individueleSteekkaartdatumaangepast: string;
    };
    verbondsgegevens: {
        lidnummer: string;
        klantnummer: string;
        lidgeldbetaald: boolean;
        lidkaartafgedrukt: boolean;
    };
    email: string;
    gebruikersnaam: string;
    contacten: UserContactPerson[];
}> {};