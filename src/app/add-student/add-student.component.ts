import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Student } from '../student';
import { delay } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  isFormValid = true;
  errorText: string[] = [];
  isFormSubmitting: boolean = false;
  isAddedSuccessfull: boolean = false;
  isAddedError : boolean = false;
  displayingTimeMessage = 10000;

  constructor(private httpService: HttpService) { }

  isValidate(studentName: string, email: string) : boolean {
    let isFormValid = true;

    if (studentName.length == 0) {
      this.isFormValid = false;
      this.errorText.push("Nazwa jest wymagana");
    }

    if (studentName.length > 10) {
      this.isFormValid = false;
      this.errorText.push("Nazwa studenta musi mieć długość mniejszą niż 10");
    }

    if (email.includes("@") == false) {
      this.isFormValid = false;
      this.errorText.push("Email jest niepoprawny");
    }
    return isFormValid;
  }

  save(studentName: string, email: string) {
    console.log("student:" + studentName + ",", "email" + email);
    this.isFormValid = true;
    this.errorText = [];

    this.isFormValid = this.isValidate(studentName,email);

    if (this.isFormValid) {
      this.isFormSubmitting = true;
      setTimeout(() => {
      this.httpService.addStudent({ name: studentName, email } as Student)
        .pipe(delay(3000))
        .subscribe({
          next: (data) => {
          this.isFormSubmitting = false;
          this.isAddedSuccessfull = true;
          this.hideAddedSuccessfullMessage();
          },
          error: () => {
            this.isFormSubmitting = false;
            this.isAddedError = true;
        }
      });
      }, 3000)
    }
    console.log(this.errorText);
  }

  hideAddedSuccessfullMessage(){
    setTimeout(()=> {
      this.isAddedSuccessfull = false;
    },1000);
  }
}
