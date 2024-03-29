export default {
    "links": [
        {
            "rel": "self",
            "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/d5f75b320ef19609010ef2d4016001a6",
            "method": "GET",
            "secties": []
        },
        {
            "rel": "self",
            "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/d5f75b320ef19609010ef2d4016001a6",
            "method": "PATCH",
            "secties": [
                "adressen",
                "contacten",
                "persoonsgegevens",
                "email"
            ]
        },
        {
            "rel": "steekkaart",
            "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/d5f75b320ef19609010ef2d4016001a6/steekkaart",
            "method": "GET",
            "secties": []
        }
    ],
    "id": "d5f75b320ef19609010ef2d4016001a6",
    "aangepast": "2023-02-16T22:38:50.155+01:00",
    "persoonsgegevens": {
        "geslacht": "man",
        "gsm": "0497 75 37 62"
    },
    "vgagegevens": {
        "voornaam": "Lennert",
        "achternaam": "De Ryck",
        "geboortedatum": "1999-07-20",
        "beperking": false,
        "verminderdlidgeld": false,
        "individueleSteekkaartdatumaangepast": "2020-06-09"
    },
    "verbondsgegevens": {
        "lidnummer": "1999072002651",
        "klantnummer": "I18191",
        "lidgeldbetaald": false,
        "lidkaartafgedrukt": false
    },
    "email": "lennyderyck@gmail.com",
    "gebruikersnaam": "lennertderyck",
    "adressen": [
        {
            "id": "d8767876-347b-4d29-b21e-61b4306401fa",
            "land": "BE",
            "postcode": "9040",
            "gemeente": "Sint-Amandsberg",
            "straat": "Seringendreef",
            "nummer": "9",
            "telefoon": "",
            "postadres": true,
            "status": "normaal",
            "positie": {
                "latitude": 51.061627896296194,
                "longitude": 3.752383255361325
            },
            "omschrijving": ""
        },
        {
            "id": "6352dbb1-0345-4082-bf9d-9615838677e7",
            "land": "BE",
            "postcode": "9070",
            "gemeente": "Destelbergen",
            "straat": "Europalaan",
            "nummer": "2",
            "bus": "",
            "telefoon": "09 229 22 46",
            "postadres": false,
            "status": "normaal",
            "positie": {
                "latitude": 51.05366598293086,
                "longitude": 3.768864330864281
            },
            "omschrijving": ""
        }
    ],
    "contacten": [
        {
            "id": "a915f506-d22d-465b-9d28-90d56a2a7405",
            "adres": "6352dbb1-0345-4082-bf9d-9615838677e7",
            "voornaam": "Maddy",
            "achternaam": "Termmerman",
            "zelfdeAdres": false,
            "gsm": "0499148365",
            "email": "euroteam2@gmail.com",
            "rol": "moeder"
        }
    ],
    "groepseigenVelden": {
        "O1000P": {
            "schema": [
                {
                    "id": "d5f75e23483848c701485bc00e982951",
                    "type": "groep",
                    "label": "Totem",
                    "beschrijving": "",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": false,
                    "kanGebruikerWijzigen": false,
                    "sort": 0
                }
            ],
            "waarden": {}
        },
        "O1306G": {
            "schema": [
                {
                    "id": "28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1",
                    "type": "tekst",
                    "label": "UiTPas-nummer",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": true,
                    "kanGebruikerWijzigen": true,
                    "sort": 0
                },
                {
                    "id": "c6a4fcc2-b1ff-4504-a58b-df291b223f7d",
                    "type": "tekst",
                    "label": "Profielfoto (url)",
                    "beschrijving": "Plak hier een url (link) naar een foto van jezelf. Zo weet de leiding altijd wie je bent. Niet verplicht uiteraard ;)\nBinnenkort kan je eenvoudig zelf een profielfoto opladen via onze website (haegepoorters.be/account, tabje \"Profiel\").",
                    "verplicht": false,
                    "kanLeidingWijzigen": true,
                    "kanLidWijzigen": true,
                    "kanGebruikerWijzigen": true,
                    "sort": 1
                },
                {
                    "id": "d5f75b3315ed83760115f18156790a21",
                    "type": "tekst",
                    "label": "Totemnaam",
                    "beschrijving": "",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": true,
                    "kanGebruikerWijzigen": true,
                    "sort": 2
                },
                {
                    "id": "692cde76-6a2a-4596-938f-00a543736ddf",
                    "type": "vinkje",
                    "label": "Lidgeld betaald 20-21?",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": false,
                    "kanGebruikerWijzigen": false,
                    "sort": 3
                },
                {
                    "id": "8a00808d6ca90476016caecac1dc0159",
                    "type": "vinkje",
                    "label": "Lidgeld betaald 19-20?",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": false,
                    "kanGebruikerWijzigen": false,
                    "sort": 4
                }
            ],
            "waarden": {
                "28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1": "09000 04943 412",
                "d5f75b3315ed83760115f18156790a21": "Vindingrijke Patrijs",
                "8a00808d6ca90476016caecac1dc0159": "true",
                "c6a4fcc2-b1ff-4504-a58b-df291b223f7d": "https://scontent.fbru1-1.fna.fbcdn.net/v/t1.6435-9/92817995_2663791323731127_1519225826330017792_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=snDAjBdchL0AX__c677&_nc_ht=scontent.fbru1-1.fna&oh=00_AfAWb29j96WNmIu75YqFJSnIm_ZvM5DVTwI_ja-KcIPpZA&oe=64901D3C"
            }
        },
        "O1300D": {
            "schema": [
                {
                    "id": "d5f75e233235578401323aea66593a48",
                    "type": "tekst",
                    "label": "Totem",
                    "beschrijving": "",
                    "verplicht": false,
                    "kanLeidingWijzigen": false,
                    "kanLidWijzigen": false,
                    "kanGebruikerWijzigen": false,
                    "sort": 0
                }
            ],
            "waarden": {}
        },
        "O1302G": {
            "schema": [],
            "waarden": {}
        }
    },
    "functies": [
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b8125565203c1",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b8125565203c1",
            "begin": "2013-09-01T00:00:00.000+02:00",
            "einde": "2016-09-01T00:00:00.000+02:00",
            "code": "GVE",
            "omschrijving": "Gids/Verkenner"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555c1039b",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b812555c1039b",
            "begin": "2016-10-12T11:45:46.569+02:00",
            "einde": "2017-09-20T12:06:49.871+02:00",
            "code": "JIN",
            "omschrijving": "Jin"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812554f20372",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1300D",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1300D",
            "functie": "d5f75b320b812440010b812554f20372",
            "begin": "2022-09-17T12:07:54.140+02:00",
            "code": "DC",
            "omschrijving": "Districtscommissaris"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75e234ac0816d014ac9dd200a0000",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1000P",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1000P",
            "functie": "d5f75e234ac0816d014ac9dd200a0000",
            "begin": "2022-09-17T12:16:06.213+02:00",
            "code": "WEB",
            "omschrijving": "Webmaster"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75e232d1339cd012dadd48b2328ec",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75e232d1339cd012dadd48b2328ec",
            "begin": "2016-08-25T17:27:23.875+02:00",
            "einde": "2017-08-29T15:45:20.986+02:00",
            "omschrijving": "Jinner in districtsjin"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555d2039f",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555d2039f",
            "begin": "2021-09-16T18:13:44.534+02:00",
            "einde": "2022-09-26T17:16:46.941+02:00",
            "code": "JL",
            "omschrijving": "Jinleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555d2039f",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b812555d2039f",
            "begin": "2021-09-29T12:59:19.253+02:00",
            "einde": "2022-09-17T19:55:36.238+02:00",
            "code": "JL",
            "omschrijving": "Jinleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555ec03a5",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555ec03a5",
            "begin": "2019-08-21T11:51:06.749+02:00",
            "einde": "2020-08-19T14:56:27.406+02:00",
            "code": "KWL",
            "omschrijving": "Kabouter-Welpenleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b8125557c038d",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1000P",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1000P",
            "functie": "d5f75b320b812440010b8125557c038d",
            "begin": "2022-09-17T12:07:44.512+02:00",
            "code": "GPL",
            "omschrijving": "Gouwploeg"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b81255456034c",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b81255456034c",
            "begin": "2020-08-25T10:20:44.197+02:00",
            "einde": "2022-09-26T17:17:02.941+02:00",
            "code": "AGRL",
            "omschrijving": "Adjunct Groepsleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555cc039e",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555cc039e",
            "begin": "2017-08-29T15:45:16.937+02:00",
            "einde": "2019-08-21T11:50:48.649+02:00",
            "code": "JGVL",
            "omschrijving": "Jonggidsen-Jongverkennerleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555ec03a5",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555ec03a5",
            "begin": "2017-08-29T15:45:14.136+02:00",
            "einde": "2017-11-02T10:20:21.406+01:00",
            "code": "KWL",
            "omschrijving": "Kabouter-Welpenleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555970393",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b812555970393",
            "begin": "2021-10-06T18:24:22.617+02:00",
            "einde": "2022-09-18T19:29:39.600+02:00",
            "code": "VGA",
            "omschrijving": "Verantwoordelijke Groepsadministratie"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555970393",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555970393",
            "begin": "2020-08-19T14:57:00.649+02:00",
            "einde": "2022-09-06T20:27:25.187+02:00",
            "code": "VGA",
            "omschrijving": "Verantwoordelijke Groepsadministratie"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812553d5032e",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b812553d5032e",
            "begin": "2021-09-27T21:32:56.351+02:00",
            "einde": "2022-10-10T11:24:07.725+02:00",
            "code": "FV",
            "omschrijving": "Financieel Verantwoordelijke"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b8125558e0391",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b8125558e0391",
            "begin": "2021-09-27T21:32:55.742+02:00",
            "einde": "2022-09-18T19:28:52.524+02:00",
            "code": "GRL",
            "omschrijving": "Groepsleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555de03a2",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555de03a2",
            "begin": "2006-11-16T00:00:00.000+01:00",
            "einde": "2007-10-16T00:00:00.000+02:00",
            "code": "KAP",
            "omschrijving": "Kapoen"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555ec03a5",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555ec03a5",
            "begin": "2022-09-26T17:16:54.117+02:00",
            "code": "KWL",
            "omschrijving": "Kabouter-Welpenleiding"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75e234ac0816d014ac9dd200a0000",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75e234ac0816d014ac9dd200a0000",
            "begin": "2020-08-19T14:30:06.541+02:00",
            "code": "WEB",
            "omschrijving": "Webmaster"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555d603a0",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555d603a0",
            "begin": "2010-09-01T00:00:00.000+02:00",
            "einde": "2013-09-01T00:00:00.000+02:00",
            "code": "JGJV",
            "omschrijving": "Jonggids/Jongverkenner"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555970393",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1302G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1302G",
            "functie": "d5f75b320b812440010b812555970393",
            "begin": "2021-09-28T15:38:47.076+02:00",
            "einde": "2021-09-30T14:09:49.995+02:00",
            "code": "VGA",
            "omschrijving": "Verantwoordelijke Groepsadministratie"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b8125567703cb",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b8125567703cb",
            "begin": "2007-10-16T00:00:00.000+02:00",
            "einde": "2010-09-01T00:00:00.000+02:00",
            "code": "KW",
            "omschrijving": "Kabouter/Welp"
        },
        {
            "links": [
                {
                    "rel": "functie",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/d5f75b320b812440010b812555b50398",
                    "method": "GET",
                    "secties": []
                },
                {
                    "rel": "groep",
                    "href": "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/O1306G",
                    "method": "GET",
                    "secties": []
                }
            ],
            "groep": "O1306G",
            "functie": "d5f75b320b812440010b812555b50398",
            "begin": "2020-08-19T14:30:06.532+02:00",
            "einde": "2021-09-16T18:13:36.472+02:00",
            "code": "GVL",
            "omschrijving": "Gidsen-Verkennerleiding"
        }
    ]
}