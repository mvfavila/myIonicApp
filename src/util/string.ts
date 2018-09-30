import { Injectable } from '@angular/core';

@Injectable()
export class StringUtil {

    public static isNullOrEmpty(value: string): boolean {
        if(!value){
            return true;
        }
        value = value.trim().replace(" ", "");
        return value.length == 0;
    }
    
}