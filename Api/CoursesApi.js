import ApiBasePath from '../Misc/Variables';

/**
 * Get courses from server
 */
export default async function GetCourses() {
    const response = await fetch(`${ApiBasePath}/courses`, {
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
    throw new Error(`Server error ${response}`);
}
