import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { HomeComponent } from './home/home.component';

// /edit/1- edycja studenta o id=1 -> 
// edit/2 - edycja studenta o id=2 ->
const routes: Routes = [
  {path:"add", component: AddStudentComponent},
  {path:"students", component : ListStudentsComponent},
  {path:"edit/:id", component: EditStudentComponent},
  {path:"", component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }