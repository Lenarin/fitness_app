class Authorization {
    AccessToken = '';

    RefreshToken = '';

    ExpiresAfter = '';

    constructor(accessToken, refreshToken, expiresAfter) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.ExpiresAfter = expiresAfter;
    }
}

export default Authorization;
