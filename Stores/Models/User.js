import { sha256 } from 'js-sha256';

class User {
    Id = '';

    Username = '';

    Email = '';

    Password = '';

    constructor(id, username, email, password) {
        const encodedPass = sha256(password);

        this.Id = id;
        this.Username = username;
        this.Email = email;
        this.Password = encodedPass;
    }
}

export default User;
