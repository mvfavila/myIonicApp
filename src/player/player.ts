import { StringUtil } from "../util/string";

export class Player {
    private _player: { 
        _playerId: string,
        _userId: string,
        _nickname: string,
        _name: string,
        _surname: string,
        _buyIns: number[],
        _createdDate: Date,
    };

    public static GetNewInstance(): Player {
        return new Player();
    }

    public static ParseFromObject(object): Player {
        const model = Player.GetNewInstance();
        
        if (object) {
            if(object.player){
                model.playerId = object.player.playerId;
                model.userId = object.player.userId;
                model.nickname = object.player.nickname;
                model.name = object.player.name;
                model.surname = object.player.surname;
                model.buyIns = object.player.buyIns;
                model.createdDate = object.player.createdDate;
            }
            else {
                object = JSON.parse(object);

                model.playerId = object._player._playerId;
                model.userId = object._player._userId;
                model.nickname = object._player._nickname;
                model.name = object._player._name;
                model.surname = object._player._surname;
                model.buyIns = object._player._buyIns;
                model.createdDate = object._player._createdDate;
            }
        }

        return model;
    }

    constructor() {
        this._player = { 
            _playerId: '',
            _userId: '',
            _nickname: '',
            _name: '',
            _surname: '',
            _buyIns: new Array(),
            _createdDate: new Date(),
        }
    }

    get player(): any {
        return {
            playerId: this.player.playerId,
            userId: this.player.userId,
            nickname: this.player.nickname,
            name: this.player.name,
            surname: this.player.surname,
            buyInCount: this.player.buyInCount,
            buyIns: this.player.buyIns,
            createdDate: this.player.createdDate,
        };
    }

    get playerId(): string {
        return this._player._playerId;
    }

    set playerId(value: string) {
        this._player._playerId = value;
    }

    get userId(): string {
        return this._player._userId;
    }

    set userId(value: string) {
        this._player._userId = value;
    }

    get nickname(): string {
        return this._player._nickname;
    }

    set nickname(value: string) {
        this._player._nickname = value;
    }

    get createdDate(): Date {
        return this._player._createdDate;
    }

    get name(): string {
        return this._player._name;
    }

    set name(value: string) {
        this._player._name = value;
    }

    get surname(): string {
        return this._player._surname;
    }

    set surname(value: string) {
        this._player._surname = value;
    }

    get buyInCount(): number {
        var sum:number = 0;
        this.buyIns.forEach((buyIn) => {
            if(buyIn.amount)
                sum += Number(buyIn.amount);
        });
        return sum;
    }

    get buyIns(): any[] {
        return this._player._buyIns;
    }

    set buyIns(value: any[]) {
        this._player._buyIns = value;
    }

    set createdDate(value: Date) {
        this._player._createdDate = value;
    }

    isValid(): boolean {
        if(StringUtil.isNullOrEmpty(this.nickname))
            return false;
            
        if(this.nickname.trim().length < 2)
            return false;

        return true;
    }
}