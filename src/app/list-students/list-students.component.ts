import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Student } from '../student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent {

//WYMIANA INFORMACJI POMIEDZY FRONTENDEM A BACKENDEM

//1. Dodajemy interfejs Studenta - dane z formatu json zamykamy w jakiejs zmiennej
//2. Urworzymy sobie serwis do komunikacji z czescia backendowa. przy uzyciu protokolu HTTP. wysle request GET
//3. Sprawdze czy pobrałem dane.

    isTableVisible : boolean = false;
    buttonText : string = "Pokaż";
    students : Student[] = [];

    constructor(private httpService: HttpService){
    }

    showTable(){
      this.isTableVisible = !this.isTableVisible;
      console.log(this.isTableVisible);
      // tutaj log pokazuje w devtools w pasku Console wartosc zmiennej w zaleznosci od stanu po kliknieciu

      if(this.isTableVisible) {
        this.buttonText = "Schowaj";
      } else {
        this.buttonText = "Pokaż";
      }
    }

    getData(){
      this.httpService.getStudents().subscribe(data => {
        console.log(data);
        this.students = data;
      });
      // typ Observable powoduje ze mamy metode subscribe- 
    
    }

}
