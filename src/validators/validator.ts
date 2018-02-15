import { FormControl } from '@angular/forms';

export class Validator {

    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        if(control.value == 0){
             return {
                 "not a whole number": true
             };
         }

        if(control.value < 0){
            return {
                "you can't add a negative value": true
            };
        }

        // if (control.value > 1000000){
        //     return {
        //         "not realistic": true
        //     };
        // }

        return null;
    }

}
