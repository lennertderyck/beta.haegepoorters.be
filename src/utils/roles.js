import fakeTags from '../data/fake/tags.fake.json'

const userTags = fakeTags.functies

const activeRoles = (data) => data.filter(({ einde }) => !einde)
const hasMemberRoles = data => data.filter(({ groep }) => groep === 'O1306G').length > 0;

const memberCheck = (data, tagsData) => {
    // check if user has roles with our groupid
    const isMember = hasMemberRoles(data);

    // if not return false
    if (!isMember) return { isMember: false }

    // else also check if it has active roles
    const roles = activeRoles(data)
    const activeMember = roles.length > 0;
    const isLeader = roles.some(r => {
        const thisTag = tagsData.find(f => f.id === r.functie)
        if (!thisTag) return false;
        else {
            return thisTag?.groeperingen?.find(g => g.naam === 'Leiding')
        }
    })
    
    const isWebmaster = roles.some(r => {
        const thisTag = tagsData.find(f => f.id === r.functie)
        if (!thisTag) return false;
        else {
            return thisTag.beschrijving !== 'Webmaster'
        }
    })
    
    
    
    return {
        isMember: true,
        activeMember,
        isLeader,
        isWebmaster
    }
}

const findUserTags = (functie) => userTags.find(({ id }) => id === functie);
const findTag = (taglist) => {
    return taglist.filter(({ einde }) => !einde)
}
const filterTeamOnFunction = (items, funct) => items.filter(({ content: { functions } }) => {
    return functions?.content?.shortcode === funct
});

export {
    activeRoles,
    memberCheck,
    findUserTags,
    findTag,
    filterTeamOnFunction
}