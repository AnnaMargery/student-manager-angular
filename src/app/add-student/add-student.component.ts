import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  isFormValid = true;
  errorText : string[] = [];

  constructor(private httpService : HttpService){}

  save(studentName: string, email: string) {
    console.log("student:" + studentName + "," , "email" + email);
    this.isFormValid = true;
    
    if(studentName.length ==0){
      this.isFormValid = false;
      this.errorText.push("Nazwa jest wymagana");
    }

    if(studentName.length > 10){
      this.isFormValid = false;
      this.errorText.push("Nazwa studenta musi mieć długość mniejszą niż 10");
    }

    if(email.includes("@") == false){
      this.isFormValid= false;
      this.errorText.push("Email jest niepoprawny");
    }

    if(this.isFormValid){
      this.httpService.addStudent({name : studentName,email} as Student)
      .subscribe((data)=> {

      });
    }

    console.log(this.errorText);
    return false;
  }
}
