import ApiBasePath from '../Misc/Variables';

/**
 * Get achivments by user id
 * @param {*} userId - user id whose achivment to receive
 * @returns array of achivments
 */
export async function GetAchievementsByUserId(userId) {
    const response = await fetch(`${ApiBasePath}/achievements/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
    });
    if (response.status === 200) {
        const res = await response.json();
        return res;
    }
    if (response.status === 404) {
        throw new Error('User not found');
    }
    throw new Error(`Server error ${response}`);
}

export async function PostAchievementsByUserId(userId, achivement) {
    const response = await fetch(`${ApiBasePath}/achievements/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
        body: JSON.stringify(achivement),
    });
    if (response.status === 200) {
        const res = await response.json();
        return res;
    }
    if (response.status === 400) {
        throw new Error('Invalid entity format');
    }
    throw new Error(`Server error ${response}`);
}
