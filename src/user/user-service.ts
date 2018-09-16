import { AuthenticatedUser } from "./user";
import { Subject } from "rxjs/Subject";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService {
    
    private _user: Subject<AuthenticatedUser> = new Subject<AuthenticatedUser>();
    private STORAGE_NAME:string = 'user';
  
    constructor(private storage: Storage) {
      
    }
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* Observable use object                                                                                            */
  
    public subscribeToUserService(callback) {
      return this._user.subscribe(callback);
    }
  
    public updateUserService(user: AuthenticatedUser) {
      this._user.next(user);
    }
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* User storage management                                                                                          */
  
    /**
     * Write user properties in the local storage.
     *
     * @param user
     * @returns {Promise<AuthenticatedUser>}
     */
    createOnStorage(user: AuthenticatedUser): Promise<AuthenticatedUser> {      
      return new Promise((resolve) => {
        this.getOnStorage().then((res) => {
          if (res) {
            this.deleteOnStorage().then(() => {
  
            });
          }
        }).then(() => {
          this.updateUserService(user);
          this.storage.set(this.STORAGE_NAME, JSON.stringify(user));
          resolve();
        });
      });
    }
  
    /**
     * Get user properties from local storage.
     *
     * @returns {Promise<AuthenticatedUser>}
     */
    getOnStorage(): Promise<AuthenticatedUser> {
      return new Promise((resolve) => {
        var user = AuthenticatedUser.ParseFromObject(this.storage.get(this.STORAGE_NAME));
        this.updateUserService(user);
        resolve(this.storage.get(this.STORAGE_NAME));
      });
    }
  
    /**
     * Get user properties from local storage.
     *
     * @returns {Promise<AuthenticatedUser>}
     */
    getOnStorageSync() {
      var user = AuthenticatedUser.ParseFromObject(this.storage.get(this.STORAGE_NAME));
      this.updateUserService(user);
      return this.storage.get(this.STORAGE_NAME);
    }
  
    /**
     * Update user properties from local storage.
     *
     * @param user
     * @returns {Promise<AuthenticatedUser>}
     */
    updateOnStorage(user: AuthenticatedUser): Promise<AuthenticatedUser> {
      return new Promise((resolve) => {
        resolve(this.storage.get(this.STORAGE_NAME));
      });
    }
  
    /**
     * Delete user properties from local storage.
     *
     * @returns {Promise<AuthenticatedUser>}
     */
    deleteOnStorage(): Promise<AuthenticatedUser> {
      return new Promise((resolve) => {
        this.storage.clear();
        resolve();
      });
    }
  }