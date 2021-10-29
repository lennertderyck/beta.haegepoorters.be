import { functies as userTags } from '../data/fake/tags.fake.json'

export const activeRoles = (data) => data.filter(({ einde }) => !einde)
export const memberCheck = (data, tagsData) => {
    // check if user has roles with our groupid
    const isMember = data.filter(({ groep }) => groep === 'O1306G').length > 0;

    // if not return false
    if (!isMember) return { isMember: false }

    // else also check if it has active roles
    const roles = activeRoles(data)
    const activeMember = roles.length > 0;
    const isLeader = roles.some(r => {
        const thisTag = tagsData.find(f => f.id === r.functie)
        return thisTag.groeperingen.find(g => g.naam === 'Leiding')
    })
    
    const isWebmaster = roles.some(r => {
        const thisTag = tagsData.find(f => f.id === r.functie)
        return thisTag.beschrijving !== 'Webmaster'
    })
    
    
    
    return {
        isMember: true,
        activeMember,
        isLeader,
        isWebmaster
    }
}

export const findUserTags = (functie) => userTags.find(({ id }) => id === functie);