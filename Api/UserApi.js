import Authorization from '../Stores/Models/Authorization';
import User from '../Stores/Models/User';
import ApiBasePath from '../Misc/Variables';

/**
 * Send user register request
 * @param {*} user - an user to register (username, email and password required)
 * @returns sended user
 */
export async function RegisterUser(user) {
    const response = await fetch(`${ApiBasePath}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (response.status === 201) {
        return (user);
    }
    throw new Error(`Server error ${response}`);
}

/**
 * Send login request
 * @param {*} user - a user to login (username and password required)
 * @returns authorization object
 */
export async function LoginUser(user) {
    const response = await fetch(`${ApiBasePath}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (response.status === 200) {
        const data = await response.json();
        const res = new Authorization(data.accessToken, data.refreshToken, data.expiresIn);
        return res;
    }
    if (response.status === 400) {
        throw new Error('Invalid username/password supplied');
    }
    throw new Error(`Server error: ${response}`);
}

/**
 * Get user by username
 * @param {*} username - username of required user
 * @returns User object
 */
export async function GetUser(username) {
    const response = await fetch(`${ApiBasePath}/users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
    });
    if (response.status === 200) {
        const data = await response.json();
        const res = new User(data.id, data.username, data.email, data.password);
        return res;
    }
    if (response.status === 400) {
        throw new Error('Invalid username supplied');
    }
    if (response.status === 401) {
        throw new Error('Invalid token');
    }
    if (response.status === 403) {
        throw new Error('User doesn\'t have permisiions to access');
    }
    if (response.status === 404) {
        throw new Error('User not found');
    }
    throw new Error(`Server error: ${response}`);
}
