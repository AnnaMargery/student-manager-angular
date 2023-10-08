import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  studentApiUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private httpClient: HttpClient) { }

  // Funkcja wysylajaca request - GET pobierajaca tablice studentow z API
  getStudents() {
    // w nawiasie adres do pliku z ktorego mamy pobrac dane aby mozna bylo dokonac mapowania na Student

    return this.httpClient.get<Student[]>(this.studentApiUrl);
    // zwracana kolekcja to nie bedzie tylko typu Student ale jeszcze w pewien typ opakowany
  }

  //Funkcja  wysylajaca reqesta get umozliwiajaca pobranie danych dla dango id Studenta
  getStudent(id: number) {
    let getStudentUrl = this.studentApiUrl + "/" + id;
    return this.httpClient.get<Student>(getStudentUrl);
  }

  // Funkcja wysylajaca request- DELETE usuwajaca studenta o podanym API
  // https://jsonplaceholder.typicode.com/users/5 -> DELETE -> USUN rekord o ID = 5
  // https://jsonplaceholder.typicode.com/users/10 -> DELETE -> USUN rekord o ID = 5
  deleteStudent(id: number) {
    let deleteStudentUrl = this.studentApiUrl + "/" + id;
    return this.httpClient.delete<Student>(deleteStudentUrl);
  }

  //Funkcja wysyłająca request -POST do endpointu
  addStudent(student: Student) {
    return this.httpClient.post<Student>(this.studentApiUrl, student);
  }

  //Funkcja wysylajaca request PUT do endpointu aktualizujac dany obiekt
  updateStudent(student: Student) {
    let updateStudentUrl = this.studentApiUrl + "/" + student.id;
    return this.httpClient.put<Student>(updateStudentUrl, student);
  }
}
