export class Game {
    private _game: { 
        _userId: string,
        _createdDate: Date,
        _groupId: string,
        _players: any[],
        _admins: any[]
    };

    public static GetNewInstance(): Game {
        return new Game(null, null);
    }

    public static ParseFromObject(object): Game {
        const model = Game.GetNewInstance();
        
        if (object) {
            if(object.game){
                model.userId = object.game.userId;
                model.createdDate = object.game.createdDate;
                model.groupId = object.game.groupId;
                model.players = object.game.players;
                model.admins = object.game.admins;
            }
            else {
                object = JSON.parse(object);

                model.userId = object._game.userId;
                model.createdDate = object._game._createdDate;
                model.groupId = object._game._groupId;
                model.players = object._game._players;
                model.admins = object._game._admins;
            }
        }

        return model;
    }

    constructor(userId: string, groupId: string) {
        this._game = { 
            _userId: userId,
            _createdDate: new Date(),
            _groupId: groupId,
            _players: new Array(),
            _admins: new Array()
        }
    }

    get game(): any {
        return {
            userId: this.game.userId,
            createdDate: this.game.createdDate,
            groupId: this.game.groupId,
            players: this.game.players,
            admins: this.game.admins
        };
    }

    get userId(): string {
        return this._game._userId;
    }

    set userId(value: string) {
        this._game._userId = value;
    }

    get createdDate(): Date {
        return this._game._createdDate;
    }

    set createdDate(value: Date) {
        this._game._createdDate = value;
    }

    get groupId():string {
        return this._game._groupId;
    }

    set groupId(value: string) {
        this._game._groupId = value;
    }

    get players():any[] {
        return this._game._players;
    }

    set players(value: any[]) {
        this._game._players = value;
    }

    get admins():any[] {
        return this._game._admins;
    }

    set admins(value: any[]) {
        this._game._admins = value;
    }
}