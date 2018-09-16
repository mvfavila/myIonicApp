export class AuthenticatedUser {
    private _user: { 
        _username: string,
        _email: string,
        _token: string
    };

    public static GetNewInstance(): AuthenticatedUser {
        return new AuthenticatedUser(null, null, null);
    }

    public static ParseFromObject(object): AuthenticatedUser {
        const model = AuthenticatedUser.GetNewInstance();

        if (object && (object._user || object.user)) {
            if(object.user){
                model.username = object.user.username;
                model.email = object.user.email;
                model.token = object.user.token;
            }
            else {
                model.username = object._user._username;
                model.email = object._user._email;
                model.token = object._user._token;
            }
        }

        return model;
    }

    constructor(username: string, email: string, token: string) {
        this._user = { 
            _username: username,
            _email: email,
            _token: token
        }
    }

    get user(): any {
        return this._user;
    }

    get username(): string {
        return this._user._username;
    }

    set username(value: string) {
        this._user._username = value;
    }

    get email(): string {
        return this._user._email;
    }

    set email(value: string) {
        this._user._email = value;
    }

    get token():string {
        return this._user._token;
    }

    set token(value: string) {
        this._user._token = value;
    }
}