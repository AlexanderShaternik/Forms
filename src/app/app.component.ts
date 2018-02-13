import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstGroup  : FormGroup;
  secondGroup : FormGroup;
  thirdGroup  : FormGroup;

  mainGroup = new FormGroup({
  })

  ngOnInit() {
    this.mainGroup.addControl('firstGroup',this.firstGroup = new FormGroup({
      "userFirstName":new FormControl ("", [Validators.required]),
      "userLastName":new FormControl ("", [Validators.required]),
      "userAge":new FormControl ("", [Validators.required,this.userAgeValidator])
      })
    ),
    this.mainGroup.addControl('secondGroup',
      this.secondGroup = new FormGroup({
        "userAdress":new FormControl ("", [Validators.required,Validators.pattern('[0-9]{6}')]),
        "userEmail":new FormControl ("", [ Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
        "userPhones":new FormControl ("+375", [Validators.required,Validators.pattern('[\+][0-9]{12}')])
      })
    ),
    this.mainGroup.addControl('thirdGroup',
    this.thirdGroup = new FormGroup({
        "gender":new FormControl ("", [Validators.required]),
        "text" : new FormControl("", [Validators.minLength(2), Validators.maxLength(140), Validators.required])
      })
    )
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

  submit(nameform:FormGroup){
    console.log(nameform.value)
  }
}
