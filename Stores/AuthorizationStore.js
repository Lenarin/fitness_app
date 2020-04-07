import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import RefreshToken from '../Api/TokenApi';

class AuthorizationStore {
    @persist('object')
    @observable
    Authorization = {};

    @action
    SetAccessToken(accessToken) {
        this.Authorization.AccessToken = accessToken;
    }

    @action
    SetRefreshToken(refreshToken) {
        this.Authorization.RefreshToken = refreshToken;
    }

    @action
    SetExpiresAfter(expiresAfter) {
        this.Authorization.ExpiresAfter = expiresAfter;
    }

    @action
    SetAuthorization(authorization) {
        this.Authorization = authorization;
    }

    @action
    async refreshTokens() {
        try {
            const auth = await RefreshToken(this.Authorization.RefreshToken);
            this.SetAuthorization(auth);
        } catch (err) {
            console.error(err);
        }
    }
}

const authorizationStore = new AuthorizationStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Authorization', authorizationStore);

export default authorizationStore;
