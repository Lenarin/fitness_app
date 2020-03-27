
export const ValidateEmail = (mail) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
};

export const ValidatePassword = (pass) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(pass).toLowerCase());
};
