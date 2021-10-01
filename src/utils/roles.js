export const activeRoles = (data) => data.filter(({ einde }) => !einde)
export const memberCheck = (data) => {
    // check if user has roles with our groupid
    const isMember = data.find(({ groep }) => groep === 'O1306G') > 0;

    // if not return false
    if (!isMember) return { isMember: false }

    // else also check if it has active roles
    const activeMember = activeRoles(data) > 0;
    return {
        isMember: true,
        activeMember,
    }
}