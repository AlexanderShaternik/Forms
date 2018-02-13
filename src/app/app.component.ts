import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'] 
})

export class AppComponent implements OnInit  { 
    mainGroup   : FormGroup;
    firstGroup  : FormGroup;
    secondGroup : FormGroup;
    thirdGroup  : FormGroup;
    
    constructor(private formBuilder: FormBuilder){
    }

    ngOnInit() {
        this.mainGroup = this.formBuilder.group({
            firstGroup : this.formBuilder.group({
                "userFirstName": ["", [Validators.required]],
                "userLastName": ["", [Validators.required,]],
                "userAge": ["", [Validators.required,this.userAgeValidator]],
            }),
            secondGroup : this.formBuilder.group({
                "userAdress": ["", [Validators.required,Validators.pattern('[0-9]{6}')]],
                "userEmail": ["", [ Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]],
                "userPhones": ["+375", [Validators.required,Validators.pattern('[\+][0-9]{12}')]]

            }),
            thirdGroup : this.formBuilder.group({
                "gender": ["", [Validators.required]],
                "text" : ["", [Validators.minLength(2), Validators.maxLength(140), Validators.required]],
            }),
        })
    }
    userAgeValidator(control:FormControl){
        let birthday = control.value.split('-');
        if((((new Date).getFullYear() - birthday[0]) < 18)){
            return {"userAge": true}
            } else if((((new Date).getFullYear() - birthday[0]) == 18) && ((new Date).getMonth()+1 < birthday[1])){
            return {"userAge": true}
            } else if(((new Date).getMonth()+1 == birthday[1]) && ((new Date).getDate() < birthday[2] )){
            return {"userAge": true}
            }
        return null
    }

    submit(){
        console.log(this.mainGroup.value)
    }
}
