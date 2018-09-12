export class AuthenticatedUser {
    private _username: string;
    private _id: string;
    private _token: string;

    public static GetNewInstance(): AuthenticatedUser {
        return new AuthenticatedUser(null, null, null)
    }

    public static ParseFromObject(object): AuthenticatedUser {
        const model = AuthenticatedUser.GetNewInstance();

        if (object) {
            model.username = object.username;
            model.id = object.id;
            model.token = object.token;
        }

        return model;
    }

    constructor(username: string, id: string, token: string) {
        this._username = username;
        this._id = id;
        this._token = token;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }
}