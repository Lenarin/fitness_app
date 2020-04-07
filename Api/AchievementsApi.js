import ApiBasePath from '../Misc/Variables';

/**
 * Get achivments by username
 * @param {*} username - username whose achivment to receive
 * @param {*} token - user access token
 * @returns array of achivments
 */
export async function GetAchievementsByUsername(username, token) {
    const response = await fetch(`${ApiBasePath}/users/${username}/achievements`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
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

/**
 * Send new achievement by user
 * @param {*} username - username of user
 * @param {*} achievement / achievement to send
 * @param {*} token - user access token
 */
export async function PostAchievementsByUsername(username, achievement, token) {
    const response = await fetch(`${ApiBasePath}/users/${username}/achievements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(achievement),
    });
    if (response.status === 201) {
        const res = await response.json();
        return res;
    }
    if (response.status === 400) {
        throw new Error('Invalid entity format');
    }
    throw new Error(`Server error ${response}`);
}
