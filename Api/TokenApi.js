import ApiBasePath from '../Misc/Variables';
import Authorization from '../Stores/Models/Authorization';

/**
 * Get new tokens by refresh token
 * @param {*} refreshtoken - refresh token to be refreshed
 * @returns new authorizaton object
 */
export default async function RefreshToken(refreshtoken) {
    const response = await fetch(`${ApiBasePath}/users/token/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            refreshtoken,
        }),
    });
    if (response.status === 200) {
        const data = await response.json();
        const res = new Authorization(data.accessToken, data.refreshToken, data.expiresIn);
        return res;
    }
    if (response.status === 403) {
        throw new Error('Invalid refresh token');
    }
    throw new Error(`Server error: ${response}`);
}
