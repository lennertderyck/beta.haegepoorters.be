export default {
    uitschrijven: ({ voornaam, lidnummer }) => ({
        reciever: 'groepsleiding',
        subject: `Uitschrijven ${ voornaam } [${ lidnummer }]`,
        message: `Ik had graag ${ voornaam } uitgeschreven.`,
        childId: lidnummer
    })
}

/**
 * Helemaal terug van weggeweest door Corona vond dit weekend ons tradtionele overgangsweekend plaats.
 * En wat een succes was het, mede dankzij onze nieuwe leiding van het jaar '03 en hun fantastische spel!
 * Wij kijken alvast uit naar een jaar vol toffe activiteiten!
 * 
 * We geven jullie ook al de volgende data mee:
 * - 3 oktober: Eerste vergadering
 * - 15 tot 17 oktober: Geen vergadering (leidingsweekend)
 * - 6 november: Spaghettiavond (meer info volgt!)
 * 
 * Meer informatie is te vinden op onze (vernieuwde) website, link in bio!
 * Ook de foto's van overgangsweekend zal je daar binnenkort terugvinden ;)
 */