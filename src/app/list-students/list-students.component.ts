import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Student } from '../student';
import { TypeDisplaying } from '../type-displaying';

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

// USUIWANIE REKORDU STUDENTA
//1. Dodanie przycisku do usuniecia danych -> html
//2. Wyslanie requesta HTTP - Delete -> dodac metode httpService
//3. Obsłużenie metody usuwania -> ts.

    isTableVisible : boolean = false;
    buttonText : string = "Pokaż";
    students : Student[] = [];
    studentIdToRemove : number[] = [];
    displayingTable : TypeDisplaying = TypeDisplaying.TABLE;
    TypeDisplaying = TypeDisplaying;
    

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
      console.log("Przed subscribe");

      this.httpService.getStudents().subscribe(data => {
        console.log("Wewnątrz subscribe");
        this.students = data;
      });

      console.log("Po subscribe");
      // typ Observable powoduje ze mamy metode subscribe- 
    
    }

    isNameGlennaReichert(name : string){
      return name.toUpperCase() == 'GLENNA REICHERT';
    }

    delete(id : number){
      // alert nie jest idealnym rozwiazaniem dla informnowania
      //alert('Kliknięto usuwanie studenta o id=' + id);
      this.httpService.deleteStudent(id).subscribe(()=>{
        // alert("Usunięto dane");
        // my tutj nie mamy funckjonalnosci aby pracowac z baza danych wiec usuwamy lokalnie i wyswietlamy
        // te kktore nie zostaly usuniete
        this.students = this.students.filter(x=>x.id != id);
      })
    }

      changeStatus(event : any, studentId : number){
        console.log(event.checked);
        if (event.checked){
          this.studentIdToRemove.push(studentId);
        } else {
          this.studentIdToRemove = this.studentIdToRemove
            .filter(x=>x != studentId);
        }
  
        console.log(this.studentIdToRemove);
      }
  
      deleteGlobalStudents(){
        this.studentIdToRemove.forEach(x=>{
          this.httpService.deleteStudent(x)
          .subscribe(()=>{
            console.log("Usunięto studenta o id " + x);
            this.students = this.students.filter(d=>d.id != x);
          })
        })
      }

      changeDisplayingForm() {
        if(this.displayingTable == TypeDisplaying.TABLE) {
          this.displayingTable = TypeDisplaying.LIST
        } else {
          this.displayingTable = TypeDisplaying.TABLE;
        }
      }
  }
