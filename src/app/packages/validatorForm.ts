import { NgForm } from "@angular/forms";

export class ValidatorForm {

    validation(loginForm: NgForm) {
        let validation = []
        for (const key in loginForm.controls!) {
            loginForm.controls![key].status === "VALID" ? () => { validation.push("VALID")} : validation.push("INVALID")
        }
        return !validation.includes("INVALID")
    }

    equalValidation(password1: string, password2: string):boolean{
        if(password1 === password2){
            return true
        }
        return false        
    }

}