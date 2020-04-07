class Authorization {
    AccessToken = '';

    RefreshToken = '';

    AccessTokenExp;

    RefreshTokenExp;

    constructor(accessToken, refreshToken, accessTokenExp, refreshTokenExp) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.AccessTokenExp = accessTokenExp;
        this.RefreshTokenExp = refreshTokenExp;
    }
}

export default Authorization;
