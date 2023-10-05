import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }

  getStudents(){
    // w nawiasie adres do pliku z ktorego mamy pobrac dane aby mozna bylo dokonac mapowania na Student
     
    return this.httpClient.get<Student[]>("https://jsonplaceholder.typicode.com/users");
    // zwracana kolekcja to nie bedzie tylko typu Student ale jeszcze w pewien typ opakowany
  }
}
